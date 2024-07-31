import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddGallery = ({ handleChangeToogle, data }) => {
    const [formData, setFormData] = useState({
        id: data?.id || '',
        name: data.name || '',
        image: null,
        text: data.text || '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'image' ? files[0] : value,
        });
    };

    const submitGallery = async (e) => {
        e.preventDefault();

        const galleryData = new FormData();
        galleryData.append('name', formData.name);
        galleryData.append('text', formData.text);
        if (formData.image) {
            galleryData.append('image', formData.image);
        }

        try {
            const response = formData.id ?
                await axios.put(`https://backend-4c5c.onrender.com/api/gallery/${formData.id}/`, galleryData) :
                await axios.post("https://backend-4c5c.onrender.com/api/gallery/", galleryData);

            toast("Submitted Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            handleChangeToogle();
        } catch (error) {
            console.error(error);
            toast.error("Submission Failed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex justify-start cursor-pointer" onClick={handleChangeToogle}>
                <ArrowBackIcon className="mr-2" />
                <h2 className="font-bold mb-4">Go Back</h2>
            </div>
            <form onSubmit={submitGallery}>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Gallery Name <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Image Description <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="text"
                            id="text"
                            value={formData.text}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Gallery Image <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="file"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="image"
                            id="image"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end p-1">
                    <button className="p-3 bg-blue-500 text-white hover:bg-blue-400">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddGallery;






