
import { motion } from "framer-motion";

export const BattleEmptyState = () => {
  return (
    <div className="relative glass-card p-6 md:p-8 rounded-lg overflow-hidden backdrop-blur-md bg-black/20 border border-white/10">
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No active battle</p>
      </div>
    </div>
  );
};
