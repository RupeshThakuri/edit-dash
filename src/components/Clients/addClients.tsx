import React, { useState } from 'react';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//type
import { Client } from '@/types/client';

const AddClients = ({ handleChangeToogle, rows  }) => {
  const [formData, setFormData] = useState<Client>({
    id: rows.id,
    client_name: rows.client_name,
    number: rows.number,
    review: rows.review,
    gmail: rows.gmail,
    client_image: rows.client_image,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "client_image") {
      setFormData({
        ...formData,
        client_image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitClientData = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("client_name", formData.client_name);
    formDataToSubmit.append("number", formData.number.toLocaleString());
    formDataToSubmit.append("review", formData.review);
    formDataToSubmit.append("gmail", formData.gmail);
    formDataToSubmit.append("client_image", formData.client_image);

    try {
      let response;
      if (formData.id) {
        const id = formData.id;
        response = await axios.put(
          `https://backend-4c5c.onrender.com/api/client/${id}/`,
          formDataToSubmit
        );
      } else {
        response = await axios.post(
          "https://backend-4c5c.onrender.com/api/client/",
          formDataToSubmit
        );
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
      console.error('Submission error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }

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
    <div>
      <ToastContainer/>
      <div className="flex justify-start cursor-pointer" onClick={() => handleChangeToogle()}>
        <ArrowBackIcon className='mr-2' />
        <h2 className='font-bold mb-4'>Go Back</h2>
      </div>
      <form onSubmit={submitClientData}>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Clients Name <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="client_name"
              id="client_name"
              value={formData.client_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="tel"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="number"
              id="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Review <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="review"
              id="review"
              value={formData.review}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Gmail ID <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="email"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="gmail"
              id="gmail"
              value={formData.gmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Profile of Client<span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="file"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="client_image"
              id="profile"
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
    </div>
  )
}

export default AddClients;
