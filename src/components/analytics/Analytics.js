// src/components/analytics/Analytics.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Engagement',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Social Media Engagement',
      },
    },
  };

  return (
    <Paper sx={{ p: 2, margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        Analytics
      </Typography>
      <Box sx={{ height: '60vh' }}>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Paper>
  );
};

export default Analytics;