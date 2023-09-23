import React, { useState } from 'react';
import { getFirestore, addDoc, collection } from '@firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const CreateBrand = () => {
    const [brandName, setBrandName] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const cancelAddition = () => {
        navigate("/brands");
    }

    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    const addBrand = async () => {
        const db = getFirestore();
        const storage = getStorage();

        if (image) {
            const imageRef = ref(storage, `Brands/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);

            // Wait for the upload to complete
            await uploadTask;

            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(db, 'Brands'), {
                name: brandName,
                icon: imageUrl
            });

            alert("Brand added successfully!");
            navigate("/brands");
        } else {
            alert("Please select an image.");
        }
    }

    return (
        <div className="brand-form">
            <label className="brand-label">
                Brand Name
                <input
                    className="brand-input"
                    type="text"
                    placeholder="Brand Name"
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                />
            </label>
            <label className="brand-label">
                Brand Icon
                <input
                    className="brand-file-input"
                    type="file"
                    onChange={onImageChange}
                />
            </label>
            <button className="brand-button" onClick={addBrand}>
                Add Brand
            </button>
            <button className="brand-button cancel-button" onClick={cancelAddition}>
                Cancel
            </button>
        </div>
    );
}

export default CreateBrand;
