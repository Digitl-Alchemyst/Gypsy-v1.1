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
  const [currentModel, setCurrentModel] = useState('ada');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const chatLogNew = [...chatLog, { user: 'me', message: input }];

    setInput('');
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((m) => m.message).join('\n ');

    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      }),
    });

    const data = await response.json();
    console.log("🚀 ~ data:", data)
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
console.log('Sending API Key:', apiKey);


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
            <button>Submit</button>
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
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
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

export default App;

const ChatMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === 'gpt' && 'chatgpt'}`}>
          {message.user === 'gpt' && (
            <img src="/GPT.png" alt="gypsy" />
          )}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export { App };
