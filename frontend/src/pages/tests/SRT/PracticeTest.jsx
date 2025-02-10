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
import { 
  PlayCircleOutline as PracticeIcon, 
  Timer as TimerIcon 
} from '@mui/icons-material';

// Hardcoded scenarios (same as before)
const srtScenarios = [
    {
      "id": 1,
      "scenario": "He was going through a jungle and his bicycle got punctured."
    },
    {
      "id": 2,
      "scenario": "He was coming out of the bank and suddenly saw two Robbers."
    },
    {
      "id": 3,
      "scenario": "He was sending an important message and suddenly the network went down."
    },
    {
      "id": 4,
      "scenario": "He was going for his final exams and suddenly his mother fell ill."
    },
    {
      "id": 5,
      "scenario": "You are a Doctor and Ten Patients came to your hospital at the same time for treatment."
    },
    {
      "id": 6,
      "scenario": "He was going to a park and saw his girlfriend holding the hand of another person."
    },
    {
      "id": 7,
      "scenario": "He was riding his bike and saw a man bleeding on the roadside."
    },
    {
      "id": 8,
      "scenario": "It was the last day to submit the fee in his college and he forgot the money at home."
    },
    {
      "id": 9,
      "scenario": "He was going to his office and saw smoke coming out from the window of a house."
    },
    {
      "id": 10,
      "scenario": "She was coming out of the metro and suddenly realized her mobile was missing."
    },
    {
      "id": 11,
      "scenario": "She was going for her final exams and she found that her admit card was missing."
    },
    {
      "id": 12,
      "scenario": "He was going for an important meeting and suddenly his bike got punctured."
    },
    {
      "id": 13,
      "scenario": "You are the captain of your basketball team and your main player has got injured."
    },
    {
      "id": 14,
      "scenario": "You were walking back to your house and saw three men coming towards you."
    },
    {
      "id": 15,
      "scenario": "He was the leader of a team and his team was lagging behind in achieving the target."
    },
    {
      "id": 16,
      "scenario": "Hearing an unusual sound at night he woke up and found a thief jumping out of his window."
    },
    {
      "id": 17,
      "scenario": "He was going to attend the SSB interview. On reaching the Railway Station he noticed that his suitcase had been stolen with his original certificates needed at SSB."
    },
    {
      "id": 18,
      "scenario": "He found that he was being given step motherly treatment by his seniors."
    },
    {
      "id": 19,
      "scenario": "He had to undergo an urgent surgical operation but there was no one to look after him."
    },
    {
      "id": 20,
      "scenario": "He and his friends are required to go to the other side of the bridge but the bridge got damaged."
    },
    {
      "id": 21,
      "scenario": "He heard the shouts for help and found a small boy being carried away into the water current."
    },
    {
      "id": 22,
      "scenario": "He opened his packet of food and a female beggar with a small baby wanted a share of the food."
    },
    {
      "id": 23,
      "scenario": "His friend came to him frequently and demanded money on some pretext."
    },
    {
      "id": 24,
      "scenario": "You are a teacher at school and a kid is continuously making mischief."
    },
    {
      "id": 25,
      "scenario": "You are going for your final exams and all the buses in the city are not operating due to the strike."
    },
    {
      "id": 26,
      "scenario": "She was coming after attending the marriage of her friend and suddenly found that her wallet was missing and she had no money."
    },
    {
      "id": 27,
      "scenario": "He was enjoying nearby the river and hearing screams he found that a boy was drowning in the river."
    },
    {
      "id": 28,
      "scenario": "He was scolded by his boss and was given a very difficult task."
    },
    {
      "id": 29,
      "scenario": "It was raining very heavily in his city and he needed important medicines."
    },
    {
      "id": 30,
      "scenario": "She was going to her college and saw a girl falling down from her bicycle."
    },
    {
      "id": 31,
      "scenario": "She was the leader of her hiking team and one of her teammates got injured during hiking."
    },
    {
      "id": 32,
      "scenario": "He was a soldier posted in the field area and suddenly four terrorists attacked."
    },
    {
      "id": 33,
      "scenario": "Rahul was going on a bike trip and suddenly the bike of his friend broke down."
    },
    {
      "id": 34,
      "scenario": "He was enjoying in a fair and suddenly some people created a nuisance."
    },
    {
      "id": 35,
      "scenario": "She noticed that her brother is continuously getting low marks in the exams."
    },
    {
      "id": 36,
      "scenario": "She was returning back from her university and some students started protesting without any permission."
    },
    {
      "id": 37,
      "scenario": "He was the only child of his parents and he was called for fighting the war."
    },
    {
      "id": 38,
      "scenario": "She was making tea and suddenly the gas cylinder caught fire."
    },
    {
      "id": 39,
      "scenario": "He was in a different country and wanted to buy some food."
    },
    {
      "id": 40,
      "scenario": "He was going on camping with friends in the forest and suddenly saw 20 tribal people coming towards them."
    },
    {
      "id": 41,
      "scenario": "He notices a car running at high speed and runs over a child on the road."
    },
    {
      "id": 42,
      "scenario": "His parents want him to marry a wealthy and less educated girl and he has already found a suitable educated girl for himself."
    },
    {
      "id": 43,
      "scenario": "He was appointed team captain of basketball but other players revolted against his appointment."
    },
    {
      "id": 44,
      "scenario": "An epidemic has spread in the village due to poor hygienic conditions."
    },
    {
      "id": 45,
      "scenario": "A fellow passenger has fallen from a running train."
    },
    {
      "id": 46,
      "scenario": "Ram wanted to become an engineer but his parents could not afford the fees of the course."
    },
    {
      "id": 47,
      "scenario": "He is the main player of his team and he got injured before the final match."
    },
    {
      "id": 48,
      "scenario": "He went to the government office for documents but a government employee asked him for a bribe."
    },
    {
      "id": 49,
      "scenario": "He is the leader of his team but members of his team are not working efficiently and not taking the project seriously."
    },
    {
      "id": 50,
      "scenario": "Rahul recently had a fight with his friend. But now Rahul needs the help of his friend."
    },
    {
      "id": 51,
      "scenario": "He was traveling in a flight and suddenly one man tried to hijack the flight using a knife."
    },
    {
      "id": 52,
      "scenario": "He was going on a camping trip with friends. But suddenly they forgot the way."
    },
    {
      "id": 53,
      "scenario": "Two days before the semi-final match of a tournament, his doubles badminton partner had to go out of station due to urgent work."
    },
    {
      "id": 54,
      "scenario": "His SSB Interview was scheduled but on the same date, his sister’s wedding was also fixed."
    },
    {
      "id": 60,
      "scenario": "You want to marry a girl of different religion, but your parents are not allowing this marriage."
    }
]
;

const SRTPracticeTest = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');
  const [submittedResponses, setSubmittedResponses] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [showEndPracticeDialog, setShowEndPracticeDialog] = useState(false);
  const [overallFeedback, setOverallFeedback] = useState(null);

  // Timer-related states
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeTaken, setTimeTaken] = useState([]);
  const timerIntervalRef = useRef(null);

  // Prevent multiple submissions
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Start timer when component mounts or scenario changes
  useEffect(() => {
    // Reset timer for new scenario
    setTimeLeft(30);
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

    // Cleanup interval on component unmount or scenario change
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [currentScenarioIndex]);

  const handleSubmitResponse = async (isTimeOut = false) => {
    // Prevent multiple submissions
    if (isSubmitted) return;
    setIsSubmitted(true);

    // Stop the timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    // Calculate time taken
    const scenarioTimeTaken = 30 - timeLeft;
    setTimeTaken(prev => [...prev, scenarioTimeTaken]);

    // If it's a timeout and no response, set a default response
    const responseToSubmit = isTimeOut && !currentResponse 
      ? "No response provided within time limit." 
      : currentResponse;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/srt-practice-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenarioId: srtScenarios[currentScenarioIndex].id,
          response: responseToSubmit
        }),
      });

      const feedbackData = await response.json();
      
      // Store the response with its feedback
      const responseWithFeedback = {
        scenario: srtScenarios[currentScenarioIndex],
        userResponse: responseToSubmit,
        feedback: feedbackData,
        timeTaken: scenarioTimeTaken
      };

      setSubmittedResponses(prev => [...prev, responseWithFeedback]);
      setCurrentFeedback(feedbackData);
    } catch (error) {
      console.error('Error getting SRT practice feedback:', error);
    } finally {
      setLoading(false);
      setCurrentResponse('');
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < srtScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
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
      const response = await fetch('http://localhost:5000/srt-overall-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses: submittedResponses.map(r => r.userResponse)
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
            SRT Practice Results
          </Typography>

          {submittedResponses.map((item, index) => (
            <Paper key={index} sx={{ p: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Scenario {index + 1}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TimerIcon color="primary" fontSize="small" />
                  <Typography variant="body2">
                    Time Taken: {item.timeTaken} seconds
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                {item.scenario.scenario}
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
              {overallFeedback.overall_assessment}
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
        <PracticeIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
        
        <Typography variant="h4" gutterBottom>
          SRT Practice Mode
        </Typography>

        {/* Timer Progress */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={(timeLeft / 30) * 100} 
            color={timeLeft <= 10 ? "error" : "primary"}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color={timeLeft <= 10 ? "error" : "text.secondary"}>
              Time Left: {timeLeft} seconds
            </Typography>
          </Box>
        </Box>

        {/* Current Scenario Section */}
        <Paper elevation={3} sx={{ p: 3, width: '100%', mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Scenario {currentScenarioIndex + 1}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {srtScenarios[currentScenarioIndex].scenario}
          </Typography>

          {/* Response TextField */}
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Write your response here..."
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
                disabled={currentResponse.length < 10 || loading || isSubmitted}
              >
                {loading ? 'Submitting...' : 'Get Feedback'}
              </Button>
            ) : (
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleNextScenario}
                disabled={loading}
              >
                {currentScenarioIndex < srtScenarios.length - 1 
                  ? 'Next Scenario' 
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

export default SRTPracticeTest;