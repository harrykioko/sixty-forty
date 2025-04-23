
import { Calendar, Eye, Edit, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { WeekData } from "@/types/admin";

interface ProductWeekCardProps {
  week: WeekData;
  onEdit: () => void;
  onView: () => void;
  onEndVoting: () => void;
}

export const ProductWeekCard = ({ 
  week, 
  onEdit, 
  onView, 
  onEndVoting 
}: ProductWeekCardProps) => {
  return (
    <Card className="bg-transparent border-white/10">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-green-600">Live</Badge>
              <span className="text-muted-foreground text-sm">
                Week {week.number} • Ends {new Date(week.endDate).toLocaleDateString()}
              </span>
            </div>
            <h4 className="text-xl font-bold mb-1">{week.theme}</h4>
            <p className="text-muted-foreground">
              {week.products.length} entries • {week.totalVotes} votes so far
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
    </Card>
  );
};
