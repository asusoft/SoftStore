import React, { useState } from 'react';
import { getFirestore, addDoc, collection } from '@firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const cancelAddition = () => {
        navigate("/categories");
    }

    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    const addCategory = async () => {
        const db = getFirestore();
        const storage = getStorage();

        if (image) {
            const imageRef = ref(storage, `Categories/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);

            // Wait for the upload to complete
            await uploadTask;

            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(db, 'Categories'), {
                name: categoryName,
                icon: imageUrl
            });

            alert("Category added successfully!");
            navigate("/categories");
        } else {
            alert("Please select an image.");
        }
    }

    return (
        <div className="brand-form">
            <label className="brand-label">
                Category Name
                <input
                    className="brand-input"
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                />
            </label>
            <label className="brand-label">
                Category Icon
                <input
                    className="brand-file-input"
                    type="file"
                    onChange={onImageChange}
                />
            </label>
            <div className="button-container">
                <button className="brand-button" onClick={addCategory}>
                    Add Category
                </button>
                <button className="brand-button cancel-button" onClick={cancelAddition}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddCategory;
