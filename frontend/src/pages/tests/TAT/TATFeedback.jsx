import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Rating,
  Chip,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  AutoStories as StoryIcon,
  EmojiObjects as InsightIcon,
  Groups as SocialIcon,
  TrendingUp as ImprovementIcon
} from '@mui/icons-material';

const OLQIndicator = ({ title, score, description }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" gutterBottom>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Rating 
        value={score} 
        readOnly 
        max={5}
        sx={{ mr: 2 }}
      />
      <Typography variant="body2" color="text.secondary">
        {score}/5
      </Typography>
    </Box>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

const TATFeedback = ({ feedback, loading }) => {
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Analyzing your story...
        </Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Paper>
    );
  }

  // Example feedback structure (replace with actual API response)
  const feedbackData = feedback || {
    structure: {
      beginning: 4,
      middle: 3,
      end: 4,
      comments: "Strong opening and conclusion, but the middle could use more development."
    },
    olqIndicators: [
      {
        title: "Effective Intelligence",
        score: 4,
        description: "Shows good problem-solving approach and analytical thinking."
      },
      {
        title: "Initiative",
        score: 3,
        description: "Demonstrates moderate level of proactive behavior."
      },
      {
        title: "Social Effectiveness",
        score: 4,
        description: "Good understanding of social dynamics and relationships."
      }
    ],
    improvedStory: "Your improved story version would go here...",
    suggestions: [
      "Add more details about the protagonist's decision-making process",
      "Include more emotional elements",
      "Strengthen the resolution"
    ]
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Overall Analysis */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <PsychologyIcon sx={{ mr: 1 }} />
          Story Analysis
        </Typography>
        <Alert severity="info" sx={{ mt: 1 }}>
          {feedbackData.structure.comments}
        </Alert>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Story Structure */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <StoryIcon sx={{ mr: 1 }} />
          Story Structure
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={`Beginning: ${feedbackData.structure.beginning}/5`}
            color={feedbackData.structure.beginning >= 4 ? "success" : "default"}
          />
          <Chip 
            label={`Middle: ${feedbackData.structure.middle}/5`}
            color={feedbackData.structure.middle >= 4 ? "success" : "default"}
          />
          <Chip 
            label={`End: ${feedbackData.structure.end}/5`}
            color={feedbackData.structure.end >= 4 ? "success" : "default"}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* OLQ Indicators */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <InsightIcon sx={{ mr: 1 }} />
          Officer Like Qualities (OLQs)
        </Typography>
        {feedbackData.olqIndicators.map((olq, index) => (
          <OLQIndicator key={index} {...olq} />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Improved Story */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <ImprovementIcon sx={{ mr: 1 }} />
          Improved Version
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="body1">
            {feedbackData.improvedStory}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Suggestions */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon sx={{ mr: 1 }} />
          Suggestions for Improvement
        </Typography>
        <Box component="ul" sx={{ mt: 1, pl: 2 }}>
          {feedbackData.suggestions.map((suggestion, index) => (
            <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
              {suggestion}
            </Typography>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default TATFeedback;