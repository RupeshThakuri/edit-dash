'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from '@mui/material/Button';

//components
import AddMember from "./AddMember";

//axios
import axios from 'axios';

//confirm alert
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

//toast
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the Members type according to the API response
export interface Members {
  id: number;
  member_name: string;
  position: string;
  salary: number;
  status: string;
  phone: string;
  working_days: number;
  member_profile: string;
  description: string;
}

export default function MemberList() {

  // Page change
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Toggle add user
  const [addUser, setAddUser] = useState(false);
  const handleChange = () => {
    setAddUser(false);
  }

  // Data fetch
  const [data, setData] = useState<Members[]>([]);
  const [rows, setRows] = useState<Members | undefined>();

  const getData = useCallback(() => {
    axios.get("https://backend-4c5c.onrender.com/api/member/")
      .then(response => {
        const fetchedData: Members[] = response.data;
        const sortedData = fetchedData.sort((a, b) => a.member_name.localeCompare(b.member_name));
        setData(sortedData);
        setCopyData(sortedData);
      })
      .catch(err => {
        console.log("Error ", err);
      })
  },[])

  useEffect(() => {
    getData();
  }, [addUser,getData]);

  // Add function
  const addFunction = () => {
    setAddUser(true);
    setRows(undefined);
  }

  // Edit function
  const editFunction = (data: Members) => {
    setAddUser(true);
    setRows(data);
  };

  // Delete function
  const deleteFunction = (data: Members) => {
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

  const deleteRow = async (data: Members) => {
    let id = data.id;

    axios.delete(`https://backend-4c5c.onrender.com/api/member/${id}/`)
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

  // Search function
  const [copyData, setCopyData] = useState<Members[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  
  const searchData = useCallback((searchQuery: string) => {
    let filterData: Members[] = copyData;
    if (searchQuery) {
      filterData = copyData.filter(member =>
        member.member_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setData(filterData);
  },[copyData])

  useEffect(() => {
    searchData(searchQuery);
  }, [searchQuery,searchData]);

  return (
    <>
      {addUser ? (
        <AddMember handleAddSection={handleChange} rows={rows} />
      ) : (
        <>
          <ToastContainer />
          <h2 className='font-bold mb-4'>Members</h2>
          <div className="flex justify-between mb-2">
            <input
              type="text"
              placeholder='search members'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='mb-2 px-2 py-2 border-rounded'
            />
            <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={addFunction}>
              Add User
            </Button>
          </div>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: 100 }}>
                      <p className='font-bold'>Name</p>
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 100 }}>
                      <p className='font-bold'>Position</p>
                    </TableCell>
                    <TableCell align="right" style={{ minWidth: 50 }}>
                      <p className='font-bold'>Salary</p>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 50 }}>
                      <p className='font-bold'>Contact</p>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 50 }}>
                      <p className='font-bold'>Working Days</p>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 50 }}>
                      <p className='font-bold'>Description</p>
                    </TableCell>
                    <TableCell align="right" style={{ minWidth: 100 }}>
                      <p className='font-bold'>Action</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((member, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={member.id}>
                        <TableCell align='left'>
                          {member.member_name}
                        </TableCell>
                        <TableCell align='left'>
                          {member.position}
                        </TableCell>
                        <TableCell align='right'>
                          {member.salary}
                        </TableCell>
                        <TableCell align='center'>
                          {member.phone}
                        </TableCell>
                        <TableCell align='center'>
                          {member.working_days}
                        </TableCell>
                        <TableCell align='center'>
                          {member.description}
                        </TableCell>
                        <TableCell align='right'>
                          <div className='flex justify-center'>
                            <div className='cursor-pointer text-green-600 mr-2' onClick={() => editFunction(member)}>
                              <EditIcon />
                            </div>
                            <div className='cursor-pointer text-orange-600' onClick={() => deleteFunction(member)}>
                              <DeleteIcon />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
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
    </>
  );
}
