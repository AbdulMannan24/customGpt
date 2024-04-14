const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

require('dotenv').config()
app.use(express.json());
app.use(cors());

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function gemini(prompt) {

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}

app.get('/translate/:input?', async (req, res) => {
    let prompt = req.params.input;
    let response = await gemini(prompt);
    res.json({
        message: response
    })
})

app.listen(PORT, ()=>{
    console.log("server started: " + PORT);
})