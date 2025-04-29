import { motion } from "framer-motion";
import { Edit, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WeekData } from "@/types/admin";
import { format } from "date-fns";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

/**
 * ProductWeekCard displays the current battle week with status and admin actions.
 * - Glassmorphic card styling
 * - Edit/View buttons with tooltips and accessibility
 * - Responsive and accessible
 */
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
      <Card className="relative overflow-hidden bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl transition-colors duration-300 p-10 rounded-2xl">
        <TooltipProvider>
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <h4 className="text-3xl font-space-grotesk font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Week {week.number} Battle
            </h4>
            <div className="flex gap-2">
              {/* Edit Button with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onEdit}
                    aria-label="Edit week"
                    className="p-2 rounded-full bg-white/10 hover:bg-sixty40-blue/20 focus-visible:ring-2 focus-visible:ring-sixty40-blue focus-visible:ring-offset-2 shadow transition-colors outline-none"
                  >
                    <Edit className="w-5 h-5 text-white/80" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  Edit week
                </TooltipContent>
              </Tooltip>
              {/* View Button with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onView}
                    aria-label="View or edit products"
                    className="p-2 rounded-full bg-white/10 hover:bg-sixty40-blue/20 focus-visible:ring-2 focus-visible:ring-sixty40-blue focus-visible:ring-offset-2 shadow transition-colors outline-none"
                  >
                    <Eye className="w-5 h-5 text-white/80" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  View/edit products
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>

        {/* Status Message */}
        <div className="text-center mb-8">
          <p className="text-white/70 text-base">
            {week.products?.length ? 
              `${week.products.length} Entries • ${week.totalVotes || 0} Votes` :
              "No entries yet – nudge Harry and Marcos to submit!"}
          </p>
        </div>

        {/* Divider for section separation */}
        <div className="border-t border-white/10 my-6 w-full" />

        {/* Metadata Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="px-6 py-2 rounded-full bg-sixty40-blue/20 text-white/80 text-sm text-center min-w-[120px]">
            {week.status.charAt(0).toUpperCase() + week.status.slice(1)}
          </div>
          <div className="text-white/60 text-sm text-center">
            {format(week.startDate, 'MMM d')} – {format(week.endDate, 'MMM d, yyyy')}
          </div>
          <div className="text-white/60 text-sm text-center">
            Created on {format(week.startDate, 'M/d/yyyy')}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
