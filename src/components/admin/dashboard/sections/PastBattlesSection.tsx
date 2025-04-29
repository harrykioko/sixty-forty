import { motion } from "framer-motion";
import { Week } from "@/types/admin";
import { PastBattleCard } from "@/components/admin/dashboard/PastBattleCard";

interface PastBattlesSectionProps {
  pastWeeks: Week[];
  onViewBattle: (week: Week) => void;
}

export const PastBattlesSection = ({ 
  pastWeeks, 
  onViewBattle 
}: PastBattlesSectionProps) => {
  if (!pastWeeks?.length) return null;
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-6">
        Past Battles
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastWeeks.map((week) => (
          <PastBattleCard
            key={week.id}
            week={week}
            onView={() => onViewBattle(week)}
          />
        ))}
      </div>
    </motion.section>
  );
};
