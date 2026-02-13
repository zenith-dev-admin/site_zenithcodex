import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code, Server, MessageSquare } from "lucide-react";
import { SolutionsSection } from "@/components/solution-section";
import { QualityCommitment } from "@/components/quality-commitment";

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
      <SolutionsSection />

      {/* Disclaimers Section */}
      <QualityCommitment />
    </div>
  );
}
