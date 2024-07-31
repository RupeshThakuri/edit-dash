"use client"

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

const Inbox = () => {
  const [message, setMessage] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copyData, setCopyData] = useState([]);

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const response = await axios.get('https://backend-4c5c.onrender.com/api/support/');
      setMessage(response.data);
      setCopyData(response.data);
    } catch (error) {
      console.error("Error while fetching messages:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`https://backend-4c5c.onrender.com/api/support/${id}/`);
      fetchMessage();
    } catch (error) {
      console.error("Error while deleting message:", error);
    }
  };

  const searchData = useCallback((searchQuery) => {
    let filterData = copyData;
    if (searchQuery) {
      filterData = copyData.filter(support =>
        support.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        support.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setMessage(filterData);
  }, [copyData]);

  useEffect(() => {
    searchData(searchQuery);
  }, [searchQuery, searchData]); // Ensure searchData is included

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Inbox</h2>
          <TextField
            variant="outlined"
            placeholder="Search for user, email address..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <IconButton onClick={fetchMessage}>
              <RefreshIcon />
            </IconButton>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center"></th>
                <th className="py-2 px-4 border-b">Sender</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Subject</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {message.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">
                    <Checkbox />
                  </td>
                  <td className="py-2 px-4 border-b">{msg.name}</td>
                  <td className="py-2 px-4 border-b">{msg.email}</td>
                  <td className="py-2 px-4 border-b">{msg.message}</td>
                  <td className="py-2 px-4 border-b">{msg.date}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <IconButton style={{ color: 'red' }} onClick={() => handleDelete(msg.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
