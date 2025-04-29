import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Construction, ExternalLink } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { useEffect, useState } from "react";
import { usePastBattles } from "@/hooks/use-past-battles";

interface BattleActionsProps {
  isBattleActive: boolean;
  isBuilding?: boolean;
  endDate?: string;
}

export const BattleActions = ({ isBattleActive, isBuilding = false, endDate }: BattleActionsProps) => {
  const { data: pastBattles } = usePastBattles();
  const [lastBattleId, setLastBattleId] = useState<string | null>(null);

  useEffect(() => {
    if (pastBattles && pastBattles.length > 0) {
      setLastBattleId(pastBattles[0].id);
    }
  }, [pastBattles]);

  if (isBattleActive) {
    return (
      <div className="mt-4 text-center">
        <CountdownTimer targetDate={endDate ? new Date(endDate) : new Date()} />
      </div>
    );
  }

  return (
    <div className="mt-8 text-center">
      {isBuilding && (
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
      )}
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
        {lastBattleId && (
          <Button
            variant="outline"
            className="relative px-6 border-sixty40-purple text-sixty40-purple transition-all duration-300 hover:bg-transparent hover:border-transparent hover:text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-sixty40-purple before:to-sixty40-blue before:opacity-0 hover:before:opacity-100 before:transition-opacity before:rounded-md before:-z-10"
            asChild
          >
            <a href={`/battle/${lastBattleId}`} className="relative z-10 flex items-center gap-2">
              See Last Week's Battle
              <ExternalLink size={14} />
            </a>
          </Button>
        )}
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
};
