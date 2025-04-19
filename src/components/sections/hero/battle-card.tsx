
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { CURRENT_WEEK, BUILDERS } from "@/data/mock-data";
import CountdownTimer from "@/components/ui/countdown-timer";
import { useBuilderStats } from "@/hooks/use-builder-stats";
import { BuilderProfile } from "./battle-info/builder-profile";
import { BuildPhaseContent } from "./battle-info/build-phase-content";

export const BattleCard = () => {
  const { data: builderStats = [] } = useBuilderStats();
  const isBuildPhase = true; // This should be determined by the actual date logic later
  
  // Extract week number from the ID (e.g., "week-1" -> 1)
  const getWeekNumber = (weekId: string) => {
    const match = weekId.match(/week-(\d+)/);
    return match ? match[1] : "1"; // Default to 1 if no match
  };
  
  const weekNumber = getWeekNumber(CURRENT_WEEK.id);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="order-first lg:order-last"
    >
      <div className="relative">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${isBuildPhase ? 'from-sixty40-purple/50 to-sixty40-blue/50' : 'from-sixty40-purple to-sixty40-blue'} rounded-lg blur opacity-75`}></div>
        <div className="relative glass-card p-6 md:p-8 rounded-lg overflow-hidden backdrop-blur-md bg-black/20 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Week {weekNumber} Showdown</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {isBuildPhase && (
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div 
                  className="bg-gradient-to-r from-sixty40-purple/50 to-sixty40-blue/50 bg-clip-text text-transparent font-bold text-2xl flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
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
                  <Construction className="text-white" size={18} />
                </motion.div>
              </div>
            )}
            
            {CURRENT_WEEK.products.map((product, index) => {
              const builderName = product.builderName;
              const stats = builderStats.find(
                (stat: any) => stat.builder?.name.toLowerCase().includes(index === 0 ? 'harry' : 'marcos')
              );
              
              return (
                <BuilderProfile
                  key={index}
                  stats={stats}
                  index={index}
                  builderName={builderName}
                  isBuildPhase={isBuildPhase}
                />
              );
            })}
          </div>
          
          {isBuildPhase ? (
            <BuildPhaseContent />
          ) : (
            <div className="mt-4 text-center">
              <CountdownTimer targetDate={CURRENT_WEEK.endDate} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

