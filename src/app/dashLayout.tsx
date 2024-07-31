"use client";

import PropTypes from 'prop-types';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material';

//icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AttractionsIcon from '@mui/icons-material/Attractions';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import InboxIcon from '@mui/icons-material/Inbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CollectionsIcon from '@mui/icons-material/Collections';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const router = useRouter();
  const path = usePathname();
  const [adminData, setAdminData] = React.useState(null);

  React.useEffect(() => {
    const data = localStorage.getItem("Admin data");
    if (data) {
      setAdminData(JSON.parse(data));
    } else {
      router.push("/signup");
    }
  }, [router]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  //handle collapse
  const [IsCollapse, setIsCollapse] = React.useState(false);
  const handleCollapse = () => {
    setIsCollapse(!IsCollapse);
  }

  //logout
  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  }

  const drawer = (
    <div>
      <Toolbar >
        <Image src="/images/logo/dark-logo.png" alt='logo' width={45} height={45} />
        <h2 className='text-lg text-bold'><span className='mr-1 text-amber-600'>eDIT</span><span className='text-blue-600'>Enterprises</span></h2>
      </Toolbar>
      <Divider />
      <List>
        {['Dashboard', 'Inbox', 'Members', 'Courses', 'Clients', 'Vacancy', 'Projects', 'Profile', 'Gallery'].map((text, index) => (
          <ListItem key={text} disablePadding
            className={path.startsWith("/" + text.toLocaleLowerCase()) ? "text-blue-600 bg-slate-100" : "text-slate-700"}
            onClick={() => {
              router.push('/' + text.toLocaleLowerCase());
            }}
          >
            <ListItemButton>
              <ListItemIcon className={path.startsWith("/" + text.toLocaleLowerCase()) ? "text-blue-600 bg-slate-100" : "text-slate-700"}>
                {index === 0 && <DashboardIcon />}
                {index === 1 && <InboxIcon />}
                {index === 2 && <PeopleIcon />}
                {index === 3 && <MenuBookIcon />}
                {index === 4 && <HandshakeIcon />}
                {index === 5 && <NoteAltIcon />}
                {index === 6 && <BusinessCenterIcon />}
                {index === 7 && <PersonIcon />}
                {index === 8 && <CollectionsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding onClick={handleCollapse}>
          <ListItemButton>
            <ListItemIcon>
              <AttractionsIcon />
            </ListItemIcon>
            <ListItemText primary="Blogs & More" />
          </ListItemButton>
          {IsCollapse ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
        </ListItem>
      </List>
      <Divider />
      <Collapse in={IsCollapse} timeout="auto" unmountOnExit>
        <List className='ml-4'>
          {['Blog', 'Products', 'News'].map((text, index) => (
            <ListItem key={text} disablePadding
              className={path.startsWith("/" + text.toLocaleLowerCase()) ? "text-blue-600 bg-slate-100" : "text-slate-700"}
              onClick={() => {
                router.push('/' + text.toLocaleLowerCase());
              }}
            >
              <ListItemButton>
                <ListItemIcon className={path.startsWith("/" + text.toLocaleLowerCase()) ? "text-blue-600 bg-slate-100" : "text-slate-700"}>
                  {index === 0 && <AttractionsIcon />}
                  {index === 1 && <BusinessCenterIcon />}
                  {index === 2 && <NewspaperIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#f0c169",
          color: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <DashboardIcon />
          </IconButton>
          <div className='flex justify-between w-full'>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            <div className="logout cursor-pointer" onClick={handleLogout}>
              <h2>Logout <ExitToAppIcon /></h2>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <main>
          {children}
        </main>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
};
