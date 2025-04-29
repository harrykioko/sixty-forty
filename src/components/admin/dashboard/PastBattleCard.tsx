import { motion } from "framer-motion";
import { Eye, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Week } from "@/types/admin";
import { format } from "date-fns";

interface PastBattleCardProps {
  week: Week;
  onView: () => void;
  onEdit?: () => void;
}

export const PastBattleCard = ({ week, onView, onEdit }: PastBattleCardProps) => {
  const winner = week.products?.find(p => p.id === week.winnerId);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl transition-colors duration-300">
        {/* Hero Image */}
        <div className="h-48 overflow-hidden relative">
          {winner?.image ? (
            <img
              src={winner.image}
              alt={winner.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sixty40-purple/20 to-sixty40-blue/20 flex items-center justify-center">
              <span className="text-white/40 text-sm">No Image</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className="bg-sixty40-blue/20 text-white/80">
              Week {week.number}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1">
                {winner?.title || "No Winner"}
              </h3>
              <p className="text-white/60 text-sm">
                {format(week.startDate, 'MMM d')} – {format(week.endDate, 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          {winner && (
            <div className="mb-4">
              <Badge className="bg-white/10 text-white/80 mb-2">
                {winner.builderName}
              </Badge>
              <p className="text-white/60 text-sm line-clamp-2">
                {winner.shortDescription}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm text-white/40">
              {week.products?.length || 0} Entries • {week.totalVotes || 0} Votes
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  className="border-white/20 hover:bg-white/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={onView}
                className="border-white/20 hover:bg-white/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 