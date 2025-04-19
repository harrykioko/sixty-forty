
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CURRENT_WEEK, BUILDERS } from "@/data/mock-data";

export const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-sixty40-purple text-white px-3 py-1 text-sm">
              This Week's Battle
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span>Weekly Micro-SaaS</span>{" "}
              <span className="gradient-text">Competition</span>
            </h1>
            <p className="text-xl mb-6 text-muted-foreground max-w-lg">
              Every week, Harry and Marcos build competing MVPs and release them into the wild. Vote for your favorite and help crown this week's champion!
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <Button
                size="lg"
                className="bg-sixty40-purple hover:bg-sixty40-purple/90 w-full sm:w-auto"
                asChild
              >
                <a href="#vote-now">Vote Now</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sixty40-purple text-sixty40-purple hover:bg-sixty40-purple/10 w-full sm:w-auto"
                asChild
              >
                <a href="#how-it-works">How It Works</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-first lg:order-last"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sixty40-purple to-sixty40-blue rounded-lg blur opacity-75"></div>
              <div className="relative glass-card p-6 md:p-8 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">{CURRENT_WEEK.theme}</h2>
                  <Badge variant="outline" className="bg-sixty40-dark/30">
                    <Clock size={14} className="mr-1" /> Week 15
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {CURRENT_WEEK.products.map((builder, index) => (
                    <div 
                      key={index}
                      className="text-center flex flex-col items-center"
                    >
                      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-white/20">
                        <img
                          src={BUILDERS[index].avatar}
                          alt={builder.builderName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-xl">{builder.builderName}</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {BUILDERS[index].wins} Wins • {BUILDERS[index].products} Products
                      </p>
                      <div className="flex gap-2">
                        <Badge className="bg-gray-800/50">{BUILDERS[index].products} Products</Badge>
                        <Badge className="bg-sixty40-purple">{BUILDERS[index].wins} Wins</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
