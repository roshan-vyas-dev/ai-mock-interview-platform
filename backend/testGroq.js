require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
    const completion = await groq.chat.completions.create({
        messages: [{ 
            role: "user", 
            content: `You are an interview evaluator.
Question: What is useState in React?
Student Answer: useState is a hook that manages state in functional components.
Give ONLY this format:
Score: X/10
Feedback: your feedback here` 
        }],
        model: "llama-3.3-70b-versatile",
    });
    console.log(completion.choices[0].message.content);
}

test();