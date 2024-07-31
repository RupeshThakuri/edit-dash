import React, { useState } from 'react';

//ckeditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//for tostify success after insert items
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//extra import
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddVacancy = ({ handleAddVacancy, rows }) => {
    //taking inputs and setting the variables
    const [formData, setFormData] = useState({
        id: rows.id,
        job_title: rows.job_title,
        location: rows.location,
        position_type: rows.position_type,
        no_experience: rows.no_experience,
        company_overview: rows.company_overview,
        deadline: rows.deadline,
        no_of_hiring: rows.no_of_hiring,
        description: rows.description,
        vacancy_image: null, // Initialize as null to store the file object
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'vacancy_img') {
            setFormData({
                ...formData,
                vacancy_image: files[0], // Store the file object
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    //on submit vacancy if rows exist it is edit else add
    const submitVacancy = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('job_title', formData.job_title);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('position_type', formData.position_type);
        formDataToSend.append('no_experience', formData.no_experience);
        formDataToSend.append('company_overview', formData.company_overview);
        formDataToSend.append('deadline', formData.deadline);
        formDataToSend.append('no_of_hiring', formData.no_of_hiring);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('vacancy_image', formData.vacancy_image);

        try {
            let response;
            if (rows) {
                const id = formData.id;
                response = await axios.put(`https://backend-4c5c.onrender.com/api/vacancies/${id}/`, formDataToSend);
            } else {
                response = await axios.post("https://backend-4c5c.onrender.com/api/vacancy/", formDataToSend);
            }

            toast('Submitted Successfully!', {
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
            handleAddVacancy();
        } catch (error) {
            toast.error('Submission Failed!', {
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
    }

    return (
        <>
            <ToastContainer />
            <div className="flex justify-start cursor-pointer" onClick={() => handleAddVacancy()}>
                <ArrowBackIcon className='mr-2' />
                <h2 className='font-bold mb-4'>Go Back</h2>
            </div>
            <form onSubmit={submitVacancy} className='mt-2'>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="mb-4 ">
                        <label className="text-xl text-gray-600">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full"
                            name="job_title"
                            id="job_title "
                            value={formData.job_title}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="text-xl text-gray-600">
                            Position Type <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="position_type"
                            id="position_type"
                            onChange={handleChange}
                            value={formData.position_type}
                            required
                        />
                    </div>
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Experience <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="number"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="no_experience"
                            id="no_experience"
                            onChange={handleChange}
                            value={formData.no_experience}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="text-xl text-gray-600">
                            Company Overview <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="company_overview"
                            id="company_overview"
                            onChange={handleChange}
                            value={formData.company_overview}
                            required
                        />
                    </div>
                    <div className="mb-3 mr-5">
                        <label className="text-xl text-gray-600">
                            Deadline for Application{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="datetime-local"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="deadline"
                            id="deadline"
                            onChange={handleChange}
                            value={formData.deadline}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="text-xl text-gray-600">
                            Num of hiring <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="number"
                            className="border-2 border-gray-300 p-2 w-full double_input"
                            name="no_of_hiring"
                            id="no_of_hiring"
                            onChange={handleChange}
                            value={formData.no_of_hiring}
                            required
                        />
                    </div>
                    <div className="mb-4 ">
                        <label className="text-xl text-gray-600">
                            Vacancy Image <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <input
                            type="file"
                            className="border-2 border-gray-300 p-2 w-full"
                            name="vacancy_img"
                            id="vacancy_img"
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-8 w-full">
                    <label className="text-xl text-gray-600">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <br />
                    <CKEditor
                        editor={ClassicEditor}
                        onReady={(editor) => {
                        }}
                        data={formData.description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setFormData({ ...formData, description: data });
                        }}
                    />
                </div>
                <div className="flex p-1 justify-end">
                    <button
                        type="submit"
                        className="p-3 bg-blue-500 text-white hover:bg-blue-400">
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddVacancy;
