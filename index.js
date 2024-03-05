import express from 'express';
import cors from 'cors';
import morgan from'morgan';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.post('/', async (req, res) => {
    const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'Does this test pass?' }],
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 100,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });
  // console.log(completion.choices[0]);
  res.json({
    data: completion.choices
  })
});

app.listen(port, () => {
  console.log(`Gypsy is listening at http://localhost:${port}`);
});

const key = process.env.OPENAI_API;
const openai = new OpenAI({
  organization: 'org-KQGtXSQgRwgt8k3iUKzHg5uA',
  apiKey: `Bearer ${key}`,
});

const models = await openai.models.list();
