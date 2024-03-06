import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add Body Parser and CORS
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Variable to store the API key
let apiKey = '';

// Define openai at a higher scope level
let openai;
// Listen for API Calls
app.listen(port, () => {
  console.log(`Gypsy is listening at http://localhost:${port}`);
});

// Route to update the API key
app.post('/apikey', (req, res) => {
  console.log('Received request body:', req.body);
  const apiKey = req.body.apiKey;
  console.log('API Key Updated:', apiKey);
  res.send('API Key Updated');
  // Initialize the OpenAI instance and use it
  initializeOpenAI();
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
  console.log('OpenAI Initialized');
}

// Route to Send Prompt to OpenAI
app.post('/completion', async (req, res) => {
    // Log the received message from the front end
    console.log('Received Message from Frontend:', req.body);

    if (!openai) {
        res.status(400).send('OpenAI instance not initialized yet.');
        return;
    }

    const { messsages, currentModel } = req.body;

    const completion = await openai.chat.completions.create({
        messages: messsages,
        model: currentModel,
        temperature: 0.7,
        maxTokens: 25,
    });
    console.log(completion.choices[0]);

    res.json({
        messageReply: completion.choices[0].text
    });
});

// Route to Fetch Models from OpenAI
app.get('/models', async (req, res) => {
  if (!openai) {
        res.status(400).send('OpenAI instance not initialized yet.');
        return;
    }

    const models = await openai.models.list();

    console.log(models);
    res.json(models);
    console.log('Models Fetched');
});


