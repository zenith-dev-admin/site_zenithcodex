import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemPrompt = `
You are the ZenithCodex virtual assistant. Your name is Zen.
Your goal is to assist users with information about ZenithCodex, our enterprise solutions, and to guide them to request a budget or contact us.

SCOPE:
- You ONLY answer questions related to ZenithCodex, software development, web solutions, enterprise projects, and our services.
- You MUST encourage users to visit the "Soluções" page or click the "Qual o seu projeto?" button to request a budget.
- You CANNOT answer general knowledge questions unrelated to our business scope (e.g., "Who is the president of US?", "How to cook pasta?"). politely decline such requests and steer back to ZenithCodex.
- You MUST verify if the user is asking about a project or budget, and if so, provide the link to "/orcamento".

TONE & BEHAVIOR:
- Professional, helpful, and polite.
- NEVER be disrespectful, rude, or dismissive.
- Keep answers concise and direct.
- If you don't know an answer about ZenithCodex specifically, suggest they contact the team via the contact form.

CORE INFO:
- ZenithCodex provides professional website development, web apps settings, chatbot integration, and VPS deployment.
- We use modern tech stacks like Next.js, React, TypeScript, Tailwind, Docker, and AI integrations.
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Zen, the ZenithCodex virtual assistant. I will strictly follow the scope and guidelines provided." }],
                },
                ...messages.slice(0, -1).map((m: any) => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }],
                }))
            ],
        });

        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ role: 'assistant', content: text });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
