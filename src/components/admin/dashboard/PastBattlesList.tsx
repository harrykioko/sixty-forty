
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye } from "lucide-react";
import { WeekData } from "@/types/admin";

interface PastBattlesListProps {
  weeks: WeekData[];
}

export const PastBattlesList = ({ weeks }: PastBattlesListProps) => {
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
                    {week.endDate.toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-1">{week.theme}</h4>
                <p className="text-muted-foreground">
                  Winner: {week.winnerName || 'Not determined'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Edit size={16} className="mr-2" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye size={16} className="mr-2" />
                  View
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
