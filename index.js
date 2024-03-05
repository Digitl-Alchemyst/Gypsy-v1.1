import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Variable to store the API key
let apiKey = '';

// Define openai at a higher scope level
let openai;

// Route to update the API key
app.post('/apikey', (req, res) => {
  const { key } = req.body;
  apiKey = key;
  console.log('API Key Updated:', apiKey);
  console.log('Received request body:', req.body);
  res.send('API Key Updated');
});

// Function to initialize the OpenAI instance
function initializeOpenAI() {
  if (!apiKey) {
    console.log('API Key not set yet.');
    return;
  }

  openai = new OpenAI({
    organization: 'org-KQGtXSQgRwgt8k3iUKzHg5uA',
    apiKey: `Bearer ${apiKey}`,
  });

  // Use the openai instance here...
}

// Example route that uses the OpenAI instance
app.get('/example', (req, res) => {
  if (!apiKey) {
    res.status(400).send('API Key not set yet.');
    return;
  }

  // Initialize the OpenAI instance and use it
  initializeOpenAI();

  // Your logic here...
  res.send('Example route response');
});

app.listen(port, () => {
  console.log(`Gypsy is listening at http://localhost:${port}`);
});

// Route to Send Prompt to OpenAI
app.post('/', async (req, res) => {
    // Log the received message from the front end
    console.log('Received message from front end:', req.body);

    if (!openai) {
        res.status(400).send('OpenAI instance not initialized yet.');
        return;
    }

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: 'Does this test pass?' }],
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 100,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
    });
    console.log(completion.choices[0]);
    res.json({
        data: completion.choices
    });
});

