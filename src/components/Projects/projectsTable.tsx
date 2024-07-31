"use client"

import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProjects from './addProjects';
import AddProgress from './addProgress';
import { ProjectDataType } from '@/types/projects';
import { ProgressDataType } from '@/types/progress';

type ProjectsProps = {
  projectData: ProjectDataType;
  progressData: ProgressDataType[];
  editFunction: (data: ProjectDataType) => void;
  deleteFunction: (data: ProjectDataType) => void;
  setProgressToggle: (state: boolean) => void;
  setProjectDataForProgress: (data: ProjectDataType) => void;
};

const Projects: React.FC<ProjectsProps> = (props) => {
  const { projectData, progressData, editFunction, deleteFunction, setProgressToggle, setProjectDataForProgress } = props;
  const [open, setOpen] = useState(false);

  let statusCell;
  if (projectData.status === "Completed") {
    statusCell = <span className='text-white bg-green-500 py-2 px-2 rounded-lg'>{projectData.status}</span>;
  } else if (projectData.status === "In Progress") {
    statusCell = <span className='text-white bg-amber-500 py-2 px-2 rounded-lg'>{projectData.status}</span>;
  } else {
    statusCell = <span className='text-white bg-red-500 py-2 px-2 rounded-lg'>{projectData.status}</span>;
  }

  const addProgress = (projectData: ProjectDataType) => {
    setProgressToggle(true);
    setProjectDataForProgress(projectData);
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {projectData.project_name}
        </TableCell>
        <TableCell align="center">{projectData.no_of_members}</TableCell>
        <TableCell align="center">{projectData.deadline}</TableCell>
        <TableCell align="center">{statusCell}</TableCell>
        <TableCell align="center">
          <div className='flex justify-center'>
            <div className='cursor-pointer text-green-600 mr-2'>
              <EditIcon onClick={() => editFunction(projectData)} />
            </div>
            <div className='cursor-pointer text-orange-600'>
              <DeleteIcon onClick={() => deleteFunction(projectData)} />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" className='font-bold'>
                <div className="flex justify-between">
                  <div className="progress">
                    <p>Progress</p>
                  </div>
                  <div className="Add ml-2">
                    <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={() => addProgress(projectData)}>
                      Add Progress
                    </Button>
                  </div>
                </div>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><p className='font-bold'>Date</p></TableCell>
                    <TableCell><p className='font-bold'>Updates</p></TableCell>
                    <TableCell align="center"><p className='font-bold'>Requirements</p></TableCell>
                    <TableCell align="center"><p className='font-bold'>Next Procedure</p></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {progressData
                    .filter(progress => progress.project_id === projectData.id)
                    .map((progressData) => (
                      <TableRow key={progressData.date}>
                        <TableCell component="th" scope="row">
                          {progressData.date}
                        </TableCell>
                        <TableCell>{progressData.updates}</TableCell>
                        <TableCell align="center">{progressData.requirements}</TableCell>
                        <TableCell align="center">
                          {progressData.future_plans}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const ProjectsTable: React.FC = () => {
  const [projectsData, setProjectsData] = useState<ProjectDataType[]>([]);
  const [progressData, setProgresssData] = useState<ProgressDataType[]>([]);
  const [copyData, setCopyData] = useState<ProjectDataType[]>([]);
  const [addProjectStatus, setAddProjectStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rows, setRows] = useState<ProjectDataType | null>(null);
  const [progressToggle, setProgressToggle] = useState(false);
  const [projectDataForProgress, setProjectDataForProgress] = useState<ProjectDataType | null>(null);

  const getData = () => {
    axios.get("https://backend-4c5c.onrender.com/api/projects/")
      .then(response => {
        const fetchedData = response.data;
        const sortedData = fetchedData.sort((a: ProjectDataType, b: ProjectDataType) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
        setProjectsData(sortedData);
        setCopyData(sortedData);
      })
      .catch(err => {
        console.log("Error ", err);
      });

    axios.get("https://backend-4c5c.onrender.com/api/progress/")
      .then(response => {
        const fetchedData = response.data;
        const sortedData = fetchedData.sort((a: ProgressDataType, b: ProgressDataType) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setProgresssData(sortedData);
      })
      .catch(err => {
        console.log("Error ", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const searchData = useCallback((searchQuery: string) => {
    if (searchQuery) {
      const filteredData = copyData.filter(project =>
        project.project_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProjectsData(filteredData);
    } else {
      setProjectsData(copyData);
    }
  }, [copyData]);

  useEffect(() => {
    searchData(searchQuery);
  }, [searchQuery, searchData]);

  const handleProjects = () => {
    window.location.reload();
    setAddProjectStatus(false);
  };

  const addFunction = () => {
    setAddProjectStatus(true);
    setRows(null);
  };

  const editFunction = (data: ProjectDataType) => {
    setAddProjectStatus(true);
    setRows(data);
  };

  const deleteFunction = (data: ProjectDataType) => {
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

  const deleteRow = async (data: ProjectDataType) => {
    let id = data.id;

    axios.delete(`https://backend-4c5c.onrender.com/api/projects/${id}/`)
      .then(() => axios.delete(`https://backend-4c5c.onrender.com/api/progress/project/${id}/`))
      .then(() => {
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
  };

  return (
    <>
      {addProjectStatus ? (
        <AddProjects handleProjectsToogle={handleProjects} data={rows || {}} />
      ) : (
        <>
          {progressToggle ? (
            <AddProgress handleProgressToggle={() => setProgressToggle(false)} projectDataForProgress={projectDataForProgress} />
          ) : (
            <>
              <ToastContainer />
              <h2 className='font-bold mb-4'>Projects</h2>
              <div className="flex justify-between mb-2">
                <div>
                  <input
                    type="text"
                    placeholder='search vacancies'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='mb-2 px-2 py-2 border-rounded'
                  />
                </div>
                <Button variant="outlined" endIcon={<ControlPointIcon />} onClick={addFunction}>
                  Add Project
                </Button>
              </div>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell className='font-bold'>Projects Name</TableCell>
                      <TableCell align="center" className='font-bold'>Num Of Team</TableCell>
                      <TableCell align="center" className='font-bold'>Deadline</TableCell>
                      <TableCell align="center" className='font-bold'>Status</TableCell>
                      <TableCell align="center" className='font-bold'>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projectsData.map((row) => (
                      <Projects key={row.id} projectData={row} progressData={progressData} editFunction={editFunction} deleteFunction={deleteFunction} setProgressToggle={setProgressToggle} setProjectDataForProgress={setProjectDataForProgress} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProjectsTable;
