import React, { useState } from 'react';
import axios from 'axios';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProgress = ({ handleProgressToggle, projectDataForProgress }) => {
    const [formData, setFormData] = useState({
        updates: "",
        requirements: "",
        future_plans: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const progressData = {
            project_id: projectDataForProgress.id,
            requirements: formData.requirements,
            updates: formData.updates,
            future_plans: formData.future_plans,
        };

        axios.post("https://backend-4c5c.onrender.com/api/progress/", progressData)
            .then((response) => {
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
            })
            .catch((error) => { // Use parentheses here
                console.log(error);
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
            });

        window.location.reload();
    };

    //reload page while clicking back so that it redirect directly to the home page having projet table
    const realoadPage = () => {
        window.location.reload();
    }

    return (
        <>
            <ToastContainer />
            <div className="flex justify-start cursor-pointer" onClick={realoadPage}>
                <ArrowBackIcon className="mr-2" />
                <h2 className="font-bold mb-4">Go Back</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Updates <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="updates"
                            id="updates"
                            value={formData.updates}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Requirements <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="requirements"
                            id="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Future Plan / Steps <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="future_plans"
                            id="future_plans"
                            value={formData.future_plans}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end p-1">
                    <button className="p-3 bg-blue-500 text-white hover:bg-blue-400" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddProgress;
