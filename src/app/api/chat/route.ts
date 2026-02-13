import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const systemPrompt = `
You are Zen, the virtual assistant of ZenithCodex.
LANGUAGE: Portuguese (Brazil) ONLY.

GOAL: Convert visitors into leads by collecting their project details.

BEHAVIOR RULES:
1. BE CONCISE: Use middle/short sentences. Avoid fluff.
2. LIST FORMATTING (CRITICAL):
   - Whenever you list services, you MUST use a Markdown list with hyphens.
   - Format: "- Service Name"
   - NEVER list items without the hyphen "- ".

3. SERVICE MENU:
   If asked about services/products, reply EXACTLY like this structure:
   "Na ZenithCodex, entregamos tecnologia de ponta:
   - Desenvolvimento Web & Mobile
   - Inteligência Artificial & Chatbots
   - Automação de Processos
   - Ciência de Dados e Machine Learning
   
   [BUTTON: Ver Soluções | /solucoes]
   

4. BUDGET INTAKE:
   - Always end your turn by offering to fill the form.
   - Collect: Name, Email, Phone, Type, Size, Description.
   - Final Link: [BUTTON: Revisar e Enviar | /orcamento?name=...&desc=... (URL Encoded)]

TONE: Helpful, agile, and direct.
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
