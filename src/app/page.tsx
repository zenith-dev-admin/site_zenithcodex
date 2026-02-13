import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code, Server, MessageSquare } from "lucide-react";
import { SolutionsSection } from "@/components/solution-section";
import { QualityCommitment } from "@/components/quality-commitment";
import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/welcome-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Welcome Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Solutions Section */}
      <SolutionsSection />

      {/* Disclaimers Section */}
      <QualityCommitment />
    </div>
  );
}
