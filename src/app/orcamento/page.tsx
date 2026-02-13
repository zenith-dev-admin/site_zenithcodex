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
import { Suspense, useState, useEffect } from "react";
import { Loader2, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Schema atualizado com Telefone e Tamanho da Empresa
const formSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().min(8, "Telefone inválido"),
    projectType: z.string().min(1, "Selecione uma categoria"),
    companySize: z.string().optional(),
    description: z.string().min(10, "Conte-nos um pouco mais"),
    budget: z.string().optional(),
});

export default function OrcamentoPage() {
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const nameFromUrl = searchParams.get("name") || "";
    const emailFromUrl = searchParams.get("email") || "";
    const typeFromUrl = searchParams.get("type") || "";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: nameFromUrl, // Preenche automaticamente
            email: emailFromUrl, // Preenche automaticamente
            phone: "",
            projectType: typeFromUrl, // Preenche automaticamente
            companySize: "",
            description: "",
            budget: "",
        },
    });

    useEffect(() => {
        if (isMounted) {
            form.reset({
                name: searchParams.get("name") || "",
                email: searchParams.get("email") || "",
                projectType: searchParams.get("type") || "",
                phone: "",
                companySize: "",
                description: "",
                budget: "",
            });
        }
    }, [searchParams, isMounted, form]);

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
                <p className="text-zinc-400 max-w-md">
                    Nossos arquitetos de soluções já foram notificados. Em breve, entraremos em contato para agendar nossa primeira reunião técnica.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="link" className="text-[#8c52ff]">Enviar outra solicitação</Button>
            </div>
        );
    }

    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Carregando formulário...</div>}>
            <div className="container mx-auto py-16 px-4">
                <Card className="max-w-[700px] mx-auto bg-zinc-900 border-zinc-800 shadow-2xl">
                    <CardHeader className="text-center pb-8 border-b border-zinc-800">
                        <CardTitle className="text-3xl font-bold text-white">Vamos iniciar seu projeto?</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Preencha os dados básicos abaixo. Detalhes técnicos e escopo serão definidos em nossa reunião de briefing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* Seção 1: Contato */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">Nome</FormLabel>
                                            <FormControl><Input className="bg-zinc-950 border-zinc-800 focus:border-[#8c52ff]" placeholder="Ex: João Silva" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">E-mail Corporativo</FormLabel>
                                            <FormControl><Input className="bg-zinc-950 border-zinc-800 focus:border-[#8c52ff]" placeholder="joao@empresa.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">WhatsApp / Telefone</FormLabel>
                                            <FormControl><Input className="bg-zinc-950 border-zinc-800 focus:border-[#8c52ff]" placeholder="(11) 99999-9999" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="companySize" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">Tamanho da Empresa</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger className="bg-zinc-950 border-zinc-800"><SelectValue placeholder="Selecione..." /></SelectTrigger></FormControl>
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

                                {/* Seção 2: Projeto */}
                                <div className="space-y-6">
                                    <FormField control={form.control} name="projectType" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">O que você busca?</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger className="bg-zinc-950 border-zinc-800"><SelectValue placeholder="Selecione o tipo de solução" /></SelectTrigger></FormControl>
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
                                            <FormLabel className="text-zinc-300">Breve resumo do desafio</FormLabel>
                                            <FormControl>
                                                <Textarea className="bg-zinc-950 border-zinc-800 min-h-[120px]" placeholder="Conte-nos o objetivo principal deste projeto..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <Button type="submit" className="w-full h-12 bg-[#8c52ff] hover:bg-[#7a41eb] text-white font-bold" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <><Send className="mr-2 h-4 w-4" /> Solicitar Consultoria</>}
                                </Button>

                                <p className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
                                    <ShieldCheck className="h-3 w-3" /> Seus dados estão protegidos sob a LGPD
                                </p>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </Suspense>
    );
}