import { motion } from "framer-motion";
import { Week } from "@/types/admin";
import { ProductWeekCard } from "@/components/admin/dashboard/ProductWeekCard";
import { WinnerSelectionPanel } from "@/components/admin/dashboard/WinnerSelectionPanel";

interface CurrentBattleSectionProps {
  week: Week | null;
  onEdit: () => void;
  onView: () => void;
  onWinnerSelected: () => void;
}

export const CurrentBattleSection = ({ 
  week, 
  onEdit, 
  onView,
  onWinnerSelected
}: CurrentBattleSectionProps) => {
  if (!week) return null;
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">Current Battle</h2>
      <ProductWeekCard
        week={week}
        onEdit={onEdit}
        onView={onView}
      />
      
      {week.products && week.products.length > 0 && (
        <WinnerSelectionPanel
          weekId={week.id}
          products={week.products}
          winnerId={week.winnerId}
          onWinnerSelected={onWinnerSelected}
        />
      )}
    </motion.section>
  );
};
