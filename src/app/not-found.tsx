import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-4 text-center">
            <div className="relative mb-8">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#8c52ff]/20 rounded-full blur-[80px]" />
                <h1 className="relative text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-950 select-none">
                    404
                </h1>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#8c52ff] animate-pulse">
                    ZENITH<span className="text-white">CODEX</span>
                </div>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Página Não Encontrada
            </h2>
            <p className="text-zinc-400 max-w-md mb-8">
                Parece que você navegou para um território desconhecido.
                O sistema não conseguiu localizar o endpoint solicitado.
            </p>

            <div className="flex gap-4">
                <Button asChild variant="default" className="bg-[#8c52ff] hover:bg-[#7a41eb]">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Voltar ao Início
                    </Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-800 hover:bg-zinc-900 text-zinc-300">
                    <Link href="#" onClick={() => window.history.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Link>
                </Button>
            </div>
        </div>
    );
}
