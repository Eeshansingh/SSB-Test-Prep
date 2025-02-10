import React from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button,
  LinearProgress
} from '@mui/material';
import {
  Psychology as TatIcon,
  TextFields as WatIcon,
  AutoStories as SrtIcon,
  Person as SdIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TestCard = ({ title, icon: Icon, description, progress, path }) => {
  const navigate = useNavigate();
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Progress: {progress}%
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ mt: 1 }} />
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(path)}>Practice Now</Button>
        <Button size="small">View History</Button>
      </CardActions>
    </Card>
  );
};

const Dashboard = () => {
  const tests = [
    {
      title: 'Thematic Apperception Test',
      icon: TatIcon,
      description: 'Practice writing stories based on ambiguous images. Improve your narrative and analytical skills.',
      progress: 60,
      path: '/tests/tat'
    },
    {
      title: 'Word Association Test',
      icon: WatIcon,
      description: 'Enhance your spontaneous response abilities with word association exercises.',
      progress: 30,
      path: '/tests/wat'
    },
    {
      title: 'Situation Reaction Test',
      icon: SrtIcon,
      description: 'Develop your decision-making skills with real-world scenario analysis.',
      progress: 45,
      path: '/tests/srt'
    },
    {
      title: 'Self Description Test',
      icon: SdIcon,
      description: 'Practice articulating your qualities and improve self-awareness.',
      progress: 20,
      path: '/tests/sd'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Test Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Track your progress and practice different SSB test formats.
      </Typography>
      
      <Grid container spacing={3}>
        {tests.map((test) => (
          <Grid item xs={12} sm={6} md={6} key={test.title}>
            <TestCard {...test} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
