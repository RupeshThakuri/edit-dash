import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios"; // Ensure axios is imported
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = ({ handleChangeToogle, data }) => {
    const [formData, setFormData] = useState({
        id: data?.id || '',
        name: data?.name || '',
        title: data?.title || '',
        gallery_image: null,
        text: data?.text || '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "product_image") {
            setFormData({
                ...formData,
                gallery_image: files[0],  // Corrected this line
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const submitProjects = async (e) => {
        e.preventDefault();

        const projectData = new FormData();
        projectData.append('name', formData.name);
        projectData.append('title', formData.title);
        projectData.append('text', formData.text);
        if (formData.gallery_image) {
            projectData.append('product_image', formData.gallery_image);
        }

        try {
            let response;
            if (formData.id) {
                const id = formData.id;
                response = await axios.put(`https://backend-4c5c.onrender.com/api/product/${id}/`, projectData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await axios.post("https://backend-4c5c.onrender.com/api/product/", projectData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

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
            <form onSubmit={submitProjects}>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Product Name <span className="text-red-500">*</span>
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
                            Select Project Types <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <select
                            id="title"
                            name="title"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select Project Types
                            </option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="Website Development">Website Development</option>
                            <option value="Software Development">Software Development</option>
                        </select>
                    </div>
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Product Description <span className="text-red-500">*</span>
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
                            Product Image<span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="file"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="product_image"
                            id="product_image"
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

export default AddProducts;
