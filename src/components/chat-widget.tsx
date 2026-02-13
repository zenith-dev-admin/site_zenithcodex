"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // --- NOVOS ESTADOS PARA A TAG FLUTUANTE ---
    const [showTag, setShowTag] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedMessages = localStorage.getItem("zenith_chat_history");
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (e) {
                console.error("Failed to parse chat history");
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("zenith_chat_history", JSON.stringify(messages));
        }
    }, [messages, isMounted]);

    // --- LÓGICA DE SCROLL PARA MOSTRAR A TAG ---
    useEffect(() => {
        const handleScroll = () => {
            // Se rolar mais de 300px, mostra a tag
            if (window.scrollY > 300) {
                setShowTag(true);
            } else {
                setShowTag(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const scrollToBottom = () => {
            if (scrollRef.current) {
                const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
                if (scrollContainer) {
                    scrollContainer.scrollTo({
                        top: scrollContainer.scrollHeight,
                        behavior: isOpen ? "smooth" : "auto",
                    });
                }
            }
        };
        const timeoutId = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timeoutId);
    }, [messages, isOpen, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const data = await response.json();
            setMessages((prev) => [...prev, data]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente mais tarde." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessageContent = (content: string) => {
        const buttonRegex = /\[BUTTON: (.*?)\| (.*?)\]/g;
        const parts = content.split(buttonRegex);

        if (parts.length === 1) {
            return (
                <div className="prose prose-invert max-w-none text-sm leading-relaxed text-zinc-100 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            );
        }

        const elements = [];
        for (let i = 0; i < parts.length; i++) {
            if (i % 3 === 0) {
                if (parts[i].trim()) {
                    elements.push(
                        <div key={`text-${i}`} className="prose prose-invert max-w-none text-sm leading-relaxed text-zinc-100 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
                            <ReactMarkdown>{parts[i]}</ReactMarkdown>
                        </div>
                    );
                }
            } else if (i % 3 === 1) {
                const label = parts[i];
                const url = parts[i + 1];
                elements.push(
                    <Button
                        key={`btn-${i}`}
                        size="sm"
                        className="mt-3 block w-full bg-[#8c52ff] hover:bg-[#7a41eb] text-white transition-all font-bold shadow-lg"
                        onClick={() => (window.location.href = url)}
                    >
                        {label}
                    </Button>
                );
            }
        }
        return <div className="flex flex-col gap-1">{elements}</div>;
    };

    // --- RENDERIZAÇÃO PRINCIPAL COM DETECÇÃO DE HOVER ---
    return (
        <div
            className="fixed bottom-10 right-10 z-50 flex flex-col items-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* --- TAG FLUTUANTE (BALÃO DE FALA) --- */}
            <div
                className={cn(
                    "absolute right-24 bottom-6 w-max max-w-[200px] bg-zinc-900/90 backdrop-blur-md border border-[#8c52ff]/50 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-2xl transition-all duration-500 ease-in-out transform origin-bottom-right pointer-events-none select-none",
                    // Regras de Visibilidade:
                    // Mostra se: Scroll > 300px (showTag) E Mouse fora (isHovered=false) E Chat fechado (!isOpen)
                    showTag && !isHovered && !isOpen
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-90"
                )}
            >
                <p className="text-sm font-medium leading-tight">
                    Olá! Quer ajuda com seu projeto?
                </p>
                {/* Triângulo (Seta) do balão apontando para o Zen */}
                <div className="absolute -right-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-l-[10px] border-l-[#8c52ff]/50 border-b-[8px] border-b-transparent"></div>
            </div>

            {isOpen && (
                <Card className="w-[350px] h-[80vh] mb-4 shadow-2xl flex flex-col border border-zinc-800 bg-zinc-950 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <CardHeader className="bg-[#8c52ff] text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-2">
                            <div className="relative h-12 w-12 rounded-full bg-white p-1 overflow-hidden">
                                <Image src="/Zen.svg" alt="Zen Avatar" fill className="rounded-full object-cover" />
                            </div>
                            <div>
                                <CardTitle className="text-base">Zen</CardTitle>
                                <p className="text-xs text-primary-foreground/80">Assistente ZenithCodex</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 h-8 w-8" onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden bg-zinc-950">
                        <ScrollArea className="h-full p-4" ref={scrollRef}>
                            {messages.length === 0 && (
                                <div className="text-center text-muted-foreground mt-8 text-sm px-6">
                                    <p>Olá! Sou o Zen.</p>
                                    <p className="mt-2">Posso ajudar com dúvidas sobre nossos serviços ou encaminhar seu projeto.</p>
                                    <p className="text-[10px] mt-1 font-light text-gray-400">Ao utilizar o Zen, você concorda com nossa <a href="/privacy" className="text-[#8c52ff] underline hover:text-[#8c52ff]/80 transition-all">política de privacidade</a>.</p>
                                </div>
                            )}
                            <div className="flex flex-col gap-4">
                                {messages.map((m, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex flex-col gap-2 rounded-lg px-3 py-2 text-sm max-w-[80%] break-words shadow-sm",
                                            "animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out",
                                            m.role === "user"
                                                ? "ml-auto bg-[#8c52ff] text-white"
                                                : "mr-auto bg-zinc-800 text-white border border-zinc-700"
                                        )}
                                    >
                                        {renderMessageContent(m.content)}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex mr-auto max-w-[80%] items-center gap-2 rounded-lg px-3 py-2 bg-zinc-800 text-white animate-pulse">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-3 border-t border-zinc-800 bg-zinc-900/50">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                placeholder="Digite sua mensagem..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                className="flex-1 bg-zinc-950 border-zinc-700 focus:border-[#8c52ff]"
                            />
                            <Button type="submit" size="icon" disabled={isLoading} className="bg-[#8c52ff] hover:bg-[#7a41eb]">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}

            {!isOpen && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => setIsOpen(true)}
                            size="icon"
                            // Aumentei o tamanho do botão e adicionei sombra/glow roxo para destacar
                            className="h-20 w-20 flex items-center justify-center gap-2 bg-transparent border border-[#8c52ff]/30 hover:border-[#8c52ff] rounded-full shadow-[0_0_15px_rgba(140,82,255,0.2)] hover:shadow-[0_0_25px_rgba(140,82,255,0.4)] transition-all duration-300 group overflow-hidden"
                        >
                            <div className="cursor-pointer relative w-full h-full">
                                <Image
                                    src="/zen.gif"
                                    alt="Chat"
                                    fill
                                    // Adicionei efeito de escala ao passar o mouse
                                    className="object-cover rounded-full p-0.5 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-[#8c52ff] text-white border-none">
                        <p>Falar com o Zen</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}