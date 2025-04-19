
import { useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { BattleSection } from "@/components/sections/battle-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PastBattlesSection } from "@/components/sections/past-battles-section";
import { BuildersSection } from "@/components/sections/builders-section";
import { SiteFooter } from "@/components/layouts/site-footer";
import { StickyCta } from "@/components/ui/sticky-cta";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
