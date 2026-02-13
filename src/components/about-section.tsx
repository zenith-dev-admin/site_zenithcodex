import { Rocket, Target, Users } from "lucide-react";

export function AboutSection() {
    return (
        <section id="about" className="py-24 px-4 md:px-6 bg-zinc-950">
            <div className="container mx-auto max-w-[1100px]">

                <div className="inline-block px-3 py-1 mb-5 rounded-full bg-[#8c52ff]/10 border border-[#8c52ff]/20 text-[#8c52ff] text-xs font-bold uppercase tracking-wider">
                    Sobre a ZenithCodex
                </div>
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Lado Esquerdo: Conteúdo */}
                    <div className="space-y-6">

                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Transformando códigos em <span className="text-[#8c52ff]">vantagem competitiva.</span>
                        </h2>

                        <p className="text-lg text-zinc-400 leading-relaxed">
                            A ZenithCodex nasceu da necessidade de conectar empresas ao futuro da tecnologia. Não entregamos apenas software; arquitetamos ecossistemas digitais que automatizam o presente e preveem o amanhã.
                        </p>

                        <div className="grid grid-cols-1 gap-4 pt-4">
                            <div className="flex gap-4">
                                <div className="flex-none"><Target className="h-6 w-6 text-[#8c52ff]" /></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Nossa Missão</h4>
                                    <p className="text-sm text-zinc-500">Democratizar o uso de IA e automações de elite para empresas de todos os portes.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-none"><Rocket className="h-6 w-6 text-[#8c52ff]" /></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Nossa Visão</h4>
                                    <p className="text-sm text-zinc-500">Ser a referência global em integração entre inteligência humana e artificial.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito: Visual Criativo */}
                    <div className="relative group">
                        {/* Elemento de decoração atrás */}
                        <div className="absolute -inset-4 bg-[#8c52ff]/20 rounded-xl blur-2xl -z-10 group-hover:bg-[#8c52ff]/30 transition-all duration-500" />

                        <div className="relative aspect-square md:aspect-auto md:h-[450px] w-full bg-zinc-900 rounded-2xl border border-zinc-800 p-8 overflow-hidden flex flex-col justify-center transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-[0_0_30px_rgba(140,82,255,0.15)]">
                            {/* Simulação de Interface de Código/IA */}
                            <div className="space-y-4 opacity-40 select-none pointer-events-none font-mono text-xs">
                                <div className="text-purple-400">class ZenithCodex {'{'}</div>
                                <div className="pl-4 text-zinc-500">constructor() {'{'}</div>
                                <div className="pl-8 text-blue-400">this.focus = "Maximum Efficiency";</div>
                                <div className="pl-8 text-blue-400">this.engine = "Artificial Intelligence";</div>
                                <div className="pl-4 text-zinc-500">{'}'}</div>
                                <div className="text-purple-400">{'}'}</div>
                                <div className="h-px bg-zinc-800 my-4" />
                                <div className="text-green-400 animate-pulse">{'>'} Deploying innovative solutions...</div>
                                <div className="text-zinc-500">{'>'} Status: Operational</div>
                            </div>

                            {/* Texto Centralizado */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                <img
                                    src="/about_image.svg"
                                    alt="About Image"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay de vidro caso queira manter o texto por cima da imagem */}
                                <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[0px] flex flex-col items-center justify-center text-center p-6">
                                    <Users className="h-12 w-12 text-[#8c52ff] mb-4" />
                                    <h3 className="text-2xl font-bold text-white">Inovação Orientada a Resultados</h3>
                                    <p className="text-white text-sm mt-2 max-w-[250px]">
                                        Combinando mentes humanas brilhantes com algoritmos de última geração.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}