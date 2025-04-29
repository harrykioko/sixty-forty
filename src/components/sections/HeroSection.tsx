import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import React from 'react';
import { HeroContent } from './hero/HeroContent';
import { BattleCard } from './hero/BattleCard';

export const HeroSection = () => {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <HeroContent />
          <BattleCard />
        </div>
      </div>
    </section>
  );
};
