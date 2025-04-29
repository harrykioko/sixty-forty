
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Construction, ExternalLink } from "lucide-react";
import { usePastBattles } from "@/hooks/use-past-battles";
import { useEffect, useState } from "react";

export const BattleEmptyState = () => {
  const { data: pastBattles } = usePastBattles();
  const [lastBattleId, setLastBattleId] = useState<string | null>(null);

  useEffect(() => {
    if (pastBattles && pastBattles.length > 0) {
      setLastBattleId(pastBattles[0].id);
    }
  }, [pastBattles]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="order-first lg:order-last"
    >
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-sixty40-purple to-sixty40-blue rounded-lg blur opacity-75"></div>
        <div className="relative glass-card p-6 md:p-8 rounded-lg overflow-hidden backdrop-blur-md bg-black/20 border border-white/10">
          <div className="flex flex-col items-center justify-center py-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-white/10 backdrop-blur-sm mb-4"
            >
              <Construction className="text-sixty40-purple" size={16} />
              <span className="text-sm font-medium">Getting ready for the next battle</span>
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-2 text-center">No Active Battle Yet</h2>
            <p className="text-muted-foreground text-center mb-6 max-w-xs">
              Harry and Marcos are preparing for the next micro-SaaS showdown. Check back soon!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </div>
    </motion.div>
  );
};
