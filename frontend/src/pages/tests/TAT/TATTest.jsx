import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { Timer as TimerIcon } from '@mui/icons-material';
import TATFeedback from '../../../components/tests/TAT/TATFeedback';

const TATTest = () => {
  const [timeLeft, setTimeLeft] = useState(240);
  const [story, setStory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentImage] = useState('https://www.ssbcrack.com/wp-content/uploads/2018/01/TAT.jpg');

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleSubmit = async () => {
    setLoading(true);
    setIsSubmitted(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/submit-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          story,
          imageUrl: currentImage
        }),
      });

      const data = await response.json();
      console.log('Response from server:', data); // Debug log
      setFeedback(data);
    } catch (error) {
      console.error('Error submitting story:', error);
      setError('Failed to submit story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header Section */}
      <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">TAT Practice Test</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TimerIcon color={timeLeft < 60 ? "error" : "primary"} />
          <Typography variant="h6" color={timeLeft < 60 ? "error" : "primary"}>
            {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!isSubmitted ? (
        <>
          {/* Image Section */}
          <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
            <img 
              src={currentImage} 
              alt="TAT test image"
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </Paper>

          {/* Story Writing Section */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={8}
              variant="outlined"
              placeholder="Write your story here..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              disabled={isSubmitted || timeLeft === 0}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                {story.length} characters
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => setShowConfirmDialog(true)}
                disabled={isSubmitted || timeLeft === 0 || story.length < 10}
              >
                Submit Story
              </Button>
            </Box>
          </Paper>
        </>
      ) : (
        <TATFeedback feedback={feedback} loading={loading} />
      )}

      {/* Confirmation Dialog */}
      <Dialog 
        open={showConfirmDialog} 
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>Submit Story?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your story? You won't be able to make changes after submission.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              setShowConfirmDialog(false);
              handleSubmit();
            }} 
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TATTest;