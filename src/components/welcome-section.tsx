import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-zinc-950 py-24 px-4 md:px-6 lg:py-40">
            {/* Efeito de Luz de Fundo (Glow) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px] pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8c52ff]/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-[#8c52ff]/10 blur-[100px] rounded-full" />
            </div>

            <div className="container relative z-10 mx-auto text-center space-y-8 max-w-[900px]">

                {/* Badge Superior */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs animate-in fade-in slide-in-from-top-4 duration-1000">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c52ff] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8c52ff]"></span>
                    </span>
                    Sistemas Inteligentes & Automações de Elite
                </div>

                {/* Título Principal */}
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-8xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                    Codificando o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c52ff] to-[#b085ff]">Próximo Nível</span> do seu Negócio
                </h1>

                {/* Subtexto */}
                <p className="mx-auto max-w-[750px] text-zinc-400 text-lg md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    A ZenithCodex funde Inteligência Artificial, Engenharia de Dados e Desenvolvimento Premium para criar ecossistemas digitais que escalam sem limites.
                </p>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
                    <Button
                        size="lg"
                        className="bg-[#8c52ff] hover:bg-[#7a41eb] text-white px-8 h-14 text-lg rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(140,82,255,0.3)]"
                        asChild
                    >
                        <Link href="/orcamento">
                            Iniciar Projeto <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="lg"
                        className="text-zinc-300 hover:text-white hover:bg-zinc-900 px-8 h-14 text-lg rounded-full"
                        asChild
                    >
                        <Link href="#solutions" className="flex items-center">
                            Ver Soluções <ChevronRight className="ml-1 h-5 w-5" />
                        </Link>
                    </Button>
                </div>

                {/* Rodapé da Hero - Prova Social ou Tecnologias */}
                <div className="pt-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6">Expertise em Ecossistemas Digitais</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {/* Aqui você pode colocar logos sutis ou apenas nomes de conceitos */}
                        <span className="text-zinc-400 font-medium">Artificial Intelligence</span>
                        <span className="text-zinc-400 font-medium">Data Science</span>
                        <span className="text-zinc-400 font-medium">Workflow Automation</span>
                        <span className="text-zinc-400 font-medium">Cloud Infrastructure</span>
                    </div>
                </div>
            </div>
        </section>
    );
}