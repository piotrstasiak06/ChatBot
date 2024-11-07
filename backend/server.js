import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY 
});

const app = express();
const port = process.env.PORT || 5174;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Placeholder route for testing
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are assistant to learning english and spanish, and only that two languages.Do not accept any other proposals of usage different languages. If user writes something in different language than spanish or english, respond that you can only speak in english or spanish" },
                {
                    role: "user",
                    content: userMessage,
                },
            ],
        });

        const reply = completion.choices[0].message.content;

        res.json({ reply });
    } catch (error) {
        console.error("Error fetching response:", error);
        res.status(500).json({ error: "Failed to get data" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});