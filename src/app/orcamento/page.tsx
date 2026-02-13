// src/app/orcamento/page.tsx
import { Suspense } from "react";
import OrcamentoContent from "@/components/orcamento-content"; // Ajuste o caminho se necessário
import { Loader2 } from "lucide-react";

export default function OrcamentoPage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center min-h-screen text-white">
                        <Loader2 className="h-8 w-8 animate-spin text-[#8c52ff] mb-4" />
                        <p className="text-zinc-400 animate-pulse">Carregando formulário seguro...</p>
                    </div>
                }
            >
                <OrcamentoContent />
            </Suspense>
        </main>
    );
}