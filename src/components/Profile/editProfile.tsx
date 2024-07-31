import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from 'axios';  // Make sure axios is imported
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = ({ editProfileHandle, adminData }) => {
  const [formData, setFormData] = useState({
    id: adminData.id,
    username: adminData.username,
    password: adminData.password,
    retype_password: adminData.retype_password,
    position: adminData.position,
    user_role: adminData.user_role,
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_image') {
      setFormData({
        ...formData,
        profile_image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitProfileInfo = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('retype_password', formData.retype_password);
    formDataToSend.append('position', formData.position);
    formDataToSend.append('user_role', formData.user_role);
    formDataToSend.append('profile_image', formData.profile_image);

    if (formData.password !== formData.retype_password) {
      toast.error('Passwords do not match!', {
        position: "top-right", autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      try {
        const id = formData.id;
        const response = await axios.put(`https://backend-4c5c.onrender.com/api/dashboard/${id}/`, formDataToSend);
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
        editProfileHandle();
      } catch (error) {
        console.error('Submission Failed:', error);
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
  }

  return (
    <>
      <ToastContainer />
      <div
        className="flex justify-start cursor-pointer"
        onClick={() => editProfileHandle()}
      >
        <ArrowBackIcon className="mr-2" />
        <h2 className="font-bold mb-4">Go Back</h2>
      </div>
      <form onSubmit={submitProfileInfo}>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mb-4">
            <label className="text-xl text-gray-600">
              Username <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-xl text-gray-600">
              Password <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="password"
              className="border-2 border-gray-300 p-2 w-full"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-xl text-gray-600">
              Re-type the Password <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="password"
              className="border-2 border-gray-300 p-2 w-full"
              name="retype_password"
              id="retype_password"
              value={formData.retype_password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-xl text-gray-600">
              Position <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full"
              name="position"
              id="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-xl text-gray-600">
              User Role <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full"
              name="user_role"
              id="user_role"
              value={formData.user_role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-xl text-gray-600">
              User Profile <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="file"
              className="border-2 border-gray-300 p-2 w-full"
              name="profile_image"
              id="profile_image"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex p-1">
          <button className="p-3 bg-blue-500 text-white hover:bg-blue-400">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
