import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
} from '@mui/material';
import { Timer as TimerIcon } from '@mui/icons-material';

const VIEWING_TIME = 30; // 30 seconds for viewing
const WRITING_TIME = 240; // 4 minutes for writing
const TOTAL_IMAGES = 12;

const SAMPLE_IMAGE = 'https://www.ssbcrack.com/wp-content/uploads/2018/01/TAT.jpg'; // Temporary sample image

const FullTest = () => {
  const [phase, setPhase] = useState('instruction'); // 'instruction', 'viewing', 'writing'
  const [currentImage, setCurrentImage] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [story, setStory] = useState('');
  const [stories, setStories] = useState([]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && (phase === 'viewing' || phase === 'writing')) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && phase !== 'instruction') {
      if (phase === 'viewing') {
        setPhase('writing');
        setTimeLeft(WRITING_TIME);
      } else if (phase === 'writing') {
        handleStoryComplete();
      }
    }
    return () => clearInterval(timer);
  }, [timeLeft, phase]);

  const handleStartTest = () => {
    setPhase('viewing');
    setTimeLeft(VIEWING_TIME);
  };

  const handleStoryComplete = () => {
    const newStories = [...stories, story];
    setStories(newStories);
    
    if (currentImage < TOTAL_IMAGES) {
      setCurrentImage(prev => prev + 1);
      setStory('');
      setPhase('viewing');
      setTimeLeft(VIEWING_TIME);
    } else {
      // Test complete
      console.log('Test complete:', newStories);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Progress Tracker */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stepper activeStep={currentImage - 1} alternativeLabel>
          {[...Array(TOTAL_IMAGES)].map((_, index) => (
            <Step key={index}>
              <StepLabel>{`Image ${index + 1}`}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Timer and Phase Display */}
      <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          {phase === 'instruction' ? 'Instructions' : 
           currentImage === TOTAL_IMAGES ? 'Personal Story' : 
           `Image ${currentImage}`}
        </Typography>
        {phase !== 'instruction' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" color="textSecondary">
              {phase === 'viewing' ? 'Viewing Phase' : 'Writing Phase'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimerIcon color={timeLeft < 60 ? "error" : "primary"} />
              <Typography variant="h6" color={timeLeft < 60 ? "error" : "primary"}>
                {formatTime(timeLeft)}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Main Content Area */}
      {phase === 'instruction' ? (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            TAT Test Instructions
          </Typography>
          <Typography paragraph>
            You will be shown 12 images in sequence. For each image:
          </Typography>
          <Typography component="ul" sx={{ pl: 2 }}>
            <li>30 seconds to view and understand the image</li>
            <li>4 minutes to write your story</li>
            <li>The final image will be a blank screen for your personal story</li>
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleStartTest}
            sx={{ mt: 2 }}
          >
            Start Test
          </Button>
        </Paper>
      ) : phase === 'viewing' ? (
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          {currentImage < TOTAL_IMAGES ? (
            <img 
              src={SAMPLE_IMAGE}
              alt={`TAT Image ${currentImage}`}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          ) : (
            <Box sx={{ p: 4, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="h6" color="text.secondary">
                Write a personal story that reflects a significant moment or inspiration in your life.
              </Typography>
            </Box>
          )}
        </Paper>
      ) : (
        <Paper sx={{ p: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            placeholder={currentImage === TOTAL_IMAGES 
              ? "Write your personal story here..."
              : "Write your story based on the image shown..."}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            disabled={timeLeft === 0}
          />
          <LinearProgress 
            variant="determinate" 
            value={(WRITING_TIME - timeLeft) / WRITING_TIME * 100}
            sx={{ mt: 2 }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default FullTest;