
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onCreateBattle: () => void;
}

export const DashboardHeader = ({ onCreateBattle }: DashboardHeaderProps) => {
  return (
    <div className="glass rounded-xl p-6 shadow-lg border border-white/10 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <motion.h1 
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Dashboard
        </motion.h1>
        <Button 
          onClick={onCreateBattle}
          className="px-6 py-3 font-semibold text-white rounded-full bg-gradient-to-r from-sixty40-purple to-sixty40-blue hover:shadow-lg hover:shadow-sixty40-purple/20 transition-all duration-300 backdrop-blur-sm"
        >
          Create New Battle
        </Button>
      </div>
    </div>
  );
};
