
import { motion } from "framer-motion";
import { Calendar, Eye, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StatusTimeline } from "@/components/admin/panels/StatusTimeline";
import { WeekData } from "@/types/admin";
import { cn } from "@/lib/utils";

interface ProductWeekCardProps {
  week: WeekData;
  onEdit: () => void;
  onView: () => void;
}

export const ProductWeekCard = ({ 
  week, 
  onEdit, 
  onView 
}: ProductWeekCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border-white/10 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full space-y-6">
              {/* Header Section */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full animate-pulse-slow",
                        week.status === 'active' ? 'bg-sixty40-blue text-white' : 
                        week.status === 'voting' ? 'bg-sixty40-purple text-white' : 
                        'bg-white/10 text-white/60'
                      )}
                    >
                      {week.status.charAt(0).toUpperCase() + week.status.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <span>•</span>
                      <span>{week.products?.length || 0} Entries</span>
                      <span>•</span>
                      <span>{week.totalVotes || 0} Votes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={onEdit}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onView}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <Eye size={16} className="mr-2" />
                      View
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {week.theme || `Week ${week.number} Battle`}
                  </h4>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="mt-6">
                <StatusTimeline 
                  currentStatus={week.status} 
                  startDate={week.startDate}
                  endDate={week.endDate}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-black/40 p-4 flex items-center border-t border-white/5">
          <div className="text-sm text-white/60 flex items-center">
            <Calendar size={14} className="mr-2" />
            Created on {new Date(week.startDate).toLocaleDateString()}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
