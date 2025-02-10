import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { TextFields as WatIcon } from '@mui/icons-material';

// Comprehensive WAT word list
const watWords = [
  "Responsibility", "Failure", "Happiness", "Mother", "Soldier", 
  "Fight", "Dream", "Coward", "Enemy", "Friend", "Love", "Honest", 
  "Courage", "War", "Peace", "Success", "Family", "Defeat", "Leader", 
  "Father", "Discipline", "Challenge", "Weakness", "Death", "Money", 
  "Power", "Jealousy", "Strength", "Home", "Work", "Study", "Marriage", 
  "Religion", "Politics", "Nature", "Relationship", "Mission", "Country", 
  "Self", "Hope", "Anger", "Fear", "Trust", "Knowledge", "Sacrifice", 
  "Freedom", "Justice", "Loyalty", "Duty", "Ambition"
];

const WATPracticeTest = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');
  const [submittedResponses, setSubmittedResponses] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [showEndPracticeDialog, setShowEndPracticeDialog] = useState(false);
  const [overallFeedback, setOverallFeedback] = useState(null);

  // Timer-related states
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per word
  const [timeTaken, setTimeTaken] = useState([]);
  const timerIntervalRef = useRef(null);

  // Prevent multiple submissions
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Start timer when component mounts or word changes
  useEffect(() => {
    // Reset timer for new word
    setTimeLeft(15);
    setIsSubmitted(false);
    
    // Clear any existing interval
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    // Start new timer
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          if (!isSubmitted) {
            handleSubmitResponse(true); // Auto submit if time runs out
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount or word change
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [currentWordIndex]);

  const handleSubmitResponse = async (isTimeOut = false) => {
    // Prevent multiple submissions
    if (isSubmitted) return;
    setIsSubmitted(true);

    // Stop the timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    // Calculate time taken
    const wordTimeTaken = 15 - timeLeft;
    setTimeTaken(prev => [...prev, wordTimeTaken]);

    // If it's a timeout and no response, set a default response
    const responseToSubmit = isTimeOut && !currentResponse 
      ? "No response provided within time limit." 
      : currentResponse;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/wat-practice-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: watWords[currentWordIndex],
          response: responseToSubmit
        }),
      });

      const feedbackData = await response.json();
      
      // Store the response with its feedback
      const responseWithFeedback = {
        word: watWords[currentWordIndex],
        userResponse: responseToSubmit,
        feedback: feedbackData,
        timeTaken: wordTimeTaken
      };

      setSubmittedResponses(prev => [...prev, responseWithFeedback]);
      setCurrentFeedback(feedbackData);
    } catch (error) {
      console.error('Error getting WAT practice feedback:', error);
    } finally {
      setLoading(false);
      setCurrentResponse('');
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < watWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setCurrentFeedback(null);
    } else {
      handleEndPractice();
    }
  };

  const handleEndPractice = async () => {
    // Close end practice dialog if open
    setShowEndPracticeDialog(false);
    
    // Prevent multiple submissions
    if (globalLoading) return;

    setGlobalLoading(true);
    try {
      const response = await fetch('http://localhost:5000/wat-overall-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses: submittedResponses.map(r => ({
            word: r.word,
            response: r.userResponse
          }))
        }),
      });

      const overallFeedbackData = await response.json();
      setOverallFeedback(overallFeedbackData);
    } catch (error) {
      console.error('Error getting overall feedback:', error);
    } finally {
      setGlobalLoading(false);
    }
  };

  // Render loading state
  if (globalLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh' 
        }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6">
            Generating your comprehensive feedback...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This may take a moment. Please wait.
          </Typography>
        </Box>
      </Container>
    );
  }

  // Render overall results
  if (overallFeedback) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            WAT Practice Results
          </Typography>

          {submittedResponses.map((item, index) => (
            <Paper key={index} sx={{ p: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Word {index + 1}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">
                    Time Taken: {item.timeTaken} seconds
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Word: {item.word}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                Your Response: {item.userResponse}
              </Typography>
              <Typography variant="body2">
                Feedback: {item.feedback.overall_feedback}
              </Typography>
            </Paper>
          ))}

          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Overall Assessment
            </Typography>
            <Typography variant="body1" align="center">
              {overallFeedback.analysis}
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

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
          WAT Practice Mode
        </Typography>

        {/* Timer Progress */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={(timeLeft / 15) * 100} 
            color={timeLeft <= 5 ? "error" : "primary"}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color={timeLeft <= 5 ? "error" : "text.secondary"}>
              Time Left: {timeLeft} seconds
            </Typography>
          </Box>
        </Box>

        {/* Current Word Section */}
        <Paper elevation={3} sx={{ p: 3, width: '100%', mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Word {currentWordIndex + 1}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {watWords[currentWordIndex]}
          </Typography>

          {/* Response TextField */}
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Write your associated word here..."
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            sx={{ mb: 2 }}
            disabled={currentFeedback !== null || loading}
          />
          
          {/* Submit/Next Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={() => setShowEndPracticeDialog(true)}
              disabled={loading}
            >
              End Practice
            </Button>

            {!currentFeedback ? (
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => handleSubmitResponse(false)}
                disabled={currentResponse.length < 1 || loading || isSubmitted}
              >
                {loading ? 'Submitting...' : 'Get Feedback'}
              </Button>
            ) : (
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleNextWord}
                disabled={loading}
              >
                {currentWordIndex < watWords.length - 1 
                  ? 'Next Word' 
                  : 'Finish'}
              </Button>
            )}
          </Box>
        </Paper>

        {/* Feedback Section */}
        {currentFeedback && (
          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              Feedback
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              {currentFeedback.overall_feedback}
            </Typography>

            {currentFeedback.strengths && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="success.main">
                  Strengths:
                </Typography>
                <Typography variant="body2">
                  {currentFeedback.strengths}
                </Typography>
              </Box>
            )}

            {currentFeedback.areas_of_improvement && (
              <Box>
                <Typography variant="subtitle1" color="error.main">
                  Areas of Improvement:
                </Typography>
                <Typography variant="body2">
                  {currentFeedback.areas_of_improvement}
                </Typography>
              </Box>
            )}
          </Paper>
        )}

        {/* End Practice Confirmation Dialog */}
        <Dialog
          open={showEndPracticeDialog}
          onClose={() => setShowEndPracticeDialog(false)}
        >
          <DialogTitle>End Practice?</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to end the practice session? 
              This will submit all your current responses and generate an overall assessment.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEndPracticeDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEndPractice} 
              variant="contained" 
              color="primary"
            >
              End Practice
            </Button>
          </DialogActions>
        </Dialog>

        {/* Global Loading Backdrop */}
        <Backdrop 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            color: '#fff' 
          }} 
          open={globalLoading}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress color="inherit" sx={{ mb: 2 }} />
            <Typography variant="h6">
              Generating your comprehensive feedback...
            </Typography>
            <Typography variant="body2">
              This may take a moment. Please wait.
            </Typography>
          </Box>
        </Backdrop>
      </Box>
    </Container>
  );
};

export default WATPracticeTest;