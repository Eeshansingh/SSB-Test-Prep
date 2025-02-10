import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Timer as TimerIcon,
  Psychology as TestIcon,
  School as PracticeIcon,
  TextFields as WordIcon,
} from '@mui/icons-material';

const WATModeSelection = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Word Association Test (WAT)
        </Typography>

        {/* Test Info */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Test Overview
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <WordIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="60 Words Total"
                secondary="Quick associations required for each word"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TimerIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="15 Seconds Per Word"
                secondary="Total test duration: 15 minutes"
              />
            </ListItem>
          </List>
        </Paper>

        {/* Mode Selection */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Full Test Mode */}
          <Paper 
            elevation={3} 
            sx={{ 
              flex: 1, 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TestIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Full Test Mode
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Complete test with all 60 words under actual test conditions.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• Continuous 15-minute session" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Full performance analysis" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Comprehensive feedback" />
              </ListItem>
            </List>
            <Button 
              variant="contained" 
              color="primary"
              sx={{ mt: 'auto' }}
              onClick={() => navigate('/tests/wat/full')}
            >
              Start Full Test
            </Button>
          </Paper>

          {/* Practice Mode */}
          <Paper 
            elevation={3} 
            sx={{ 
              flex: 1, 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PracticeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Practice Mode
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Practice with individual words and get immediate feedback.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• Single word practice" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Detailed feedback per response" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Learn and improve technique" />
              </ListItem>
            </List>
            <Button 
              variant="outlined" 
              color="primary"
              sx={{ mt: 'auto' }}
              onClick={() => navigate('/tests/wat/practice')}
            >
              Start Practice
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default WATModeSelection;