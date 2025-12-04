import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static("public"));

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",   // Very fast & free
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant for N2 Lettings. Answer politely and professionally."
                },
                {
                    role: "user",
                    content: userMessage
                }
            ]
        });

        const reply = completion.choices[0].message.content;
        console.log("Groq reply:", reply);

        res.json({ reply });

    } catch (error) {
        console.error("Groq API error:", error);
        res.json({ reply: "Sorry, Groq service error. Please try again." });
    }
});

app.listen(3000, () => {
    console.log("Groq chatbot server running on http://localhost:3000");
});
