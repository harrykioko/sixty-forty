
import { motion } from "framer-motion";
import { BuilderAvatar } from "./components/builder-avatar";
import { BuilderStats } from "./components/builder-stats";
import { VoteButton } from "./components/vote-button";

interface BuilderProfileProps {
  stats: any;
  index: number;
  builderName: string;
  isBuildPhase: boolean;
}

export const BuilderProfile = ({ stats, index, builderName, isBuildPhase }: BuilderProfileProps) => {
  const isHarry = index === 0;
  
  return (
    <motion.div 
      key={index}
      className="relative glass-card p-4 rounded-lg bg-black/20 border border-white/10 flex flex-col items-center"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <BuilderAvatar
        avatarUrl={stats?.builder?.avatar_url}
        builderName={builderName}
        isHarry={isHarry}
        isBuildPhase={isBuildPhase}
      />
      
      <h3 className="font-bold text-xl">{stats?.builder?.name || builderName}</h3>
      <p className="text-xs text-muted-foreground italic mb-3">
        {stats?.builder?.tagline || (isHarry ? "Puts the VC into vibe coding" : "Speed. Sass. SaaS.")}
      </p>
      
      <BuilderStats
        wins={stats?.wins || 0}
        productsLaunched={stats?.products_launched || 0}
        isHarry={isHarry}
      />
      
      <VoteButton
        isHarry={isHarry}
        isBuildPhase={isBuildPhase}
        votes={index === 0 ? 42 : 38}
      />
    </motion.div>
  );
};
