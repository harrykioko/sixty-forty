
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const HeroContent = () => {
  return (
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
  );
};
