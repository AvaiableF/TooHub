// server.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
    const { text, source, target } = req.body;
    const url = 'https://libretranslate.de/translate';
    const data = {
        q: text,
        source: source,
        target: target,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        res.json(json);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch' });
    }
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
