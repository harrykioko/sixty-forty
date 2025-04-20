
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface BattleHeaderProps {
  weekNumber: number;
  isBuildPhase: boolean;
}

export const BattleHeader = ({ weekNumber, isBuildPhase }: BattleHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <h2 className="text-xl font-bold">Week {weekNumber} Showdown</h2>
        {!isBuildPhase && (
          <Badge variant="outline" className="ml-2 bg-sixty40-dark/30 border-sixty40-purple/50 text-white animate-pulse-slow">
            <span className="mr-1 w-2 h-2 rounded-full bg-red-500 inline-block"></span> 
            Live
          </Badge>
        )}
      </div>
      <Badge variant="outline" className="bg-sixty40-dark/30 border-white/20">
        <Clock size={14} className="mr-1" /> Week {weekNumber}
      </Badge>
    </div>
  );
};
