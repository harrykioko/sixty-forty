import { motion } from "framer-motion";
import { Clock, Trophy, Package, ExternalLink, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CURRENT_WEEK } from "@/data/mock-data";
import CountdownTimer from "@/components/ui/countdown-timer";
import { useBuilderStats } from "@/hooks/use-builder-stats";

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
            <div className="flex items-center">
              <h2 className="text-xl font-bold">Week {weekNumber} Showdown</h2>
              {!isBuildPhase && (
                <Badge variant="outline" className="ml-2 bg-sixty40-dark/30 border-sixty40-purple/50 text-white animate-pulse-slow">
                  <span className="mr-1 w-2 h-2 rounded-full bg-red-500 inline-block"></span> 
                  Live
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="bg-sixty40-dark/30 border-white/20">
              <Clock size={14} className="mr-1" /> Week {weekNumber}
            </Badge>
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
            
            {CURRENT_WEEK.products.map((builder, index) => {
              const isHarry = index === 0;
              const gradientClass = isHarry 
                ? `from-sixty40-orange${isBuildPhase ? '/40' : ''} via-sixty40-pink${isBuildPhase ? '/40' : ''} to-red-500${isBuildPhase ? '/40' : ''}`
                : `from-sixty40-blue${isBuildPhase ? '/40' : ''} via-sixty40-purple${isBuildPhase ? '/40' : ''} to-indigo-500${isBuildPhase ? '/40' : ''}`;
              
              const stats = builderStats.find(
                (stat: any) => stat.builder?.name.toLowerCase().includes(isHarry ? 'harry' : 'marcos')
              );
              
              return (
                <motion.div 
                  key={index}
                  className="relative glass-card p-4 rounded-lg bg-black/20 border border-white/10 flex flex-col items-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative mb-3">
                    <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${gradientClass} blur-sm opacity-70`}></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
                      <img
                        src={stats?.builder?.avatar_url || builder.builderAvatar}
                        alt={builder.builderName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl">{stats?.builder?.name || builder.builderName}</h3>
                  <p className="text-xs text-muted-foreground italic mb-3">
                    {stats?.builder?.tagline || (isHarry ? "Puts the VC into vibe coding" : "Speed. Sass. SaaS.")}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center text-sm">
                      <Trophy size={14} className={`mr-1 text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
                      <span>{stats?.wins || 0} Wins</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Package size={14} className={`mr-1 text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
                      <span>{stats?.products_launched || 0} Products</span>
                    </div>
                  </div>
                  
                  {!isBuildPhase && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full text-sm font-medium bg-gradient-to-r ${gradientClass} bg-opacity-10 backdrop-blur-sm border border-white/10`}
                        style={{ 
                          background: `linear-gradient(90deg, ${isHarry ? '#f9731620' : '#0ea5e920'} 0%, ${isHarry ? '#d946ef20' : '#9b87f520'} 100%)`,
                        }}
                      >
                        <Package size={14} className={`text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
                        <span className="animate-pulse-slow">
                          {index === 0 ? '42' : '38'} votes
                        </span>
                      </motion.div>
                      
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
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {isBuildPhase ? (
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
