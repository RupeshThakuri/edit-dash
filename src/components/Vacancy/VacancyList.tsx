"use client"

import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

// for table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// icon for table
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// icon for the applicant
import FileCopyIcon from '@mui/icons-material/FileCopy';

// axios
import axios from 'axios';

// confirm alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

// toast
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import extra files
import { Vacancies } from '@/types/vacancy';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

// files import
import AddVacancy from './AddVacancy';

const VacancyList = () => {
    // for redirecting add and edit
    const [addVacancy, setAddVacancy] = useState(false);
    const [rows, setRows] = useState<Vacancies | undefined>();
    const handleAddVacancy = () => {
        setAddVacancy(false);
    }

    // for table page
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [data, setData] = useState<Vacancies[]>([]);
    const [copyData, setCopyData] = useState<Vacancies[]>([]); // copying to use later in the filtering process

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // for setting data using api
    useEffect(() => {
        getData();
    }, [addVacancy]);

    const getData = () => {
        axios.get("https://backend-4c5c.onrender.com/api/vacancy/")
            .then(response => {
                const fetchedData = response.data;
                const sortedData = fetchedData.sort((a: Vacancies, b: Vacancies) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
                setData(sortedData);
                setCopyData(response.data);
            })
            .catch(err => {
                console.log("Error ", err);
            })
    }

    const deleteFunction = (data: Vacancies) => {
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
    };

    const deleteRow = async (data: Vacancies) => {
        let id = data.id;

        axios.delete(`https://backend-4c5c.onrender.com/api/vacancies/${id}/`)
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

    const editFunction = (data: Vacancies) => {
        setAddVacancy(true);
        setRows(data);
    };

    const addFunction = () => {
        setAddVacancy(true);
        setRows(undefined);
    };

    // for search function
    const [searchQuery, setSearchQuery] = useState<string>('');

    const searchData = useCallback((searchQuery: string) => {
        let filterData: Vacancies[] = copyData;
        if (searchQuery) {
            filterData = copyData.filter(vacancy =>
                vacancy.job_title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                vacancy.position_type.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                vacancy.location.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                vacancy.company_overview.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                vacancy.description.toLowerCase().includes(searchQuery.toLocaleLowerCase())
            );
        }
        setData(filterData);
    }, [copyData]);

    useEffect(() => {
        searchData(searchQuery);
    }, [searchQuery, searchData]);

    // table responsive sizes
    const [widthTable, setWidthTable] = useState<number>(0);
    const [screenWidth, setScreenwidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenwidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        if (screenWidth < 600 && screenWidth > 0) {
            setWidthTable(300);
        }
        else if (screenWidth < 900 && screenWidth > 600) {
            setWidthTable(800);
        }
        else if (screenWidth > 900) {
            setWidthTable(1400);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [screenWidth]);

    // sorting according to data
    const [sortDirections, setSortDirections] = useState({
        jobTitle: false,
        position: false,
        location: false,
        experience: false,
        companyOverview: false,
        deadline: false,
        noOfHiring: false
    });

    const handleSort = (column: keyof typeof sortDirections) => {
        const isAscending = sortDirections[column];
        const sortedData = [...data].sort((a: Vacancies, b: Vacancies) => {
            if (column === 'jobTitle') {
                return isAscending ? b.job_title.localeCompare(a.job_title) : a.job_title.localeCompare(b.job_title);
            }
            if (column === 'position') {
                return isAscending ? b.position_type.localeCompare(a.position_type) : a.position_type.localeCompare(b.position_type);
            }
            if (column === 'location') {
                return isAscending ? b.location.localeCompare(a.location) : a.location.localeCompare(b.location);
            }
            if (column === 'experience') {
                return isAscending ? b.no_experience - a.no_experience : a.no_experience - b.no_experience;
            }
            if (column === 'companyOverview') {
                return isAscending ? b.company_overview.localeCompare(a.company_overview) : a.company_overview.localeCompare(b.company_overview);
            }
            if (column === 'deadline') {
                return isAscending ? new Date(b.deadline).getTime() - new Date(a.deadline).getTime() : new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            }
            if (column === 'noOfHiring') {
                return isAscending ? b.no_of_hiring - a.no_of_hiring : a.no_of_hiring - b.no_of_hiring;
            }
            return 0;
        });
        setData(sortedData);
        setSortDirections(prevState => ({
            ...prevState,
            [column]: !isAscending
        }));
    };

    const redirectTo = () => {
        window.open("https://docs.google.com/spreadsheets/d/1Mtx7Oy9IKjJE-Y-vGVcc4o9l9q8sjFU3Xw-HnUjg6sU/edit?resourcekey#gid=1418698129", "_blank");
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <ToastContainer />
            {addVacancy ? (<AddVacancy handleAddVacancy={handleAddVacancy} rows={rows} />) : (
                <>
                    <h2 className='font-bold mb-4'>Vacancy</h2>
                    <div className="flex justify-between">
                        <div>
                            <input
                                type="text"
                                placeholder='search vacancies'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='mb-2 px-2 py-2 border-rounded'
                            />
                        </div>
                        <div>
                            <Button variant="outlined" endIcon={<FileCopyIcon />} onClick={() => redirectTo()}>
                                See the Applicant
                            </Button>
                            <Button variant="outlined" endIcon={<ControlPointIcon />} onClick={() => addFunction()} style={{ marginLeft: '4px' }}>
                                Add Vacancy
                            </Button>
                        </div>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }} className='mt-4'>
                        <TableContainer sx={{
                            maxHeight: 440,
                            maxWidth: `${widthTable}px`
                        }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">
                                            <div className="table_items flex items-center cursor-pointer" onClick={() => handleSort('jobTitle')}>
                                                <p className='font-bold'>Job Title</p>
                                                <ArrowDownwardIcon fontSize="small" className={sortDirections.jobTitle ? "rotate-180 transition-all" : ""} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="table_items flex items-center cursor-pointer" onClick={() => handleSort('position')}>
                                                <p className='font-bold'>Position</p>
                                                <ArrowDownwardIcon fontSize="small" className={sortDirections.position ? "rotate-180 transition-all" : ""} />
                                            </div>
                                        </TableCell>
                                        <TableCell className='flex' align="left">
                                            <div className="table_items flex items-center cursor-pointer" onClick={() => handleSort('location')}>
                                                <p className='font-bold'>Location</p>
                                                <ArrowDownwardIcon fontSize="small" className={sortDirections.location ? "rotate-180 transition-all" : ""} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="table_items flex items-center cursor-pointer" onClick={() => handleSort('experience')}>
                                                <p className='font-bold'>Experience</p>
                                                <ArrowDownwardIcon fontSize="small" className={sortDirections.experience ? "rotate-180 transition-all" : ""} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="table_items flex items-center cursor-pointer" onClick={() => handleSort('companyOverview')}>
                                                <p className='font-bold'>Company Overview</p>
                                                <ArrowDownwardIcon fontSize="small" className={sortDirections.companyOverview ? "rotate-180 transition-all" : ""} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">
                                            <div className="table_items flex items-center cursor-pointer" onClick={() => handleSort('deadline')}>
                                                <p className='font-bold'>Deadline</p>
                                                <ArrowDownwardIcon fontSize="small" className={sortDirections.deadline ? "rotate-180 transition-all" : ""} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="table_items flex items-center cursor-pointer" onClick={() => handleSort('noOfHiring')}>
                                                <p className='font-bold'>No Of Hiring</p>
                                                <ArrowDownwardIcon fontSize="small" className={sortDirections.noOfHiring ? "rotate-180 transition-all" : ""} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p className='font-bold'>Action</p>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((data, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell align='left'>
                                                        {data.job_title}
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        {data.position_type}
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        {data.location}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {data.no_experience}
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        {data.company_overview}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {data.deadline}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {data.no_of_hiring}
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        <div className='flex justify-center'>
                                                            <div className='cursor-pointer text-green-600 mr-2' onClick={() => editFunction(data)}>
                                                                <EditIcon />
                                                            </div>
                                                            <div className='cursor-pointer text-orange-600' onClick={() => deleteFunction(data)}>
                                                                <DeleteIcon />
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </>
            )}
        </div>
    )
}

export default VacancyList;
