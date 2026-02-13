"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Substitua pelo número real
    const phoneNumber = "5511999999999";
    const message = "Olá! Gostaria de saber mais sobre as soluções da ZenithCodex.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 group",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            )}
        >
            <MessageCircle className="h-6 w-6 fill-current" />
            <span className="font-bold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
                Falar no WhatsApp
            </span>
        </Link>
    );
}
