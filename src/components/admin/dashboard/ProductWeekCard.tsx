
import { Calendar, Eye, Edit, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { WeekData } from "@/types/admin";
import { cn } from "@/lib/utils";

interface ProductWeekCardProps {
  week: WeekData;
  onEdit: () => void;
  onView: () => void;
  onEndVoting?: () => void;
  isCurrentWeek?: boolean;
}

export const ProductWeekCard = ({ 
  week, 
  onEdit, 
  onView, 
  onEndVoting,
  isCurrentWeek = false
}: ProductWeekCardProps) => {
  const formattedStartDate = new Date(week.startDate).toLocaleDateString('en-us', { 
    month: 'numeric', 
    day: 'numeric' 
  });
  
  const formattedEndDate = new Date(week.endDate).toLocaleDateString('en-us', { 
    month: 'numeric', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card className={cn(
      "bg-transparent border-white/10 overflow-hidden",
      isCurrentWeek && "border-sixty40-purple/30"
    )}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isCurrentWeek ? (
                <Badge className="bg-green-600 text-white">Live</Badge>
              ) : (
                <Badge className="bg-gray-600 text-white">Completed</Badge>
              )}
              <span className="text-muted-foreground text-sm">
                {isCurrentWeek
                  ? `Week ${week.number} • Ends ${new Date(week.endDate).toLocaleDateString()}`
                  : `${formattedStartDate} - ${formattedEndDate}`
                }
              </span>
            </div>
            <h4 className="text-xl font-bold mb-1">{week.theme || `Battle #${week.number}`}</h4>
            <p className="text-muted-foreground">
              {week.products?.length || 0} entries • {week.totalVotes || 0} votes so far
              {!isCurrentWeek && week.winnerName && (
                <span className="ml-2">• Winner: {week.winnerName}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" onClick={onView}>
              <Eye size={16} className="mr-2" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
      {isCurrentWeek && onEndVoting && (
        <CardFooter className="bg-black/20 p-4 flex justify-between border-t border-white/10">
          <div className="text-sm text-muted-foreground flex items-center">
            <Calendar size={14} className="mr-2" />
            Created on {new Date(week.startDate).toLocaleDateString()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onEndVoting}
            className="text-red-500 border-red-500/30 hover:bg-red-500/10"
          >
            <AlertTriangle size={14} className="mr-2" />
            End Voting Early
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
