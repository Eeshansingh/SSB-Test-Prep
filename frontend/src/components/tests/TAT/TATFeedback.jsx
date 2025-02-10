import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Timeline as StoryIcon,
  People as CharacterIcon,
  MilitaryTech as OfficerIcon,
  TipsAndUpdates as ImprovementIcon,
  AutoStories as StoryBookIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';

const Section = ({ icon: Icon, title, content }) => {
  if (!content) return null;
  
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            whiteSpace: 'pre-line',
            '& > p': { mb: 1 }
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ImprovedVersionSection = ({ content }) => {
  if (!content) return null;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StoryBookIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Improved Version</Typography>
        </Box>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            bgcolor: 'primary.light', 
            color: 'primary.contrastText',
            borderRadius: 1
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {content}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
};

const cleanText = (text = '') => {
  return text
    .replace(/\*\*/g, '')
    .replace(/^\d+\.\s*/gm, '')
    .replace(/^-\s*/gm, '')
    .trim();
};

const TATFeedback = ({ feedback, loading }) => {
  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Analyzing your story...</Typography>
      </Paper>
    );
  }

  if (!feedback?.analysis) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity="info">No feedback available</Alert>
      </Paper>
    );
  }

  const analysisText = feedback.analysis;
  const sections = analysisText.split(/\d+\.\s+\*\*[^*]+\*\*/).filter(Boolean);
  
  const [
    storyStructure,
    characterDevelopment,
    officerQualities,
    improvements,
    improvedVersion
  ] = sections.map(cleanText);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        {/* Main title */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PsychologyIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5">Story Analysis</Typography>
        </Box>

        <Section 
          icon={StoryIcon}
          title="Story Structure"
          content={storyStructure}
        />

        <Section 
          icon={CharacterIcon}
          title="Character Development"
          content={characterDevelopment}
        />

        <Section 
          icon={OfficerIcon}
          title="Officer Like Qualities"
          content={officerQualities}
        />

        <Section 
          icon={ImprovementIcon}
          title="Areas for Improvement"
          content={improvements}
        />

        <ImprovedVersionSection content={improvedVersion} />
      </Paper>
    </Box>
  );
};

export default TATFeedback;