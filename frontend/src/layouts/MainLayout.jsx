import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography 
} from '@mui/material';
import {
  Menu as MenuIcon,
  Psychology as TatIcon,
  TextFields as WatIcon,
  AutoStories as SrtIcon,
  Person as SdIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SSB Prep
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* This creates space for the AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} to="/tests/tat">
              <ListItemIcon><TatIcon /></ListItemIcon>
              <ListItemText primary="TAT" />
            </ListItem>
            <ListItem button component={Link} to="/tests/wat">
              <ListItemIcon><WatIcon /></ListItemIcon>
              <ListItemText primary="WAT" />
            </ListItem>
            <ListItem button component={Link} to="/tests/srt">
              <ListItemIcon><SrtIcon /></ListItemIcon>
              <ListItemText primary="SRT" />
            </ListItem>
            <ListItem button component={Link} to="/tests/sd">
              <ListItemIcon><SdIcon /></ListItemIcon>
              <ListItemText primary="Self Description" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/settings">
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* This creates space for the AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;