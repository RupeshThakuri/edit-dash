'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Image from 'next/image';

//toast
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//confirm alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

//component
import AddClients from './addClients';

//client data type
import { Client } from '@/types/client';
import axios from 'axios';

const Clients = () => {
    //toggle
    const [addClientsToogle, setAddClientsToogle] = useState(false);
    const handleChange = () => {
        setAddClientsToogle(false);
    }

    //data
    const [clientsDetail, setClientsDetail] = useState<Client[]>([]);
    const [copyData, setCopyData] = useState<Client[]>([]); //copying to use later in the filtering process
    const [searchQuery, setSearchQuery] = useState<string>('');

    const getData = () => {
        axios.get("https://backend-4c5c.onrender.com/api/client/")
            .then(response => {
                const fetchData = response.data;
                setClientsDetail(fetchData);
                setCopyData(response.data)
            })
    }

    useEffect(() => {
        getData();
    }, [addClientsToogle]);

    //search function
    const searchData = useCallback((searchQuery: string) => {
        let filterData: Client[] = clientsDetail;
        if (searchQuery) {
            filterData = clientsDetail.filter(client =>
                client.client_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setClientsDetail(filterData);
        } else {
            setClientsDetail(copyData);
        }
    }, [clientsDetail, copyData]);

    useEffect(() => {
        searchData(searchQuery);
    }, [searchQuery, searchData]);

    //toggle edit and delete
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);

    const toggleDropdown = (id: number) => {
        setDropdownOpenIndex(dropdownOpenIndex === id ? null : id);
    };

    //add function
    const [rows, setRows] = useState<Client>();

    const addFunction = () => {
        setAddClientsToogle(true);
        setRows(undefined);
        setDropdownOpenIndex(null);
    }

    const editFunction = (data: Client) => {
        setAddClientsToogle(true);
        setDropdownOpenIndex(null);
        setRows(data);
    }

    const deleteFunction = (data: Client) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete this data?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteRow(data)
                },
                {
                    label: 'No',
                }
            ]
        });
        setDropdownOpenIndex(null);
    }

    const deleteRow = async (data: Client) => {
        let id = data.id;

        axios.delete(`https://backend-4c5c.onrender.com/api/client/${id}/`)
            .then(response => {
                toast('Deleted Successfully !', {
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
                getData();
            })
            .catch(error => {
                toast.error(error.message, {
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
    }

    return (
        <>
            {addClientsToogle ? (
                <AddClients handleChangeToogle={handleChange} rows={rows} />
            ) : (
                <>
                    <h2 className='font-bold mb-4'>Clients</h2>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            placeholder='search client'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='mb-2 px-2 py-2 border-rounded'
                        />
                        <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => addFunction()}>
                            Add Clients
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {clientsDetail.map((client, index) => (
                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative" key={index}>
                                <div className="flex justify-end px-4 pt-4">
                                    <button
                                        id="dropdownButton"
                                        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg text-sm p-1.5"
                                        type="button"
                                        onClick={() => toggleDropdown(index)}
                                    >
                                        <span className="sr-only">Open dropdown</span>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                    </button>
                                    {/* Dropdown menu */}
                                    <div
                                        id="dropdown"
                                        className={`z-10 ${dropdownOpenIndex === index ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-4 top-12`}
                                    >
                                        <ul className="py-2" aria-labelledby="dropdownButton">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => editFunction(client)}>Edit</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => deleteFunction(client)}>Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center pb-10">
                                    <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src={client.client_image || "/Images/course.png"} alt="Bonnie image" width={90} height={70} />
                                    <h5 className="mb-1 text-xl font-medium text-gray-900">{client.client_name}</h5>
                                    <span className="text-sm text-gray-500 ">{client.review}</span>
                                    <div className="flex mt-4 md:mt-6">
                                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">{client.number}</a>
                                        <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Message</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </>
    );
};

export default Clients;
