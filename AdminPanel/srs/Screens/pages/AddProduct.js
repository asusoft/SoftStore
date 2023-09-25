import React, { useState } from 'react';
import { getFirestore, addDoc, collection, getDocs } from '@firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../App.css'

const AddProduct = () => {
    const db = getFirestore();
    const [productName, setProductName] = useState("");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState('');

    const { brandID, brandName } = useParams();

    const navigate = useNavigate();

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

    console.log(categories)

    const cancelAddition = () => {
        navigate(`/brands/${brandName}`);
    }

    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    }

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
            navigate(`/brands/${brandName}`);
        } else {
            alert("Please select an image.");
        }
    }

    return (
        <div className="brand-form">
            Adding to {brandID}
            <label className="brand-label">
                Product Name
                <input
                    className="brand-input"
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
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
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>
            <label className="brand-label">
                Product Icon
                <input
                    className="brand-file-input"
                    type="file"
                    onChange={onImageChange}
                />
            </label>
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

export default AddProduct;
