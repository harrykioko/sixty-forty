import React from 'react';
import { motion } from "framer-motion";
import { Clock, Trophy, Package, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CURRENT_WEEK, BUILDERS } from "@/data/mock-data";
import CountdownTimer from "@/components/ui/countdown-timer";

export const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What if{" "}
              <span className="bg-gradient-to-r from-[#8a2be2] to-[#00bfff] bg-clip-text text-transparent">
                shipping fast
              </span>{" "}
              made you{" "}
              <span className="bg-gradient-to-r from-[#8a2be2] to-[#00bfff] bg-clip-text text-transparent">
                rich
              </span>?
            </motion.h1>
            
            <motion.div 
              className="space-y-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-xl text-muted-foreground">
                Each week, two builders go head-to-head. Two real products. One vote.
              </p>
              <p className="text-xl text-muted-foreground">
                The one you choose gets{" "}
                <span className="bg-gradient-to-r from-[#8a2be2] to-[#00bfff] bg-clip-text text-transparent font-semibold">
                  60% of everything
                </span>{" "}
                that week's products earn —{" "}
                <span className="bg-gradient-to-r from-[#8a2be2] to-[#00bfff] bg-clip-text text-transparent font-semibold">
                  forever
                </span>.
              </p>
              <p className="text-xl text-muted-foreground">
                The other? They still eat. Just not first.
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-sixty40-purple hover:bg-sixty40-purple/90 w-full sm:w-auto transform transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="#vote-now">Vote Now</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sixty40-purple text-sixty40-purple hover:bg-sixty40-purple/10 w-full sm:w-auto transform transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="#how-it-works">How It Works</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-first lg:order-last"
          >
            <div className="relative">
              {/* Glassmorphic outer container with glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sixty40-purple to-sixty40-blue rounded-lg blur opacity-75"></div>
              <div className="relative glass-card p-6 md:p-8 rounded-lg overflow-hidden backdrop-blur-md bg-black/20 border border-white/10">
                
                {/* Header - Matchup title and week indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold">Week 15 Showdown</h2>
                    <Badge variant="outline" className="ml-2 bg-sixty40-dark/30 border-sixty40-purple/50 text-white animate-pulse-slow">
                      <span className="mr-1 w-2 h-2 rounded-full bg-red-500 inline-block"></span> 
                      Live
                    </Badge>
                  </div>
                  <Badge variant="outline" className="bg-sixty40-dark/30 border-white/20">
                    <Clock size={14} className="mr-1" /> Week 15
                  </Badge>
                </div>
                
                {/* Builder cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Divider with VS */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div 
                      className="bg-gradient-to-r from-sixty40-purple to-sixty40-blue bg-clip-text text-transparent font-bold text-2xl flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      <Zap className="text-white" size={18} />
                    </motion.div>
                  </div>
                  
                  {CURRENT_WEEK.products.map((builder, index) => {
                    const isHarry = index === 0;
                    const gradientClass = isHarry 
                      ? 'from-sixty40-orange via-sixty40-pink to-red-500'
                      : 'from-sixty40-blue via-sixty40-purple to-indigo-500';
                    
                    return (
                      <motion.div 
                        key={index}
                        className="relative glass-card p-4 rounded-lg bg-black/20 border border-white/10 flex flex-col items-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Builder avatar with glow ring */}
                        <div className="relative mb-3">
                          <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${gradientClass} blur-sm opacity-70`}></div>
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
                            <img
                              src={BUILDERS[index].avatar}
                              alt={builder.builderName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Builder name and tagline */}
                        <h3 className="font-bold text-xl">{builder.builderName}</h3>
                        <p className="text-xs text-muted-foreground italic mb-3">
                          {isHarry ? "Builds before breakfast" : "Speed. Sass. SaaS."}
                        </p>
                        
                        {/* Stats with icons */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center text-sm">
                            <Trophy size={14} className={`mr-1 text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
                            <span>{BUILDERS[index].wins} Wins</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Package size={14} className={`mr-1 text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
                            <span>{BUILDERS[index].products} Products</span>
                          </div>
                        </div>
                        
                        {/* View Product button */}
                        <Button
                          size="sm"
                          variant="outline"
                          className={`w-full mt-2 border border-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}/50 hover:bg-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}/10`}
                          asChild
                        >
                          <a href="#vote-now">
                            View Product
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Voting countdown */}
                <div className="mt-4 text-center">
                  <CountdownTimer targetDate={CURRENT_WEEK.endDate} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
