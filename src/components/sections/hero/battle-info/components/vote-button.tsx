
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBuilderGradient } from "../utils";

interface VoteButtonProps {
  isHarry: boolean;
  isBuildPhase: boolean;
  votes?: number;
}

export const VoteButton = ({ isHarry, isBuildPhase, votes }: VoteButtonProps) => {
  if (isBuildPhase) return null;

  const gradientClass = getBuilderGradient(isHarry, isBuildPhase);

  return (
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
          {votes || 0} votes
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
  );
};
