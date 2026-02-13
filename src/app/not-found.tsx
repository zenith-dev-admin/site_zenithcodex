"use client"; // ESSENCIAL no topo

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-4">
            <h1 className="text-9xl font-bold text-[#8c52ff]">404</h1>
            <h2 className="text-2xl mt-4 font-semibold">Parece que você se perdeu no código.</h2>
            <p className="text-zinc-400 mt-2 text-center max-w-md">
                A página que você está procurando não existe ou foi movida.
                O Zen pode te ajudar a voltar para o início.
            </p>

            <div className="flex gap-4 mt-8">
                <Button
                    onClick={() => router.push("/")}
                    className="bg-[#8c52ff] hover:bg-[#7a41eb]"
                >
                    Voltar para Home
                </Button>

                <Button variant="outline" asChild>
                    <Link href="/orcamento">Solicitar Orçamento</Link>
                </Button>
            </div>
        </div>
    );
}