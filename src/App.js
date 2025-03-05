// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ContentCalendar from './components/calendar/ContentCalendar';
import Analytics from './components/analytics/Analytics';
import OAuthCallback from './pages/OAuthCallback';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Example events for the calendar
  const sampleEvents = [
    { title: 'Post about new product', start: new Date(), end: new Date() },
  ];

  // Example analytics data
  const sampleAnalyticsData = [
    { label: 'Post 1', value: 50 },
    { label: 'Post 2', value: 75 },
    { label: 'Post 3', value: 100 },
  ];

  // Create a theme based on the darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: darkMode ? '#90caf9' : '#1976d2' },
      background: { default: darkMode ? '#121212' : '#fff', paper: darkMode ? '#1d1d1d' : '#fff' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/* Header */}
          <Header onMenuToggle={handleMenuToggle} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Sidebar */}
          <Sidebar open={isSidebarOpen} onClose={handleMenuToggle} />

          {/* Main Content Area */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<ContentCalendar events={sampleEvents} />} />
              <Route path="/analytics" element={<Analytics data={sampleAnalyticsData} />} />
              <Route path="/oauth/callback" element={<OAuthCallback />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;