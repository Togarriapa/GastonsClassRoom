const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'AgeCollection.html'));
});


app.post('/ClassRoom', async (req, res) => {
    try {

        const age = req.query.age;
        const message = req.body.message;
        const apiKey = process.env.OPENAI_API_KEY;


        console.log(`Im here with the values: age: ${age}  -- message: ${message}   -- ${apiKey}`)


        const response = await axios.post(
            'https://api.openai.com/v1/engines/text-davinci-002/completions',
            {
                prompt: `Answer according to the following criteria:
                Give the answer like you were explaining it to a ${age} year old kid,
                Keep the explanations short and simple,
                Keep the content age appropriate,
                Answer the questions writing the like Gaston from Disney (Use its personality and trades),
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
        //res.json({ response: chatResponse });
        res.json({ message: chatResponse });

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
