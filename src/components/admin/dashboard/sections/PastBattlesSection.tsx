
import { motion } from "framer-motion";
import { Week } from "@/types/admin";
import { PastBattlesList } from "@/components/admin/dashboard/PastBattlesList";

interface PastBattlesSectionProps {
  weeks: Week[];
  onView?: (week: Week) => void;
  onEdit?: (week: Week) => void;
}

export const PastBattlesSection = ({ 
  weeks, 
  onView, 
  onEdit 
}: PastBattlesSectionProps) => {
  if (!weeks || weeks.length === 0) return null;
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold mb-4">Past Battles</h2>
      <PastBattlesList weeks={weeks} onView={onView} onEdit={onEdit} />
    </motion.section>
  );
};
