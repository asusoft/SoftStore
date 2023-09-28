import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { getFirestore, addDoc, collection, getDocs } from '@firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../App.css'
import { COLORS } from '../../../assets/constants/theme';
import icons from '../../../assets/constants/icons';

const AddItem = () => {
    const db = getFirestore();
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
    const [description, setDescription] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [boxItemName, setBoxItemName] = useState('');
    const [boxItemImage, setBoxItemImage] = useState(null); // This is for the File object
    const [boxItems, setBoxItems] = useState([]);

    const { brandName, productName, productID } = useParams();
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

    const handleAddBoxItem = () => {
        if (boxItemName && boxItemImage) {
            setBoxItems(prevBoxItems => [
                ...prevBoxItems,
                { name: boxItemName, image: boxItemImage }  // Storing the File object
            ]);
            setBoxItemName('');
            setBoxItemImage(null);
        }
    };


    const deleteImageFromStorage = async (downloadUrl) => {
        const storage = getStorage();
        const storagePath = getStoragePathFromUrl(downloadUrl);

        if (!storagePath) {
            console.error("Failed to get storage path from URL");
            return;
        }

        const imageRef = ref(storage, storagePath);

        try {
            await deleteObject(imageRef);
            console.log("Image deleted successfully!");
        } catch (error) {
            console.error("Error deleting image: ", error);
        }
    };


    const handleRemoveBoxItem = async (indexToRemove) => {
        setBoxItems(prevBoxItems => prevBoxItems.filter((_, index) => index !== indexToRemove));
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

    const AddItem = async () => {
        const storage = getStorage();
        const firestore = getFirestore();

        const uploadImage = (image, folder) => {
            const timeStamp = Date.now();
            const uniqueName = `${timeStamp}-${image.name}`;
            const imageRef = ref(storage, folder + '/' + uniqueName);
            const uploadTask = uploadBytesResumable(imageRef, image);

            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => { },
                    (error) => {
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve({ uri: downloadURL });  // Return the download URL
                    }
                );
            });
        };

        const itemUploadPromises = images.map(img => uploadImage(img, 'itemImages'));
        const boxItemUploadPromises = boxItems.map(item => uploadImage(item.image, 'boxItemImages'));

        const allItemURLs = await Promise.all(itemUploadPromises);
        const allBoxItemURLs = await Promise.all(boxItemUploadPromises);

        await addDoc(collection(firestore, 'Items'), {
            productID: productID,
            name: itemName,
            category: selectedCategory,
            description: description,
            hasSizes: hasSizes,
            sizes: sizes,
            hasColors: hasColors,
            colors: colors,
            price: itemPrice,
            images: allItemURLs,
            boxItems: boxItems.map((item, idx) => ({
                name: item.name,
                image: allBoxItemURLs[idx]
            }))
        }).then(() => {
            alert("Item added successfully!");
            navigate(`/brands/${brandName}/products/${productID}/${productName}`);
        }).catch(error => {
            console.error("Error: ", error);
        });
    };

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

            <label className="brand-label">
                Description
                <textarea
                    className="description-textarea"
                    placeholder="Write a detailed description..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows="5"  // Adjust based on your requirement
                ></textarea>
            </label>

            <label className="brand-label">
                Box Items
                <div className="sizes-container">
                    <div className="input-group">
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Item Name"
                            value={boxItemName}
                            onChange={(e) => setBoxItemName(e.target.value)}
                        />
                        <input type="file" accept="image/*" onChange={(e) => setBoxItemImage(e.target.files[0])} />
                        <button className="add-button" onClick={handleAddBoxItem}>Add Box Item</button>
                    </div>

                    <ul className="size-list">
                        {boxItems.map((item, index) => (
                            <li key={index} className="size-item">
                                {item.name} -  <img src={URL.createObjectURL(item.image)} alt={item.name} width="50" height="50" />
                                <button className="add-button" onClick={() => handleRemoveBoxItem(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </label>

            <div className="button-container">
                <button className="brand-button" onClick={AddItem}>
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
