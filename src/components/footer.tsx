import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container px-4 md:px-6 py-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/ZenithCodex_logo.svg"
                                alt="ZenithCodex Logo"
                                width={150}
                                height={40}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Transformando ideias em realidade digital através de inovação e tecnologia avançada.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Navegação</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#about" className="hover:text-primary transition-colors">
                                    Quem somos
                                </Link>
                            </li>
                            <li>
                                <Link href="#solutions" className="hover:text-primary transition-colors">
                                    Soluções
                                </Link>
                            </li>
                            <li>
                                <Link href="/orcamento" className="hover:text-primary transition-colors">
                                    Orçamento
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contato</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>contato@zenithcodex.com</li>
                            <li>Av. Paulista, 1000 - São Paulo, SP</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    Política de Privacidade
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} ZenithCodex. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
