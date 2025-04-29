
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Week } from "@/types/admin";

interface OlderBattlesListProps {
  battles: Week[];
  onSelectBattle: (index: number) => void;
}

export const OlderBattlesList = ({ battles, onSelectBattle }: OlderBattlesListProps) => {
  if (!battles || battles.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No additional battles available</p>
      </div>
    );
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
      {battles.map((battle, index) => (
        <div 
          key={battle.id}
          className="p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
          onClick={() => onSelectBattle(index)}
        >
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-sixty40-dark/30 border-white/20">
              {format(battle.startDate, 'MMM d')} - {format(battle.endDate, 'MMM d, yyyy')}
            </Badge>
            <Badge className="bg-sixty40-purple/20 text-sixty40-purple border border-sixty40-purple/30">
              Week {battle.number}
            </Badge>
          </div>
          <h4 className="font-medium mb-1">
            {battle.products?.find(p => p.id === battle.winnerId)?.title || 'Unknown Winner'}
          </h4>
          <div className="text-sm text-muted-foreground">
            Winner: {battle.products?.find(p => p.id === battle.winnerId)?.builderName || 'Unknown'}
          </div>
        </div>
      ))}
    </div>
  );
};
