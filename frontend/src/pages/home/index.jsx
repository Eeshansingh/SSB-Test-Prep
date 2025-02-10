import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography variant="h4">Welcome to SSB Prep</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Choose a test format from the sidebar to begin practicing.
      </Typography>
    </Box>
  );
};

export default Home;