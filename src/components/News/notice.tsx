"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Notice = () => {
  const [formData, setFormData] = useState({ message: "", notice_image: null });
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    fetchNotice();
  }, []);

  const fetchNotice = async () => {
    try {
      const response = await axios.get("https://backend-4c5c.onrender.com/api/notice/");
      setNotice(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedValue = name === "notice_image" ? files[0] : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("message", formData.message);
      formDataToSend.append("notice_image", formData.notice_image);

      const response = await axios.post("https://backend-4c5c.onrender.com/api/notice/", formDataToSend);
      console.log("Response from API:", response.data);
      setFormData({ message: "", notice_image: null });
      fetchNotice(); // Fetch the updated list of notices after successful submission
    } catch (error) {
      console.error("Error while posting notice data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
        console.log("Deleting notice with ID:", id);
        await axios.delete(`https://backend-4c5c.onrender.com/api/notice/${id}/`);
      fetchNotice(); // Fetch the updated list of notices after successful deletion
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">Notice Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-sm px-3 py-2 w-full"
            rows={5}
            placeholder="Enter notice message"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="notice_image" className="block mb-2">Notice Image</label>
          <input
            type="file"
            id="notice_image"
            name="notice_image"
            onChange={handleChange}
            className="border border-gray-300 rounded-sm px-3 py-2 w-full"
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600">Submit</button>
      </form>

      <h2 className="text-2xl font-semibold mt-8">Notices</h2>
      <ul>
        {notice.map((note) => (
          <li key={note.id} className="mb-4">
            <div>
              <p>Message: {note.message}</p>
              {note.notice_image && (
                <Image src={note.notice_image} alt="Notice" className="max-w-xs mt-2" width={200} height={200}/>
              )}
            </div>
            <div className="mt-2">
              <button onClick={() => handleDelete(note.id)} className="bg-red-500 text-white px-3 py-1 rounded-sm mr-2 hover:bg-red-600">Delete</button>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-600">Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notice;






