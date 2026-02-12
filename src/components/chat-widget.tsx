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

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

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

    return (
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end">
            {isOpen && (
                <Card className="w-[350px] h-[500px] mb-4 shadow-xl flex flex-col border-primary/20 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <CardHeader className="bg-[#8c52ff] text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 rounded-full bg-white p-1">
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
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4" ref={scrollRef}>
                            {messages.length === 0 && (
                                <div className="text-center text-muted-foreground mt-8 text-sm px-6">
                                    <p>Olá! Sou o Zen.</p>
                                    <p className="mt-2">Posso ajudar com dúvidas sobre nossos serviços ou encaminhar seu projeto.</p>
                                </div>
                            )}
                            <div className="flex flex-col gap-4">
                                {messages.map((m, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                            m.role === "user"
                                                ? "ml-auto bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        {m.content}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                                        <Loader2 className="h-4 w-4 animate-spin" />
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
                            className="h-16 w-16 rounded-full border border-white shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent hover:bg-primary/20"
                        >
                            <div className="cursor-pointer">
                                <Image src="/Zen.svg" alt="Chat" fill className="p-2 object-contain" />
                            </div>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-primary text-primary-foreground border-none">
                        <p>Pergunte ao Zen!</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}
