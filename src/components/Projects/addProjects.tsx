import React, { useState } from "react";

//icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//axios
import axios from "axios"; // Ensure axios is imported

//toast msg
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProjects = ({ handleProjectsToogle, data }) => {
  const [formData, setFormData] = useState({
    id: data?.id || "",
    project_name: data?.project_name || "",
    no_of_members: data?.no_of_members || "",
    status: data?.status || "",
    deadline: data?.deadline || "",
    requirements: data?.requirements || "",
    updates: data?.updates || "",
    future_plans: data?.future_plans || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitProjects = async (e) => {
    e.preventDefault();

    const projectData = {
      project_name: formData.project_name,
      no_of_members: formData.no_of_members,
      status: formData.status,
      deadline: formData.deadline,
    };

    

    try {
      let response;
      if (formData.id) {
        const id = formData.id;
        response = await axios.put(`https://backend-4c5c.onrender.com/api/projects/${id}/`, projectData);
      } else {
        response = await axios.post("https://backend-4c5c.onrender.com/api/projects/", projectData);
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
      handleProjectsToogle();
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
      <div className="flex justify-start cursor-pointer" onClick={handleProjectsToogle}>
        <ArrowBackIcon className="mr-2" />
        <h2 className="font-bold mb-4">Go Back</h2>
      </div>
      <form onSubmit={submitProjects}>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Project Name <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="project_name"
              id="project_name"
              value={formData.project_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Number of Members Involved <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="no_of_members"
              id="no_of_members"
              value={formData.no_of_members}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Deadline <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="datetime-local"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="deadline"
              id="deadline"
              value={formData.deadline}
              onChange={handleChange}
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
                Select Project status
              </option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
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

export default AddProjects;
