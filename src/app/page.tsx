import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code, Server, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Welcome Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-24 px-4 md:px-6 text-center lg:py-32">
        <div className="container mx-auto space-y-6 max-w-[800px]">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Soluções Digitais que <span className="text-primary">Transformam</span> o Futuro
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Na ZenithCodex, criamos experiências web profissionais, chatbots inteligentes e infraestrutura robusta para impulsionar o seu negócio.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" className="bg-[#8c52ff]" asChild>
              <Link href="/orcamento" className="text-white font-semibold">
                Iniciar Projeto <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#solutions">Nossas Soluções</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-[1000px]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Quem Somos?</h2>
              <p className="text-muted-foreground leading-relaxed">
                A ZenithCodex é uma empresa focada em entregar excelência tecnológica. Nossa missão é simplificar a complexidade digital, oferecendo soluções sob medida que alavancam o crescimento dos nossos clientes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Combinamos design moderno, desenvolvimento ágil e inteligência artificial para criar produtos que não apenas funcionam, mas encantam.
              </p>
            </div>
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">Inovação & Tecnologia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-[1200px]">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Nossas Soluções</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Tecnologia de ponta para resolver desafios reais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Code className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Desenvolvimento Web</CardTitle>
                <CardDescription>Sites e Web Apps modernos e responsivos.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Utilizamos Next.js, Shadcn UI e Tailwind CSS para criar interfaces incríveis e performáticas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Agentes de IA</CardTitle>
                <CardDescription>Chatbots inteligentes com Google Gemini.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Integração de assistentes virtuais personalizados para atendimento e automação de processos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Server className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Infraestrutura VPS</CardTitle>
                <CardDescription>Hospedagem segura e escalável com Docker.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deploy otimizado em containers Docker, garantindo estabilidade e performance para sua aplicação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimers Section */}
      <section className="py-12 px-4 md:px-6 bg-muted/50 text-center">
        <div className="container mx-auto max-w-[800px] space-y-4">
          <h3 className="font-semibold text-lg">Compromisso com a Qualidade</h3>
          <p className="text-sm text-muted-foreground">
            Todas as nossas soluções são desenvolvidas seguindo rigorosos padrões de segurança e performance.
            Garantimos suporte contínuo e atualizações para manter seu negócio sempre à frente.
          </p>
          <p className="text-xs text-muted-foreground/60 italic">
            * Os prazos e valores podem variar de acordo com a complexidade do projeto. Consulte nossa equipe para um orçamento detalhado.
          </p>
        </div>
      </section>
    </div>
  );
}
