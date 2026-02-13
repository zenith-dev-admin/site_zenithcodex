import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { WhatsAppButton } from "@/components/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zenithcodex.com'), // Substitua pelo domínio real
  title: {
    default: "ZenithCodex | Soluções Digitais com IA",
    template: "%s | ZenithCodex"
  },
  description: "Desenvolvimento de Software Premium, Inteligência Artificial e Automação de Processos para transformar seu negócio.",
  keywords: ["Desenvolvimento Web", "Inteligência Artificial", "Next.js", "React", "Automação", "Software House", "Chatbots"],
  authors: [{ name: "ZenithCodex Team" }],
  creator: "ZenithCodex",
  publisher: "ZenithCodex",
  formatDetection: {
    email: false, // Evita detecção automática de emails para prevenir spam
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "ZenithCodex | Soluções Digitais de Elite",
    description: "Desenvolvimento de Software Premium e Soluções de IA para escalar seu negócio.",
    url: 'https://zenithcodex.com',
    siteName: 'ZenithCodex',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Certifique-se de criar esta imagem em public/
        width: 1200,
        height: 630,
        alt: 'ZenithCodex - Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZenithCodex | Soluções Digitais de Elite",
    description: "Desenvolvimento de Software Premium e Soluções de IA para escalar seu negócio.",
    images: ['/og-image.jpg'], // Reutiliza a OG Image
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  verification: {
    google: "google-site-verification=SEU_CODIGO_AQUI",
    yandex: "yandex-verification=SEU_CODIGO_AQUI",
  },
};

import { Providers } from "@/components/providers";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "ZenithCodex",
              "url": "https://zenithcodex.com",
              "logo": "https://zenithcodex.com/icon.png",
              "description": "ZenithCodex - Soluções Digitais com IA. Especialistas em automação e software de alta performance.", "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR",
                "addressRegion": "RJ" // Ajuste conforme a sede
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-21-99992-3247", // Ajuste para o telefone real
                "contactType": "sales",
                "areaServed": "BR",
                "availableLanguage": ["Portuguese", "English"]
              },
              // "sameAs": [
              //   "https://www.linkedin.com/company/zenithcodex", // Adicione links reais
              //   "https://github.com/zenithcodex"
              // ]
            })
          }}
        />
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <ChatWidget />
          <WhatsAppButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
