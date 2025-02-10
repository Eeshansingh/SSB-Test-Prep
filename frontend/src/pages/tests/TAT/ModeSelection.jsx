import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid
} from '@mui/material';
import { 
  TextFields as WatIcon, 
  AssignmentTurnedIn as FullTestIcon, 
  PlayCircleOutline as PracticeIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const WATModeSelection = () => {
  const navigate = useNavigate();

  const testModes = [
    {
      title: 'Full Test',
      description: 'Complete Word Association Test with full time constraints',
      icon: <FullTestIcon fontSize="large" />,
      path: '/tests/wat/full'
    },
    {
      title: 'Practice Mode',
      description: 'Practice WAT with detailed feedback',
      icon: <PracticeIcon fontSize="large" />,
      path: '/tests/wat/practice'
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
        <WatIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
        
        <Typography variant="h4" gutterBottom>
          Word Association Test (WAT)
        </Typography>

        <Paper elevation={3} sx={{ p: 3, width: '100%', mb: 3 }}>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            WAT Procedure
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <WatIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Test Format" 
                secondary="A series of words will be displayed"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <WatIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Response Method" 
                secondary="Write the first word that comes to your mind"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <WatIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Time Limit" 
                secondary="Approximately 15 seconds per word"
              />
            </ListItem>
          </List>
        </Paper>

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

export default WATModeSelection;