
import React from 'react';
import { HeroContent } from './hero/hero-content';
import { BattleCard } from './hero/battle-card';

export const HeroSection = () => {
  return (
    <section className="pt-32 md:pt-40 pb-12 md:pb-20 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <HeroContent />
          <BattleCard />
        </div>
      </div>
    </section>
  );
};
