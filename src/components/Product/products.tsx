"use client"

import React, { useState, useEffect, useCallback} from 'react';
import { Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Image from 'next/image';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddProducts from './addProducts';
import axios from 'axios';
import { Product } from '@/types/product';

const Products = () => {
    const [addProductsToogle, setAddProductsToogle] = useState(false);
    const [prodcutData, setProductData] = useState<Product[]>([]);
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);
    const [rows, setRows] = useState<Product | null>(null);
    const [copyData, setCopyData] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleChange = () => {
        setAddProductsToogle(false);
    }

    const getData = useCallback(() => {
        axios.get("https://backend-4c5c.onrender.com/api/product/")
            .then(response => {
                const fetchData = response.data;
                setProductData(fetchData);
                setCopyData(fetchData);
            })
    },[])

    useEffect(() => {
        getData();
    }, [addProductsToogle,getData]);

    const toggleDropdown = (id: number) => {
        setDropdownOpenIndex(dropdownOpenIndex === id ? null : id);
    };

    const addFunction = () => {
        setAddProductsToogle(true);
        setRows(undefined);
        setDropdownOpenIndex(null);
    }

    const editFunction = (data: Product) => {
        setAddProductsToogle(true);
        setDropdownOpenIndex(null);
        setRows(data);
    }

    const deleteFunction = (data: Product) => {
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

    const deleteRow = async (data: Product) => {
        let id = data.id;

        axios.delete(`https://backend-4c5c.onrender.com/api/product/${id}/`)
            .then(response => {
                toast('Deleted Successfully!', {
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

    const searchData = useCallback((searchQuery: string) => {
        let filterData: Product[] = prodcutData ;
        if (searchQuery) {
            filterData = prodcutData.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setProductData(filterData);
        }
        else {
            setProductData(copyData);
        }
    },[copyData,prodcutData])

    
    useEffect(() => {
        searchData(searchQuery);
    }, [searchQuery,searchData])

    return (
        <>
            {addProductsToogle ? (
                <AddProducts handleChangeToogle={handleChange} data={rows} />
            ) : (
                <>
                    <h2 className='font-bold mb-4'>Our Products</h2>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            placeholder='Search Products'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='mb-2 px-2 py-2 border-rounded'
                        />
                        <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => addFunction()}>
                            Add Products
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {prodcutData.map((product, index) => (
                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative" key={index}>
                                <div className="relative">
                                    <button
                                        id="dropdownButton"
                                        className="absolute top-2 right-2 inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg text-sm p-1.5"
                                        type="button"
                                        onClick={() => toggleDropdown(index)}
                                    >
                                        <span className="sr-only">Open dropdown</span>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                    </button>
                                    <div
                                        id="dropdown"
                                        className={`z-10 ${dropdownOpenIndex === index ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-2 top-10`}
                                    >
                                        <ul className="py-2" aria-labelledby="dropdownButton">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => editFunction(product)}>Edit</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => deleteFunction(product)}>Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <Image
                                        className="w-full h-40 object-cover mb-3 rounded-t-lg"
                                        src={product.product_image || "/Images/course.png"}
                                        alt="Bonnie image"
                                        width={90}
                                        height={70}
                                    />
                                </div>
                                <div className="flex flex-col items-left pb-10 bg-gray-100 pt-4 px-4">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900">{product.name}</h5>
                                    <span className="text-sm text-gray-700 font-medium mb-1">{product.title}</span>
                                    <span className="text-sm text-gray-500">{product.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <ToastContainer />
        </>
    );
};

export default Products;
