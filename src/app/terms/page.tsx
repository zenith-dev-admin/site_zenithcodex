import { AlertTriangle } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6 max-w-[800px] text-zinc-300">
            <h1 className="text-3xl font-bold mb-6 text-white">Termos de Uso</h1>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
                <section>
                    <p>
                        Ao acessar o site da <strong>ZenithCodex</strong> e utilizar nosso assistente virtual (Zen), você concorda em cumprir estes termos de serviço e todas as leis aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Uso do Assistente Virtual (Zen)</h2>
                    <p>O assistente virtual Zen é uma ferramenta baseada em inteligência artificial fornecida para fins informativos e de triagem de projetos.</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Limitações da IA:</strong> Você reconhece que respostas geradas por IA podem conter imprecisões. A ZenithCodex não se responsabiliza por decisões tomadas com base exclusivamente em informações geradas pelo chat.</li>
                        <li><strong>Uso Aceitável:</strong> É proibido utilizar o chat para enviar conteúdo ofensivo, vírus ou praticar engenharia reversa em nossas soluções de automação.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Propriedade Intelectual</h2>
                    <p>
                        Todos os materiais, códigos de software, designs e algoritmos de Machine Learning exibidos ou demonstrados neste site são propriedade intelectual da ZenithCodex. A licença concedida é apenas para visualização pessoal e informativa, não conferindo direito de cópia ou reprodução.
                    </p>
                </section>

                <section className="bg-[#8c52ff]/10 border border-[#8c52ff]/50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-[#8c52ff] mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" /> 3. Isenção de Responsabilidade
                    </h2>
                    <p className="text-sm">
                        Os serviços e materiais são fornecidos "como estão". A ZenithCodex não garante que os serviços de IA e automação estarão livres de interrupções ou erros. Em nenhuma circunstância seremos responsáveis por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso de nossas tecnologias experimentais ou demonstrativas no site.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Orçamentos e Propostas</h2>
                    <p>
                        As interações realizadas via chat ou formulário não constituem um contrato de prestação de serviços. O fechamento de qualquer projeto (Sites, Apps, IA ou Dados) será formalizado através de um contrato jurídico específico assinado por ambas as partes.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Modificações</h2>
                    <p>
                        A ZenithCodex pode revisar estes termos de serviço a qualquer momento, sem aviso prévio. Ao continuar a usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
                    </p>
                </section>

                <footer className="pt-8 text-sm text-zinc-500 border-t border-zinc-800">
                    Última atualização: Fevereiro de 2026.
                </footer>
            </div>
        </div>
    );
}