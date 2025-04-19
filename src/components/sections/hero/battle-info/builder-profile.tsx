
import { motion } from "framer-motion";
import { Trophy, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBuilderGradient } from "./utils";

interface BuilderProfileProps {
  stats: any;
  index: number;
  builderName: string;
  isBuildPhase: boolean;
}

export const BuilderProfile = ({ stats, index, builderName, isBuildPhase }: BuilderProfileProps) => {
  const isHarry = index === 0;
  const gradientClass = getBuilderGradient(isHarry, isBuildPhase);

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
          {stats?.builder?.avatar_url ? (
            <img
              src={stats.builder.avatar_url}
              alt={builderName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-lg font-semibold text-white">
                {builderName?.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="font-bold text-xl">{stats?.builder?.name || builderName}</h3>
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
              <Package size={14} className="ml-2" />
            </a>
          </Button>
        </>
      )}
    </motion.div>
  );
};

