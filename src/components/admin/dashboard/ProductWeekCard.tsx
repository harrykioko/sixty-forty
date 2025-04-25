
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
      <Card className="glass-card bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full">
              <div className="mb-4 bg-black/20 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    "text-white animate-pulse-slow",
                    week.status === 'active' ? 'bg-green-600' : 
                    week.status === 'voting' ? 'bg-blue-600' : 
                    'bg-gray-600'
                  )}>
                    {week.status.charAt(0).toUpperCase() + week.status.slice(1)}
                  </Badge>
                  <span className="text-muted-foreground text-sm">
                    • {week.products?.length || 0} Entries • {week.totalVotes || 0} Votes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onEdit}
                    className="glass-button hover:scale-105 transition-transform"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onView}
                    className="glass-button hover:scale-105 transition-transform"
                  >
                    <Eye size={16} className="mr-2" />
                    View
                  </Button>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-1">{week.theme || `Week ${week.number} Battle`}</h4>
              <div className="mt-4">
                <StatusTimeline currentStatus={week.status} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-black/20 p-4 flex items-center border-t border-white/10">
          <div className="text-sm text-muted-foreground flex items-center">
            <Calendar size={14} className="mr-2" />
            Created on {new Date(week.startDate).toLocaleDateString()}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
