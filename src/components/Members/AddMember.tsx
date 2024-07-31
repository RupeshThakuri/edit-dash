import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddMember = ({ handleAddSection, rows }) => {
  const [formData, setFormData] = useState({
    id: rows?.id ?? '',
    member_name: rows?.member_name ?? '',
    position: rows?.position ?? '',
    salary: rows?.salary ?? 0,
    status: rows?.status ?? '',
    phone: rows?.phone ?? '',
    working_days: rows?.working_days ?? 0,
    member_profile: null,
    description: rows?.description ?? '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "member_profile") {
      setFormData({
        ...formData,
        member_profile: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitMember = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("member_name", formData.member_name);
    formDataToSend.append("salary", formData.salary);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("working_days", formData.working_days);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("status", formData.status);
    if (formData.member_profile) {
      formDataToSend.append("member_profile", formData.member_profile);
    }
  
    try {
      let response;
      if (rows) {
        const id = formData.id;
        response = await axios.put(
          `https://backend-4c5c.onrender.com/api/member/${id}/`,
          formDataToSend
        );
      } else {
        response = await axios.post(
          "https://backend-4c5c.onrender.com/api/member/",
          formDataToSend
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
      handleAddSection();
    } catch (error) {
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
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="flex justify-start cursor-pointer"
        onClick={handleAddSection}
      >
        <ArrowBackIcon className="mr-2" />
        <h2 className="font-bold mb-4">Go Back</h2>
      </div>
      <form onSubmit={submitMember}>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Name <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="member_name"
              id="member_name"
              onChange={handleChange}
              value={formData.member_name}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Position <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="position"
              id="position"
              onChange={handleChange}
              value={formData.position}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Salary <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="salary"
              id="salary"
              onChange={handleChange}
              value={formData.salary}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Status <span className="text-red-500">*</span>
            </label>
            <br />
            <select
              id="status"
              name="status"
              className="border-2 border-gray-300 p-2 w-full double_input"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Working">Working</option>
              <option value="Holiday">Holiday</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Contact <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={formData.phone}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Working Days (In Week) <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="working_days"
              id="working_days"
              onChange={handleChange}
              value={formData.working_days}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Profile <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="file"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="member_profile"
              id="member_profile"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 mr-5">
          <label className="text-xl text-gray-600">
            Description <span className="text-red-500">*</span>
          </label>
          <br />
          <CKEditor
            editor={ClassicEditor}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData({
                ...formData,
                description: data,
              });
            }}
          />
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

export default AddMember;
