import { ExternalLink } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6 max-w-[800px] text-zinc-300">
            <h1 className="text-3xl font-bold mb-6 text-white">Política de Privacidade</h1>
            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">

                <section>
                    <p>
                        A sua privacidade é fundamental para a <strong>ZenithCodex</strong>. Esta política detalha como tratamos suas informações em conformidade com a
                        <a
                            href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8c52ff] hover:underline inline-flex items-center gap-1 ml-1"
                        >
                            Lei Geral de Proteção de Dados (LGPD) <ExternalLink className="h-3 w-3" />
                        </a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Coleta de Dados e Finalidade</h2>
                    <p>Coletamos informações para fornecer serviços de alta tecnologia. Isso inclui:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Dados de Contato:</strong> Nome e e-mail fornecidos via formulário de orçamento para retorno comercial.</li>
                        <li><strong>Histórico de Chat:</strong> Armazenamos localmente (localStorage) e em nossos servidores as interações com o assistente "Zen" para continuidade do atendimento e melhoria da IA.</li>
                        <li><strong>Cookies:</strong> Utilizamos identificadores para manter sessões e entender a navegação no site.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Armazenamento e Segurança</h2>
                    <p>
                        Retemos os dados apenas pelo tempo necessário para cumprir as finalidades descritas. Adotamos medidas de segurança de nível empresarial (criptografia e firewalls) para proteger seus dados contra acessos não autorizados ou vazamentos.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Seus Direitos (LGPD)</h2>
                    <p>De acordo com a legislação brasileira, você possui direitos sobre seus dados, incluindo:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Acesso e confirmação da existência de tratamento de dados.</li>
                        <li>Correção de dados incompletos ou inexatos.</li>
                        <li><strong>Eliminação:</strong> Você pode solicitar a exclusão de seus dados pessoais de nossa base a qualquer momento.</li>
                        <li>Revogação do consentimento.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Compartilhamento com Terceiros</h2>
                    <p>
                        Não vendemos seus dados. O compartilhamento ocorre apenas com provedores de infraestrutura essenciais (como servidores de hospedagem e APIs de processamento de IA) sob contratos de confidencialidade, ou por obrigação legal.
                    </p>
                </section>

                <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 mt-10">
                    <h2 className="text-lg font-semibold text-white mb-2">Contato sobre Dados</h2>
                    <p className="text-sm text-zinc-400">
                        Para exercer seus direitos de privacidade ou tirar dúvidas, entre em contato através do nosso formulário de suporte ou por e-mail, no endereço admin@zenithcodex.com.
                    </p>
                </section>
            </div>
        </div>
    );
}