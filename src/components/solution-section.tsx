import {
    Bot,
    Zap,
    Globe,
    BarChart3,
    BrainCircuit,
    Database
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function SolutionsSection() {
    return (
        <section id="solutions" className="py-20 px-4 md:px-6 bg-zinc-950 text-white">
            <div className="container mx-auto max-w-[1200px]">
                <div className="text-center mb-12 space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Nossas Soluções</h2>
                    <p className="text-muted-foreground max-w-[600px] mx-auto">
                        Impulsione sua empresa com tecnologia de ponta e inteligência artificial.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 1. Agentes de IA */}
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-[#8c52ff] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(140,82,255,0.15)]">
                        <CardHeader>
                            <Bot className="h-10 w-10 text-[#8c52ff] mb-2" />
                            <CardTitle>Agentes de IA</CardTitle>
                            <CardDescription>Inteligência artificial conversacional avançada.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400">
                                Desenvolvemos assistentes virtuais personalizados que automatizam o atendimento e otimizam a experiência do cliente.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 2. Automação de Fluxos */}
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-[#8c52ff] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(140,82,255,0.15)]">
                        <CardHeader>
                            <Zap className="h-10 w-10 text-[#8c52ff] mb-2" />
                            <CardTitle>Automação de Workflow</CardTitle>
                            <CardDescription>Elimine tarefas repetitivas e manuais.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400">
                                Integração inteligente de sistemas para criar fluxos de trabalho autônomos que economizam tempo e reduzem erros operacionais.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 3. Apps Web de Alta Performance */}
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-[#8c52ff] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(140,82,255,0.15)]">
                        <CardHeader>
                            <Globe className="h-10 w-10 text-[#8c52ff] mb-2" />
                            <CardTitle>Web Apps Premium</CardTitle>
                            <CardDescription>Sistemas robustos e escaláveis.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400">
                                Desenvolvimento de aplicações web modernas, focadas em UX e performance para negócios que buscam escala.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 4. Ciência de Dados */}
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-[#8c52ff] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(140,82,255,0.15)]">
                        <CardHeader>
                            <BarChart3 className="h-10 w-10 text-[#8c52ff] mb-2" />
                            <CardTitle>Data Science</CardTitle>
                            <CardDescription>Transforme dados em decisões estratégicas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400">
                                Análise avançada de dados e criação de dashboards inteligentes para insights acionáveis sobre seu negócio.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 5. Machine Learning */}
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-[#8c52ff] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(140,82,255,0.15)]">
                        <CardHeader>
                            <BrainCircuit className="h-10 w-10 text-[#8c52ff] mb-2" />
                            <CardTitle>Machine Learning</CardTitle>
                            <CardDescription>Modelos preditivos personalizados.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400">
                                Criação de algoritmos de aprendizado de máquina para previsão de demanda, classificação e análise preditiva.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 6. Infraestrutura e VPS */}
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-[#8c52ff] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(140,82,255,0.15)]">
                        <CardHeader>
                            <Database className="h-10 w-10 text-[#8c52ff] mb-2" />
                            <CardTitle>Infraestrutura Crítica</CardTitle>
                            <CardDescription>Servidores e Bancos de Dados de alta disponibilidade.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400">
                                Implementação e manutenção de servidores VPS, containers Docker e bancos de dados seguros e monitorados 24/7.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}