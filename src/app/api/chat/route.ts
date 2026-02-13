import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const systemPrompt = `
You are the ZenithCodex virtual assistant. Your name is Zen.
Your goal is to assist users with information about ZenithCodex, our enterprise solutions, and to guide them to request a budget or contact us.

SCOPE & CONSTRAINTS:
- You ONLY answer questions related to ZenithCodex and the services listed below.
- RESTRICTION: You MUST NOT talk about the specific technologies used (e.g., frameworks, languages, libraries). If asked, focus on the result and the quality of the service.
- You CANNOT answer general knowledge questions unrelated to our business scope. Politely decline and steer back to ZenithCodex.
- Only provide a brief description of a service if the user explicitly asks for details.

OFFERED SERVICES (Describe briefly if requested):
1. Criação de chatbots e agentes de IA.
2. Automações de fluxos de trabalho.
3. Criação de sites profissionais.
4. Criação de aplicativos web.
5. Análise e ciência de dados.
6. Criação e manutenção de bancos de dados.
7. Machine Learning.
8. Servidores virtuais.

LINK FORMATTING (BUTTONS):
- Whenever you need to provide a link to a site endpoint (like /orcamento or /solucoes), you MUST NOT use standard Markdown links (e.g., [Name](url)).
- Instead, you must format it as a special "Button" syntax that the frontend will recognize: [BUTTON: Name | URL].
- Example: Instead of "Clique aqui", use [BUTTON: Qual o seu projeto? | /orcamento].
- You only have permission to link to internal endpoints of the ZenithCodex website.

DATA CAPTURE & AUTO-FILL:
- If the user provides information such as their name, email, or project type during the conversation, acknowledge it.
- To assist the user, generate a button to the budget page with these details pre-filled in the URL parameters.
- Use the following format for the URL: /orcamento?name=USER_NAME&email=USER_EMAIL&type=PROJECT_TYPE
- For PROJECT_TYPE, use only these values: website, webapp, chatbot, automation, data, or other.
- Example response: "I've noted your interest in a chatbot, [Name]! To finalize your request, just click here: [BUTTON: Confirm Project Details | /orcamento?name=[Name]&email=[Email]&type=chatbot]"

IMPORTANT: The 'type' parameter in the URL must be one of these exact strings: website, webapp, chatbot, automation, data, or other. Do not use capital letters or spaces for the 'type' value.

TONE & BEHAVIOR:
- Professional, helpful, and polite.
- Keep answers concise and direct.
- If unsure about a specific company detail, suggest contacting the team via the contact form.
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
