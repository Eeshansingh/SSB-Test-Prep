import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  CheckCircle as SuccessIcon, 
  ErrorOutline as ErrorIcon 
} from '@mui/icons-material';

const SRTFeedback = ({ feedback, loading }) => {
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!feedback) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh' 
        }}
      >
        <Typography variant="h6" color="error">
          No feedback available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        SRT Test Results
      </Typography>

      <Grid container spacing={3}>
        {feedback.scenario_results && feedback.scenario_results.map((scenarioResult, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Scenario {index + 1}
                  </Typography>
                  {scenarioResult.is_appropriate ? (
                    <SuccessIcon color="success" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                </Box>

                <Typography variant="body1" sx={{ mb: 2 }}>
                  {scenarioResult.feedback}
                </Typography>

                {scenarioResult.strengths && (
                  <>
                    <Typography variant="subtitle1" color="success.main">
                      Strengths:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {scenarioResult.strengths}
                    </Typography>
                  </>
                )}

                {scenarioResult.areas_of_improvement && (
                  <>
                    <Typography variant="subtitle1" color="error.main">
                      Areas of Improvement:
                    </Typography>
                    <Typography variant="body2">
                      {scenarioResult.areas_of_improvement}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Overall Assessment
          </Typography>
          <Typography variant="body1" align="center">
            {feedback.overall_assessment || 'No overall assessment available.'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SRTFeedback;