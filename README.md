<h1>
<ul><b>
**GPT-client**
</b></ul>
</h1>

<h2>
About
</h2>
<p>
This is my first JavaScript project. Originally made with CRA & JavaScript, Converted to Vite + React + TS just before my 1 year mark. ChatGPT clone using OPEN AI API to recreate the Chat GPT site experience with enhanced features. 
Project is abandoned for a new version using Next.JS
</p>
<h2>
<ul><b>Development Enviroment</b></ul>
</h2>

<h4>
    Frontend<br>
        => Vite<br>
        => React.js<br>
        => Typescript<br>
    Plugins<br>
        => OpenAI<br>
        => Express<br>
        => Cors<br>
        => Body-Parser<br>
        => Morgan<br>
</h4>

<h3>
<ul><b>How to use</b></ul>
</h3>

## **Project Dependencies**

    Node.js 20.8.0
    npm/npx 10.1.0
    Vite 5.1.5
    Typescript 5.3.3

## Install Node Modules

    npm install

## Run Application

    npm run dev

## OpenAI API Key

You will need an API key from OpenAI to use the GypsyGPT chat bot. You can enter your API Key in the menu in the appilication. This key is stored in State and is overwritten when a new key is entered. It is not recommened to host this application publically and then enter your API key. This will allow anyone who accesses the app use of your API key that is stored in state. If you want to host this on the public internet it is recommened that enter dummy text after use to clear the API key from state or to shut down the application. Or to modify the code to read the API in a way that is secure for the public web, such as using a.env file.

## Chat Message History

The chat history is stored in a local state storage variable. If you want to clear the history you can do so by clicking the new chat button in the menu. This will both start a new chat and erase the history of the previous chat. Chat messages are not stored in any other way, thus there is no message history aside from the records of your API request with OpenAI