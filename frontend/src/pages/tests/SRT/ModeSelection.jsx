import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper 
} from '@mui/material';
import { 
  AutoStories as SrtIcon, 
  AssignmentTurnedIn as FullTestIcon, 
  PlayCircleOutline as PracticeIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SRTModeSelection = () => {
  const navigate = useNavigate();

  const testModes = [
    {
      title: 'Full Test',
      description: 'Complete Situation Reaction Test with full time constraints',
      icon: <FullTestIcon fontSize="large" />,
      path: '/tests/srt/full'
    },
    {
      title: 'Practice Mode',
      description: 'Practice SRT scenarios with detailed feedback',
      icon: <PracticeIcon fontSize="large" />,
      path: '/tests/srt/practice'
    }
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        mt: 4 
      }}>
        <SrtIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Situation Reaction Test (SRT)
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          The Situation Reaction Test assesses your ability to make quick, practical decisions under pressure.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {testModes.map((mode) => (
            <Grid item xs={12} sm={6} key={mode.title}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { 
                    transform: 'scale(1.05)',
                    boxShadow: 6 
                  }
                }}
                onClick={() => navigate(mode.path)}
              >
                {mode.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {mode.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mode.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SRTModeSelection;