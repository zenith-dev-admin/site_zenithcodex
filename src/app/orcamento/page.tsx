"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um e-mail válido.",
    }),
    projectType: z.string().min(1, {
        message: "Por favor, selecione um tipo de projeto.",
    }),
    description: z.string().min(10, {
        message: "A descrição deve ter pelo menos 10 caracteres.",
    }),
    budget: z.string().optional(),
});

export default function OrcamentoPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            description: "",
            budget: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/orcamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setIsSuccess(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            // In a real app, show error toast
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="container mx-auto py-20 px-4 md:px-6 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h1 className="text-3xl font-bold">Solicitação Enviada!</h1>
                <p className="text-muted-foreground max-w-[500px]">
                    Recebemos os detalhes do seu projeto. Nossa equipe analisará e entrará em contato em breve pelo e-mail fornecido.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">Enviar nova solicitação</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <Card className="max-w-[600px] mx-auto">
                <CardHeader>
                    <CardTitle>Solicite um Orçamento</CardTitle>
                    <CardDescription>
                        Conte-nos sobre o seu projeto e nós ajudaremos a torná-lo realidade.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="seu@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="projectType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Projeto</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo de projeto" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="website">Website Institucional</SelectItem>
                                                <SelectItem value="webapp">Aplicação Web / SaaS</SelectItem>
                                                <SelectItem value="chatbot">Chatbot / IA</SelectItem>
                                                <SelectItem value="vps">Configuração de VPS / Infra</SelectItem>
                                                <SelectItem value="other">Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição do Projeto</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Descreva brevemente o que você precisa..."
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Orçamento Estimado (Opcional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: R$ 5.000 - R$ 10.000" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Isso nos ajuda a propor a solução mais adequada.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    "Enviar Solicitação"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
