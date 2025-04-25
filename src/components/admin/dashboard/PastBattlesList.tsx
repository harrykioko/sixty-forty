
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye } from "lucide-react";
import { Week } from "@/types/admin";
import { format } from "date-fns";

interface PastBattlesListProps {
  weeks: Week[];
  onView?: (week: Week) => void;
  onEdit?: (week: Week) => void;
}

export const PastBattlesList = ({ weeks, onView, onEdit }: PastBattlesListProps) => {
  if (!weeks || weeks.length === 0) {
    return (
      <div className="text-center p-8 bg-black/20 rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-2">No Past Battles</h3>
        <p className="text-muted-foreground">
          Past battle weeks will appear here once they are completed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {weeks.map((week) => (
        <Card key={week.id} className="bg-transparent border-white/10">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-gray-600">Completed</Badge>
                  <span className="text-muted-foreground text-sm">
                    {format(week.endDate, "MMM d, yyyy")}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-1">{week.theme || `Week ${week.number} Battle`}</h4>
                <p className="text-muted-foreground">
                  Winner: {week.winnerName || 'Not determined'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(week)}>
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                )}
                {onView && (
                  <Button variant="ghost" size="sm" onClick={() => onView(week)}>
                    <Eye size={16} className="mr-2" />
                    View
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
