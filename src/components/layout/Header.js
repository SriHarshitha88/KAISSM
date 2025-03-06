// src/components/layout/Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ onMenuToggle, darkMode, toggleDarkMode }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center',
            fontWeight: 700,
            letterSpacing: '-0.5px'
          }}
        >
          <img 
            src="/logo.png" 
            alt="KAISSM" 
            style={{ height: 32, marginRight: 12 }} 
          />
          Koffee With AI Social Media Manager
        </Typography>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;