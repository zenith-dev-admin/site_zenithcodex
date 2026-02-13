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
  title: "ZenithCodex | Soluções Digitais Profissionais",
  description: "Transformando ideias em realidade digital com as melhores tecnologias do mercado.",
  icons: {
    icon: "/icon.svg",
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
