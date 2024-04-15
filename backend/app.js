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
    if (prompt == null || prompt === undefined) return "invalid Prompt";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

app.get('/translate/:input?', async (req, res) => {
    let prompt = "";
    if (req.params.input) prompt = req.params.input;
    let response = await gemini(prompt);
    res.json({
        message: response
    })
})

app.listen(PORT, ()=>{
    console.log("server started: " + PORT);
})