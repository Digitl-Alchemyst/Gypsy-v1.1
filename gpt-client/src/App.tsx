import './Normalize.css';
import './App.css';
import React, { useState, useEffect } from 'react';

interface ChatMessage {
  user: string;
  message: string;
}

interface Model {
  id: string;
}

function App() {
  const [input, setInput] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [currentModel, setCurrentModel] = useState('gpt-3.5-turbo');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      user: 'gpt',
      message:
        'Hello, I am Gypsy, your personal chatbot. I am currently learning about the topic of your choice. To start a conversation, type a message below.',
    },
  ]);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    getModels();
  }, []);

  // clear chat log
  function clearChat() {
    setChatLog([]);
  }

  async function getModels() {
    const response = await fetch('http://localhost:3080/models');
    const data = await response.json();
    getModels();
  }

  // Submit Prompt to OpenAI
  async function handleSubmitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const chatLogNew = [...chatLog, { user: 'me', message: input }];

    setChatLog(chatLogNew);
    setInput('');

    const messages = chatLogNew.map((m) => m.message).join('\n ');

    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: messages,
        currentModel,
      }),
    });

    const data = await response.json();
    setChatLog([...chatLogNew, { user: 'gpt', message: data.messageReply }]);
    console.log('🚀 ~ OpenAI Response Data:', data.messageReply);
  }

  // Set API Key for OpenAI in the server
  async function submitAPIKey(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const post = await fetch('http://localhost:3000/apikey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey,
      }),
    });
    setApiKey('');
    alert('API Key Saved in State');
  }
  console.log('🚀 ~ Sending API Key to Backend:', apiKey);

  return (
    <div className="App">
      {/* Side Menu  */}
      <aside className="sidemenu">
        <div>
          {/* Model Selection  */}
          <div className="models">
            <p>Select a Model</p>
            <select
              value={currentModel}
              onChange={(e) => setCurrentModel(e.target.value)}
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              ))}
            </select>
          </div>

          {/* New Chat Button  */}
          <div className="side-menu-button" onClick={clearChat}>
            <span>+</span>
            New Chat
          </div>
        </div>

        {/* API Key Entry  */}
        <div className="api-key">
          <form onSubmit={submitAPIKey}>
            <input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="text"
              placeholder="Enter your OpenAI API key here..."
            />
            <button type="submit">Submit</button>
          </form>
          <p>
            <a href="https://beta.openai.com/account/api-keys">
              Create an OpenAI API key
            </a>
          </p>
        </div>
      </aside>

      {/* Chat Box */}
      <section className="chatbox">
        {/* Chat Log */}
        {/* Conditionally render if chat log is empty */}
        {chatLog.length === 0 && (
          <div className="empty-state">
            <p>Start a conversation by typing a message</p>
          </div>
        )}

        {/* Show chat log if not empty */}
        {chatLog.length > 0 && (
          <div className="chat-log">
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        )}

        {/* Chat Input */}
        <div className="chat-input-holder">
          <form onSubmit={handleSubmitMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
              placeholder="To start a conversation with Gypsy, type a message here..."
            />
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }: { message: ChatMessage }) => {
  let avatar = null;
  let messageClass = '';

  if (message.user === 'me') {
    avatar = <img src="/Alch.jpg" alt="me" />;
    messageClass = 'me';
  } else if (message.user === 'gpt') {
    avatar = <img src="/GPT.png" alt="chatgpt" />;
    messageClass = 'chatgpt';
  }

  return (
    <div className={`chat-message ${messageClass}`}>
      <div className="chat-message-center">
        <div className={`avatar ${messageClass}`}>{avatar}</div>

        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default App;
