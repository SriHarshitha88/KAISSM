// src/components/calendar/ContentCalendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Paper, Box, Typography } from '@mui/material';

const localizer = momentLocalizer(moment);

const ContentCalendar = ({ events }) => {
  return (
    <Paper sx={{ p: 2, margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        Content Calendar
      </Typography>
      <Box sx={{ height: '70vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', margin: '0 auto' }}
        />
      </Box>
    </Paper>
  );
};

export default ContentCalendar;