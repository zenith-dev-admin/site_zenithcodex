"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Send, ShieldCheck, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().min(8, "Telefone inválido"),
    projectType: z.string().min(1, "Selecione uma categoria"),
    companySize: z.string().optional(),
    description: z.string().min(10, "Conte-nos um pouco mais"),
    budget: z.string().optional(),
});

export default function OrcamentoContent() {
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            projectType: "",
            companySize: "",
            description: "",
            budget: "",
        },
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Lógica de Autopreenchimento com Decode de URL
    useEffect(() => {
        if (isMounted) {
            const getValue = (key: string) => searchParams.get(key) || "";

            // Decodifica a descrição tratando espaços (+) e caracteres especiais
            const rawDesc = getValue("desc");
            const decodedDesc = decodeURIComponent(rawDesc.replace(/\+/g, " "));

            form.reset({
                name: getValue("name"),
                email: getValue("email"),
                phone: getValue("phone"),
                projectType: getValue("type"),
                companySize: getValue("size"),
                description: decodedDesc,
                budget: "",
            });
        }
    }, [searchParams, isMounted, form]);

    // Função para destacar campos preenchidos pela IA
    const isAiFilled = (paramName: string) => isMounted && !!searchParams.get(paramName);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/orcamento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!response.ok) throw new Error("Erro no servidor");
            setIsSuccess(true);
        } catch (error: any) {
            alert(`Erro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="container mx-auto py-20 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h1 className="text-4xl font-bold text-white">Solicitação Recebida!</h1>
                <p className="text-zinc-400 max-w-md">Nossos arquitetos de soluções já foram notificados. Em breve, entraremos em contato.</p>
                <Button onClick={() => setIsSuccess(false)} variant="link" className="text-[#8c52ff]">Enviar outra solicitação</Button>
            </div>
        );
    }

    const aiFieldClass = "border-purple-500/40 shadow-[0_0_15px_rgba(140,82,255,0.1)] ring-1 ring-purple-500/20";

    return (
        <div className="container mx-auto py-16 px-4">
            <Card className="max-w-[700px] mx-auto bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="text-center pb-8 border-b border-zinc-800">
                    <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                        {isAiFilled("desc") && <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />}
                        Vamos iniciar seu projeto?
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        {isAiFilled("desc")
                            ? "O Zen já adiantou os detalhes para você. Revise as informações abaixo."
                            : "Preencha os dados básicos abaixo para iniciarmos seu briefing técnico."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-300">Nome</FormLabel>
                                        <FormControl>
                                            <Input className={`bg-zinc-950 border-zinc-800 focus:border-[#8c52ff] ${isAiFilled("name") ? aiFieldClass : ""}`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-300">E-mail Corporativo</FormLabel>
                                        <FormControl>
                                            <Input className={`bg-zinc-950 border-zinc-800 focus:border-[#8c52ff] ${isAiFilled("email") ? aiFieldClass : ""}`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-300">WhatsApp / Telefone</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={`bg-zinc-950 border-zinc-800 focus:border-[#8c52ff] ${isAiFilled("phone") ? aiFieldClass : ""}`}
                                                placeholder="(11) 99999-9999"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="companySize" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-300">Tamanho da Empresa</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className={`bg-zinc-950 border-zinc-800 ${isAiFilled("size") ? aiFieldClass : ""}`}>
                                                    <SelectValue placeholder="Selecione..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                                <SelectItem value="individual">Autônomo / Startup</SelectItem>
                                                <SelectItem value="small">Pequena (1-10)</SelectItem>
                                                <SelectItem value="medium">Média (11-50)</SelectItem>
                                                <SelectItem value="large">Grande (50+)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                            </div>

                            <hr className="border-zinc-800" />

                            <div className="space-y-6">
                                <FormField control={form.control} name="projectType" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-300">O que você busca?</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className={`bg-zinc-950 border-zinc-800 ${isAiFilled("type") ? aiFieldClass : ""}`}>
                                                    <SelectValue placeholder="Selecione o tipo de solução" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                                <SelectItem value="website">Site ou Web App</SelectItem>
                                                <SelectItem value="chatbot">Agente de IA / Chatbot</SelectItem>
                                                <SelectItem value="automation">Automação de Processos</SelectItem>
                                                <SelectItem value="data">Ciência de Dados / ML</SelectItem>
                                                <SelectItem value="other">Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel className="text-zinc-300">Breve resumo do desafio</FormLabel>
                                            {isAiFilled("desc") && (
                                                <span className="text-[10px] text-purple-400 flex items-center gap-1 animate-pulse">
                                                    <Sparkles className="h-3 w-3" /> Transcrito pelo Zen
                                                </span>
                                            )}
                                        </div>
                                        <FormControl>
                                            <Textarea
                                                className={`bg-zinc-950 border-zinc-800 min-h-[120px] transition-all duration-1000 ${isAiFilled("desc") ? aiFieldClass : ""}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <Button type="submit" className="w-full h-12 bg-[#8c52ff] hover:bg-[#7a41eb] text-white font-bold" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <><Send className="mr-2 h-4 w-4" /> Enviar para Análise Técnica</>}
                            </Button>

                            <p className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
                                <ShieldCheck className="h-3 w-3" /> Protegido via LGPD & Criptografia Zenith
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}