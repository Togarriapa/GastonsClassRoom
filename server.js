const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());


// powrangers2023 powrangers


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'AgeCollection.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.post('/api-chat', async (req, res) => {
    try {
        const age = req.body.userAge;
        const message = req.body.message;
        const apiKey = process.env.OPENAI_API_KEY;


        console.log(`Im here with the values: age: ${age}  -- message: ${message}   -- ${apiKey}`)


        const response = await axios.post(
            'https://api.openai.com/v1/engines/text-davinci-002/completions',
            {
                prompt: `Answer the next question like Gaston, the Disney villan would and acording to these criteria:
                The answer must be given in a way that a ${age} year old person would understand,
                The answer must be age apropriate for people with ${age} years old,
                The answer must contain Disney references and be writen like Gaston would (Use it's Personality, Mannerisms, Quirks and Trades),
                The answer must be accurate but given in a funny way,
                Always include Gaston or Disney trivia in the answer,
                Be entertaining,
                Question: ${message}`,
                max_tokens: 2048,
                n: 1,
                stop: null,
                temperature: 0.8,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );
        const chatResponse = response.data.choices[0].text.trim();

        console.log("I've got this response:" + chatResponse)
        res.json({ response: "Gaston: " + chatResponse });
        //res.json({ message: chatResponse });

    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 429) {
            res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
        } else {
            res.status(500).json({ error: 'Unable to get a response from the ChatGPT API.' });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
