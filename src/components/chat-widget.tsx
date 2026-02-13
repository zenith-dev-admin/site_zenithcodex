"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Load messages from localStorage on mount
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

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("zenith_chat_history", JSON.stringify(messages));
        }
    }, [messages, isMounted]);

    useEffect(() => {
        const scrollToBottom = () => {
            if (scrollRef.current) {
                const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
                if (scrollContainer) {
                    scrollContainer.scrollTo({
                        top: scrollContainer.scrollHeight,
                        behavior: isOpen ? "smooth" : "auto", // Suave se estiver aberto, instantâneo se estiver abrindo agora
                    });
                }
            }
        };

        // Pequeno timeout para garantir que o DOM atualizou após a renderização da mensagem
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
        const buttonRegex = /\[BUTTON: (.*?)\| (.*?)\]/g
        const parts = content.split(buttonRegex)

        if (parts.length === 1) return content

        const elements = []
        for (let i = 0; i < parts.length; i++) {
            if (i % 3 === 0) {
                elements.push(parts[i])
            } else if (i % 3 === 1) {
                const label = parts[i]
                const url = parts[i + 1]
                elements.push(
                    <Button
                        key={i}
                        size="sm"
                        className="mt-2 block w-full bg-[#8c52ff] cursor-pointer hover:bg-[#8c52ff]/20 text-white transition-all"
                        onClick={() => window.location.href = url}
                    >
                        {label}
                    </Button>
                )
            }
        }
        return elements
    }

    return (
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end">
            {isOpen && (
                <Card className="w-[350px] h-[500px] mb-4 shadow-xl flex flex-col border border-zinc-800 bg-zinc-950 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <CardHeader className="bg-[#8c52ff] text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-2">
                            <div className="relative h-12 w-12 rounded-full bg-white p-1">
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
                                            "flex flex-col gap-2 rounded-lg px-3 py-2 text-sm max-w-[80%] break-words",
                                            // Classes de Animação:
                                            "animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out",
                                            m.role === "user"
                                                ? "ml-auto bg-[#8c52ff] text-white"
                                                : "mr-auto bg-zinc-800 text-white"
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
                    <CardFooter className="p-3 border-t bg-background">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                placeholder="Digite sua mensagem..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
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
                            className="h-20 w-20 flex items-center gap-2 bg-transparent border border-[#8c52ff] rounded-full"
                        >
                            <div className="cursor-pointer">
                                <Image src="/Zen.svg" alt="Chat" fill className="relative h-18 w-18 rounded-full p-1" />
                            </div>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-w text-primary-foreground border-none">
                        <p>Pergunte ao Zen!</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}
