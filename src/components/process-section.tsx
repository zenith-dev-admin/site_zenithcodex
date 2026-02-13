import { Play, Code2, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProcessSection() {
    return (
        <section className="py-24 px-4 md:px-6 bg-zinc-950 border-t border-zinc-900">
            <div className="container mx-auto max-w-[1200px]">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#8c52ff]/10 border border-[#8c52ff]/20 text-[#8c52ff] text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Como Trabalhamos
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                        Da Ideia à <span className="text-[#8c52ff]">Excelência Digital</span>
                    </h2>
                    <p className="text-zinc-400 max-w-[600px] mx-auto text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Um processo ágil, transparente e focado em resultados tangíveis para o seu negócio.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Linha de conexão (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#8c52ff]/30 to-transparent -z-10" />

                    {/* Passo 1 */}
                    <div className="group relative flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                        <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center group-hover:border-[#8c52ff] group-hover:shadow-[0_0_30px_rgba(140,82,255,0.2)] transition-all duration-500">
                            <Play className="h-10 w-10 text-zinc-400 group-hover:text-[#8c52ff] transition-colors duration-300" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#8c52ff] text-white flex items-center justify-center font-bold text-sm border-4 border-zinc-950">1</div>
                        </div>
                        <h3 className="text-xl font-bold text-white">Briefing Estratégico</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-[300px]">
                            Mergulhamos no seu negócio para entender dores e objetivos, desenhando a arquitetura ideal.
                        </p>
                    </div>

                    {/* Passo 2 */}
                    <div className="group relative flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                        <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center group-hover:border-[#8c52ff] group-hover:shadow-[0_0_30px_rgba(140,82,255,0.2)] transition-all duration-500">
                            <Code2 className="h-10 w-10 text-zinc-400 group-hover:text-[#8c52ff] transition-colors duration-300" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#8c52ff] text-white flex items-center justify-center font-bold text-sm border-4 border-zinc-950">2</div>
                        </div>
                        <h3 className="text-xl font-bold text-white">Desenvolvimento Ágil</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-[300px]">
                            Sprints semanais com entregas contínuas, garantindo que o produto evolua na direção certa.
                        </p>
                    </div>

                    {/* Passo 3 */}
                    <div className="group relative flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
                        <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center group-hover:border-[#8c52ff] group-hover:shadow-[0_0_30px_rgba(140,82,255,0.2)] transition-all duration-500">
                            <Rocket className="h-10 w-10 text-zinc-400 group-hover:text-[#8c52ff] transition-colors duration-300" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#8c52ff] text-white flex items-center justify-center font-bold text-sm border-4 border-zinc-950">3</div>
                        </div>
                        <h3 className="text-xl font-bold text-white">Entrega & Evolução</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-[300px]">
                            Deploy em infraestrutura segura e suporte contínuo para escalar sua operação.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
