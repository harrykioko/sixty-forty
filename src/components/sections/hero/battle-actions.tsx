
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Construction, ExternalLink } from "lucide-react";
import CountdownTimer from "@/components/ui/countdown-timer";

interface BattleActionsProps {
  isBuildPhase: boolean;
  endDate?: string;
}

export const BattleActions = ({ isBuildPhase, endDate }: BattleActionsProps) => {
  if (isBuildPhase) {
    return (
      <div className="mt-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-white/10 backdrop-blur-sm mb-4"
        >
          <Construction className="text-sixty40-purple" size={16} />
          <span className="text-sm font-medium">
            The boys are building
            <motion.span
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >...</motion.span>
          </span>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <Button
            variant="outline"
            className="relative px-6 border-sixty40-purple text-sixty40-purple transition-all duration-300 hover:bg-transparent hover:border-transparent hover:text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-sixty40-purple before:to-sixty40-blue before:opacity-0 hover:before:opacity-100 before:transition-opacity before:rounded-md before:-z-10"
            asChild
          >
            <a href="#last-week" className="relative z-10 flex items-center gap-2">
              See Last Week's Battle
              <ExternalLink size={14} />
            </a>
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-white"
            asChild
          >
            <a href="#archive" className="flex items-center gap-2">
              See All Past Competitions
              <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 text-center">
      <CountdownTimer targetDate={endDate ? new Date(endDate) : new Date()} />
    </div>
  );
};
