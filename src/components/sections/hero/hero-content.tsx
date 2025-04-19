
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center lg:text-left"
    >
      <motion.h1 
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
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
      
      <motion.p 
        className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Each week, two builders go head-to-head. You vote. One wins{" "}
        <span className="bg-gradient-to-r from-[#8a2be2] to-[#00bfff] bg-clip-text text-transparent font-semibold">
          60% of everything
        </span>{" "}
        — forever.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
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
  );
};
