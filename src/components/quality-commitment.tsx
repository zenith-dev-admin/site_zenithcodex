import { ShieldCheck, Zap, Headphones } from "lucide-react";

export function QualityCommitment() {
    return (
        <section className="py-20 px-4 md:px-6 bg-zinc-950/50 border-y border-zinc-900">
            <div className="text-center mb-12 space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Qualidade Assegurada</h2>
                <p className="text-muted-foreground max-w-[600px] mx-auto">
                    Nossos serviços cumprem os mais altos critérios de qualidade e segurança.
                </p>
            </div>
            <div className="container mx-auto max-w-[1000px]">
                <div className="grid md:grid-cols-3 gap-8 mb-12">

                    {/* Item 1: Segurança */}
                    <div className="flex flex-col items-center text-center space-y-3 group">
                        <div className="p-3 rounded-2xl bg-[#8c52ff]/10 group-hover:bg-[#8c52ff]/20 transition-colors">
                            <ShieldCheck className="h-8 w-8 text-[#8c52ff]" />
                        </div>
                        <h4 className="font-bold text-white">Segurança Rigorosa</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Proteção de dados e conformidade com a LGPD em cada linha de código.
                        </p>
                    </div>

                    {/* Item 2: Performance */}
                    <div className="flex flex-col items-center text-center space-y-3 group">
                        <div className="p-3 rounded-2xl bg-[#8c52ff]/10 group-hover:bg-[#8c52ff]/20 transition-colors">
                            <Zap className="h-8 w-8 text-[#8c52ff]" />
                        </div>
                        <h4 className="font-bold text-white">Alta Performance</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Sistemas otimizados para velocidade extrema e escalabilidade global.
                        </p>
                    </div>

                    {/* Item 3: Suporte */}
                    <div className="flex flex-col items-center text-center space-y-3 group">
                        <div className="p-3 rounded-2xl bg-[#8c52ff]/10 group-hover:bg-[#8c52ff]/20 transition-colors">
                            <Headphones className="h-8 w-8 text-[#8c52ff]" />
                        </div>
                        <h4 className="font-bold text-white">Suporte VIP</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Acompanhamento contínuo para garantir que sua tecnologia nunca pare.
                        </p>
                    </div>

                </div>

                {/* Disclaimer Refinado */}
                <div className="max-w-[600px] mx-auto pt-8 border-t border-zinc-900/50">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium">
                        Nota de Transparência
                    </p>
                    <p className="text-xs text-zinc-500 mt-2 italic">
                        * Prazos e investimentos são dimensionados sob medida conforme a complexidade técnica.
                        Consulte nossos arquitetos de soluções para um roadmap detalhado.
                    </p>
                </div>
            </div>
        </section>
    );
}