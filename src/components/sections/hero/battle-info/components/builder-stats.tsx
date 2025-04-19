
import { Trophy, Package } from "lucide-react";

interface BuilderStatsProps {
  wins: number;
  productsLaunched: number;
  isHarry: boolean;
}

export const BuilderStats = ({ wins, productsLaunched, isHarry }: BuilderStatsProps) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center text-sm">
        <Trophy size={14} className={`mr-1 text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
        <span>{wins || 0} Wins</span>
      </div>
      <div className="flex items-center text-sm">
        <Package size={14} className={`mr-1 text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
        <span>{productsLaunched || 0} Products</span>
      </div>
    </div>
  );
};
