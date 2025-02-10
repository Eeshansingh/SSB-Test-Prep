import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
const port = 5000;


dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// Load SRT Scenarios
const srtScenariosData = [
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

// In your server.js or backend file

// WAT Practice Feedback Endpoint
app.post('/wat-practice-feedback', async (req, res) => {
  const { word, response } = req.body;

  if (!word || !response) {
    return res.status(400).json({ 
      error: true, 
      message: 'Please provide word and response.' 
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert SSB psychological evaluator analyzing Word Association Test responses. Provide constructive feedback on the candidate's word association."
        },
        {
          role: "user",
          content: `Word: ${word}
Candidate's Response: ${response}

Provide a brief analysis of the response, focusing on:
1. Psychological insights
2. Potential personality traits
3. Brief constructive feedback`
        }
      ],
      temperature: 0.7
    });

    const feedbackText = completion.choices[0].message.content;
    
    const feedback = {
      overall_feedback: feedbackText
    };

    res.json(feedback);
  } catch (error) {
    console.error('Error analyzing WAT response:', error);
    res.status(500).json({ 
      error: true, 
      message: error.message 
    });
  }
});

// WAT Overall Feedback Endpoint
app.post('/wat-overall-feedback', async (req, res) => {
  const { responses } = req.body;

  if (!responses || !Array.isArray(responses)) {
    return res.status(400).json({ 
      error: true, 
      message: 'Invalid responses submission.' 
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert SSB psychological evaluator providing an overall assessment of a candidate's Word Association Test performance."
        },
        {
          role: "user",
          content: `Analyze the following set of word associations and provide a comprehensive overall assessment:

${responses.map((resp, index) => `Word ${index + 1}: ${resp.word}
Response: ${resp.response}`).join('\n\n')}

Please provide a holistic evaluation of the candidate's psychological profile, focusing on personality traits, emotional intelligence, and potential leadership qualities.`
        }
      ],
      temperature: 0.7
    });

    const overallFeedback = {
      overall_assessment: completion.choices[0].message.content
    };

    res.json(overallFeedback);
  } catch (error) {
    console.error('Error generating overall WAT feedback:', error);
    res.status(500).json({ 
      error: true, 
      message: error.message 
    });
  }
});

// Add this to your backend file
app.post('/srt-overall-feedback', async (req, res) => {
  const { responses } = req.body;

  if (!responses || !Array.isArray(responses)) {
    return res.status(400).json({ 
      error: true, 
      message: 'Invalid responses submission.' 
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert SSB psychological evaluator providing an overall assessment of a candidate's Situation Reaction Test performance."
        },
        {
          role: "user",
          content: `Analyze the following set of scenario responses and provide a comprehensive overall assessment of the candidate's problem-solving skills, leadership potential, and emotional intelligence:

${responses.map((response, index) => `Scenario ${index + 1} Response: ${response}`).join('\n\n')}

Please provide a holistic evaluation that captures the candidate's strengths, areas of improvement, and potential as a leader.`
        }
      ],
      temperature: 0.7
    });

    const overallFeedback = {
      overall_assessment: completion.choices[0].message.content
    };

    res.json(overallFeedback);
  } catch (error) {
    console.error('Error generating overall SRT feedback:', error);
    res.status(500).json({ 
      error: true, 
      message: error.message 
    });
  }
});

// New endpoint for full SRT test submission
app.post('/submit-srt-test', async (req, res) => {
  const { responses } = req.body;

  if (!responses || !Array.isArray(responses) || responses.length !== 60) {
    return res.status(400).json({ 
      error: true, 
      message: 'Submission must include exactly 60 responses.' 
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Cost-effective model
      messages: [
        {
          role: "system",
          content: "You are an expert SSB psychological evaluator analyzing Situation Reaction Test responses. Provide comprehensive, objective assessment of the candidate's problem-solving skills, leadership potential, and emotional intelligence."
        },
        {
          role: "user",
          content: responses.map((response, index) => 
            `Scenario ${index + 1}: ${srtScenariosData[index].scenario}
            
Candidate's Response: ${response}
`).join('\n\n')
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const feedbackText = completion.choices[0].message.content;
    
    // Parse feedback (you might want to improve this parsing)
    const scenarioFeedbacks = responses.map((response, index) => ({
      scenarioId: index + 1,
      scenario: srtScenariosData[index].scenario,
      userResponse: response,
      feedback: `Scenario ${index + 1} Assessment: ${feedbackText.split(`Scenario ${index + 1} Assessment:`)[1]?.split('\n')[0] || 'No specific feedback available.'}`
    }));

    const feedback = {
      scenarioFeedbacks,
      overallAssessment: feedbackText.split('Overall Assessment:')[1]?.trim() || 'No overall assessment available.'
    };

    res.json(feedback);
  } catch (error) {
    console.error('Error analyzing SRT test:', error);
    res.status(500).json({ 
      error: true, 
      message: error.message 
    });
  }
});

// Clean text helper function
const cleanResponseText = (text) => {
  return text
    .replace(/\*\*/g, '')  // Remove **
    .replace(/^\d+\.\s*/gm, '')  // Remove numbered lists
    .replace(/^- /gm, '')  // Remove bullet points
    .split('\n')
    .filter(line => line.trim())  // Remove empty lines
    .join('\n');
};

// Format response into sections
const formatResponse = (text) => {
  const sections = text.split('\n\n').filter(Boolean);
  const formatted = {
    structure: sections[0],
    characters: sections[1],
    qualities: sections[2],
    improvements: sections[3],
    improvedVersion: sections[4]
  };

  return {
    success: true,
    analysis: {
      storyStructure: cleanResponseText(formatted.structure),
      characterDevelopment: cleanResponseText(formatted.characters),
      officerQualities: cleanResponseText(formatted.qualities),
      improvements: cleanResponseText(formatted.improvements),
      improvedVersion: cleanResponseText(formatted.improvedVersion)
    }
  };
};

// Middleware
app.use(cors());
app.use(express.json());

// TAT Images with descriptions
const tatImages = {
  'https://www.ssbcrack.com/wp-content/uploads/2018/01/TAT.jpg': 
    "This black-and-white illustration depicts a scene inside a living room. A young child is seen playing with a toy tank on the floor, appearing engaged and happy. The child has short, curly hair and is wearing a simple outfit. Standing nearby is a woman, likely the child's mother, dressed in a traditional Indian sari. Her posture suggests she is looking at the child with a gentle expression. On the wall, a framed photograph of a man in military uniform is hung, adorned with a garland, suggesting he is deceased."
};

// Story analysis endpoint
app.post('/submit-story', async (req, res) => {
  const { story, imageUrl } = req.body;

  if (!story || !imageUrl) {
    return res.status(400).json({ 
      error: true, 
      message: 'Please provide both story and image URL.' 
    });
  }

  const imageDescription = tatImages[imageUrl];
  if (!imageDescription) {
    return res.status(400).json({
      error: true,
      message: 'Invalid image URL or image description not found.'
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert SSB psychological evaluator analyzing TAT stories. Provide structured feedback without any markdown formatting or special characters."
        },
        {
          role: "user",
          content: `Analyze this TAT story based on the following image:

Image Description: ${imageDescription}

Story: ${story}

Provide analysis in these sections:

1. Story Structure
- Beginning
- Middle
- End

2. Character Development
- Mother's character
- Child's character
- Other characters

3. Officer Like Qualities
- Key qualities shown
- Leadership aspects
- Emotional intelligence

4. Areas for Improvement
- Structure improvements
- Character development
- Emotional depth

5. Improved Version
Write an enhanced version that better demonstrates Officer Like Qualities.`
        }
      ],
      temperature: 0.7
    });

    const response = formatResponse(completion.choices[0].message.content);
    res.json(response);
  } catch (error) {
    console.error('Error analyzing story:', error);
    res.status(500).json({ 
      error: true, 
      message: error.message 
    });
  }
});

// WAT Word Bank
const watWords = {
  leadership: [
    "Leadership", "Command", "Initiative", "Decision", "Authority",
    "Direction", "Guidance", "Influence", "Control", "Management"
  ],
  military: [
    "Duty", "Honor", "Service", "Mission", "Discipline",
    "Strategy", "Combat", "Uniform", "Regiment", "Squadron"
  ],
  personality: [
    "Courage", "Integrity", "Loyalty", "Resilience", "Determination",
    "Confidence", "Adaptability", "Intelligence", "Stamina", "Character"
  ],
  social: [
    "Team", "Cooperation", "Communication", "Support", "Unity",
    "Relationship", "Community", "Society", "Family", "Friendship"
  ],
  action: [
    "Action", "Response", "Achievement", "Performance", "Progress",
    "Success", "Victory", "Growth", "Development", "Improvement"
  ],
  values: [
    "Truth", "Justice", "Freedom", "Peace", "Responsibility",
    "Commitment", "Excellence", "Tradition", "Heritage", "Pride"
  ]
};

// WAT Endpoints
app.get('/wat-words', (req, res) => {
  const practiceWords = Object.values(watWords)
    .flatMap(category => {
      const randomIndex = Math.floor(Math.random() * category.length);
      return category[randomIndex];
    });
  
  res.json({ words: practiceWords });
});

app.post('/wat-practice-feedback', async (req, res) => {
  const { word, response } = req.body;

  if (!word || !response) {
    return res.status(400).json({
      error: true,
      message: 'Word and response are required'
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert SSB psychologist specializing in Word Association Tests."
        },
        {
          role: "user",
          content: `Analyze this Word Association Test response:

Word Given: "${word}"
Candidate's Response: "${response}"

Provide feedback in this exact format:
1. Overall Analysis: Brief analysis of the response
2. Strengths: Key positive aspects of the response
3. Areas for Improvement: Specific suggestions for better responses

Consider:
- Relevance to military/leadership context
- Emotional tone (positive/negative)
- Depth of understanding
- Quick thinking ability`
        }
      ],
      temperature: 0.7
    });

    // Parse the response similar to your existing format
    const feedbackText = completion.choices[0].message.content;
    const sections = feedbackText.split('\n\n');
    
    const feedback = {
      overall_feedback: sections[0]?.replace('1. Overall Analysis:', '').trim() || 'No overall feedback available.',
      strengths: sections[1]?.replace('2. Strengths:', '').trim() || 'No specific strengths identified.',
      areas_of_improvement: sections[2]?.replace('3. Areas for Improvement:', '').trim() || 'No improvement suggestions available.'
    };

    res.json(feedback);
  } catch (error) {
    console.error('Error analyzing WAT response:', error);
    res.status(500).json({
      error: true,
      message: 'Error analyzing response',
      details: error.message
    });
  }
});

// WAT Full Test Endpoint
app.post('/wat-full-test', async (req, res) => {
  const { responses } = req.body;

  if (!responses || !Array.isArray(responses)) {
    return res.status(400).json({
      error: true,
      message: 'Invalid responses format'
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert SSB psychological evaluator analyzing Word Association Test responses."
        },
        {
          role: "user",
          content: `Analyze these WAT responses:

${responses.map(r => `Word: ${r.word}\nResponse: ${r.response}`).join('\n\n')}

Provide a comprehensive evaluation that includes:
1. Overall pattern analysis
2. Key personality traits identified
3. Leadership potential indicators
4. Areas for improvement
5. Final recommendation`
        }
      ],
      temperature: 0.7
    });

    res.json({
      success: true,
      analysis: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error analyzing WAT test:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// Add this near your existing endpoints
// SRT Scenario with a predefined description
const srtScenarios = {
  1: "A team member is consistently underperforming in a critical project with a tight deadline."
};

// SRT Practice Feedback Endpoint
app.post('/srt-practice-feedback', async (req, res) => {
  const { scenarioId, response } = req.body;

  if (!scenarioId || !response) {
    return res.status(400).json({ 
      error: true, 
      message: 'Please provide scenario ID and response.' 
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert SSB psychological evaluator analyzing Situation Reaction Test responses. Provide structured, constructive feedback that assesses leadership potential, problem-solving skills, and emotional intelligence."
        },
        {
          role: "user",
          content: `Scenario: ${srtScenarios[scenarioId]}

Candidate's Response: ${response}

Please provide a comprehensive evaluation focusing on:

1. Overall Approach
- Leadership qualities demonstrated
- Problem-solving strategy
- Emotional intelligence

2. Strengths in the Response
- Positive aspects of the proposed solution
- Key leadership traits exhibited

3. Areas of Improvement
- Potential gaps in the approach
- Suggestions for more effective handling

Provide a balanced, constructive feedback that helps the candidate understand their performance and potential areas of growth.`
        }
      ],
      temperature: 0.7
    });

    // Format the response similarly to TAT endpoint
    const feedbackText = completion.choices[0].message.content;
    
    // Basic parsing of the feedback (you might want to improve this)
    const sections = feedbackText.split('\n\n');
    const feedback = {
      overall_feedback: sections[0] || 'No overall feedback available.',
      strengths: sections[1] || 'No specific strengths identified.',
      areas_of_improvement: sections[2] || 'No specific areas of improvement noted.'
    };

    res.json(feedback);
  } catch (error) {
    console.error('Error analyzing SRT response:', error);
    res.status(500).json({ 
      error: true, 
      message: error.message 
    });
  }
});




