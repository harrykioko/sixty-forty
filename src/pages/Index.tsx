import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BattleSection } from "@/components/sections/BattleSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PastBattlesSection } from "@/components/sections/PastBattlesSection";
import { BuildersSection } from "@/components/sections/BuildersSection";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { StickyCta } from "@/components/ui/StickyCta";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-sixty40-dark bg-dot-pattern">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <BattleSection />
        <HowItWorksSection />
        <PastBattlesSection />
        <BuildersSection />
      </main>

      <SiteFooter />
      <StickyCta />
    </div>
  );
};

export default Index;
