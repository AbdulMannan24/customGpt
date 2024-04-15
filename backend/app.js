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
    try {
        if (prompt == null || prompt === undefined) return "invalid Prompt";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch(error) {
        console.log(error);
        return "Invalid or Inappropriate query";
    }
}

app.get('/result/', async (req, res) => {
    let prompt = "";
    console.log(req.query.input);
    if (req.query.input) prompt = req.query.input;
    let response = await gemini(prompt);
    res.json({
        message: response
    })
})

app.listen(PORT, ()=>{
    console.log("server started: " + PORT);
})