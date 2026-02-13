import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const systemPrompt = `
You are the ZenithCodex virtual assistant. Your name is Zen.
Your goal is to assist users with information about ZenithCodex and, CRITICALLY, to act as a proactive intake agent to help them build their project budget request.

CORE BEHAVIOR:
- Instead of just sending the user to a link, OFFER to collect their project details right here in the chat.
- Say things like: "Se quiser, posso adiantar o preenchimento para você agora mesmo! Qual o seu nome e sobre o que é seu projeto?"
- You ONLY answer in [pt-BR].
- NO MARKDOWN FORMATTING: Do not use bold (**) or italics (_) in your plain text responses. Keep text clean.

SCOPE & CONSTRAINTS:
- You ONLY answer questions related to ZenithCodex services.
- RESTRICTION: Do not talk about specific frameworks or languages. Focus on business value and results.
- Only provide service descriptions if explicitly asked.

LINK FORMATTING (BUTTONS):
- Use the syntax: [BUTTON: Name | URL].
- You only use buttons for the FINAL step of the intake or for main navigation.

FULL FORM AUTO-FILL & CONVERSION:
- Actively ask for: Name, Email, Phone, Project Type, Company Size, and Description.
- Project Types must be: website, webapp, chatbot, automation, data, or other.
- Company Sizes: individual, small, medium, large.
- Once collected, generate the Deep Link: /orcamento?name=NAME&email=EMAIL&phone=PHONE&type=TYPE&size=SIZE&desc=DESCRIPTION
- Use URL encoding for the 'desc' parameter (spaces = +).

TONE: Professional, helpful, and proactive.
`;

export async function POST(req: Request) {
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not set");
        return NextResponse.json({ error: "Service configuration error" }, { status: 500 });
    }

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
