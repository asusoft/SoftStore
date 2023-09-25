import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { getFirestore, addDoc, collection, getDocs } from '@firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../App.css'
import { COLORS } from '../../../assets/constants/theme';
import icons from '../../../assets/constants/icons';

const AddItem = () => {
    const db = getFirestore();
    const [image, setImage] = useState(null);
    const [categories, setCategories] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [images, setImages] = useState([]);
    const [hasSizes, setHasSizes] = useState(false)
    const [hasColors, setHasColors] = useState(false)
    const [sizeValue, setSizeValue] = useState('');
    const [sizePrice, setSizePrice] = useState('');
    const [sizes, setSizes] = useState([]);
    const [colorValue, setColorValue] = useState('');
    const [colorName, setColorName] = useState('');
    const [colors, setColors] = useState([]);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("")

    const { brandID, brandName, productName, productID } = useParams();
    const navigate = useNavigate();

    const toggleHasSize = () => {
        setHasSizes(!hasSizes)
        if (!hasSizes) {
            setSizes([])
        }
    }

    const handleAddSize = () => {
        if (sizeValue && sizePrice) {
            setSizes(prevSizes => [...prevSizes, { value: sizeValue, price: parseFloat(sizePrice) }]);
            setSizeValue('');
            setSizePrice('');
        }
    };

    const handleRemoveSize = (indexToRemove) => {
        setSizes(prevSizes => prevSizes.filter((_, index) => index !== indexToRemove));
    };

    const toggleHasColors = () => {
        setHasColors(!hasColors)
        if (!hasColors) {
            setColors([])
        }
    }

    const handleAddColor = () => {
        if (colorValue, colorName) {
            setColors(prevColors => [...prevColors, { value: colorValue, name: colorName }]);
            setColorValue('');
            setColorName('');
        }
    };

    const handleRemoveColor = (indexToRemove) => {
        setColors(prevColors => prevColors.filter((_, index) => index !== indexToRemove));
    };

    const handleImageChange = (e) => {
        const selectedImages = [...images, ...e.target.files].slice(0, 5); // Limit to 5 images for example
        setImages(selectedImages);
    };

    const removeImage = (indexToRemove) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesCollection = collection(db, 'Categories');
                const querySnapshot = await getDocs(categoriesCollection);
                const fetchedCategories = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, [db]);

    const addProduct = async () => {
        const storage = getStorage();

        if (image) {
            const timeStamp = Date.now()
            const uniqueName = `${timeStamp}-${image.name}`;
            const imageRef = ref(storage, `Products/${uniqueName}`);
            const uploadTask = uploadBytesResumable(imageRef, image);

            // Wait for the upload to complete
            await uploadTask;

            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(db, 'Products'), {
                name: productName,
                icon: imageUrl,
                brandID: brandID,
                categoryID: selectedCategory,
                isAvailable: true
            });

            alert("Product added successfully!");
            navigate(`/brands/${brandName}/products/${productID}/${productName}`);
        } else {
            alert("Please select an image.");
        }
    }

    const cancelAddition = () => {
        navigate(`/brands/${brandName}/products/${productID}/${productName}`);
    }

    return (
        <div className="brand-form">
            <label className="brand-label">
                Item Name
                <input
                    className="brand-input"
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                />
            </label>

            <label className="brand-label">
                Category
                <select
                    className="brand-file-input"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>

            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Has Sizes: </Text>
                <Pressable onPress={() => toggleHasSize()} style={{ height: 20, width: 20, borderWidth: 1, borderRadius: 4, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        hasSizes && (
                            <Image source={icons.correct} style={{ height: 15, width: 15, tintColor: COLORS.blue }} />
                        )
                    }
                </Pressable>
            </View>

            {
                hasSizes && (
                    <label className="brand-label">
                        Size
                        <div className="sizes-container">
                            <div className="input-group">
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="Size Value (e.g., 128GB)"
                                    value={sizeValue}
                                    onChange={(e) => setSizeValue(e.target.value)}
                                />
                                <input
                                    className="input-field"
                                    type="number"
                                    placeholder="Price"
                                    value={sizePrice}
                                    onChange={(e) => setSizePrice(e.target.value)}
                                />
                                <button className="add-button" onClick={handleAddSize}>Add Size</button>
                            </div>

                            <ul className="size-list">
                                {sizes.map((size, index) => (
                                    <li key={index} className="size-item">
                                        {size.value} - ₦{size.price}
                                        <button className="add-button" onClick={() => handleRemoveSize(index)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </label>
                )
            }

            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Has Colors: </Text>
                <Pressable onPress={() => toggleHasColors()} style={{ height: 20, width: 20, borderWidth: 1, borderRadius: 4, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        hasColors && (
                            <Image source={icons.correct} style={{ height: 15, width: 15, tintColor: COLORS.blue }} />
                        )
                    }
                </Pressable>
            </View>

            {
                hasColors && (
                    <label className="brand-label">
                        Colors
                        <div className="sizes-container">
                            <div className="input-group">
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="Color Name"
                                    value={colorName}
                                    onChange={(e) => setColorName(e.target.value)}
                                />
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="Color Value"
                                    value={colorValue}
                                    onChange={(e) => setColorValue(e.target.value)}
                                />
                                <button className="add-button" onClick={handleAddColor}>Add Size</button>
                            </div>

                            <ul className="size-list">
                                {colors.map((color, index) => (
                                    <li key={index} className="size-item">
                                        {color.name} - {color.value}
                                        <button className="add-button" onClick={() => handleRemoveColor(index)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </label>
                )
            }

            {
                !hasSizes && (
                    <label className="brand-label">
                        Item Price
                        <input
                            className="brand-input"
                            type="number"
                            placeholder="Item Price"
                            value={itemPrice}
                            onChange={e => setItemPrice(e.target.value)}
                        />
                    </label>
                )
            }
            <View style={{ width: 400, height: 100, marginVertical: 20 }}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Images</Text>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                        <View style={{ height: 60, width: 60, backgroundColor: COLORS.white, marginEnd: 5, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={{ uri: URL.createObjectURL(image) }} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
                            <Pressable onPress={() => removeImage(index)} style={{ position: 'absolute', top: 4, right: 0, height: 20, width: 20 }}>
                                <Image source={icons.cancel} style={{ height: 20, width: 20 }} />
                            </Pressable>
                        </View>
                    ))}

                    <label style={{ cursor: 'pointer' }}>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <div style={{
                            height: 50,
                            width: 60,
                            backgroundColor: COLORS.white,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span>Upload</span>
                        </div>
                    </label>
                </View>
            </View>
            <div className="button-container">
                <button className="brand-button" onClick={addProduct}>
                    Add Product
                </button>
                <button className="brand-button cancel-button" onClick={cancelAddition}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddItem;
