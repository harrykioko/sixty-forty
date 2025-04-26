
import { motion } from "framer-motion";
import { Edit, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusTimeline } from "@/components/admin/panels/StatusTimeline";
import { WeekData } from "@/types/admin";
import { format } from "date-fns";

interface ProductWeekCardProps {
  week: WeekData;
  onEdit: () => void;
  onView: () => void;
}

export const ProductWeekCard = ({ week, onEdit, onView }: ProductWeekCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="transition-all duration-300"
    >
      <Card className="relative overflow-hidden bg-[#0A0B14]/80 hover:bg-[#0A0B14]/90 backdrop-blur-xl border-white/10 shadow-2xl transition-colors duration-300 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h4 className="text-3xl font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Week {week.number} Battle
          </h4>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Edit className="w-4 h-4 text-white/60" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onView}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Eye className="w-4 h-4 text-white/60" />
            </motion.button>
          </div>
        </div>

        {/* Timeline */}
        <StatusTimeline 
          currentStatus={week.status} 
          startDate={week.startDate}
          endDate={week.endDate}
        />

        {/* Status Message */}
        <div className="text-center mb-8">
          <p className="text-white/60 text-lg">
            {week.products?.length ? 
              `${week.products.length} Entries • ${week.totalVotes || 0} Votes` :
              "No entries yet – nudge Harry and Marcos to submit!"}
          </p>
        </div>

        {/* Metadata Row */}
        <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
          <div className="px-4 py-1.5 rounded-full bg-sixty40-blue/20 text-white/80 text-sm">
            {week.status.charAt(0).toUpperCase() + week.status.slice(1)}
          </div>
          
          <div className="text-white/60 text-sm">
            {format(week.startDate, 'MMM d')} – {format(week.endDate, 'MMM d, yyyy')}
          </div>
          
          <div className="text-white/60 text-sm">
            Created on {format(week.startDate, 'M/d/yyyy')}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
