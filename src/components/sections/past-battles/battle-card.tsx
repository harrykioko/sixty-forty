
import { motion } from "framer-motion";
import { Star, Trophy } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BattleCardProps {
  battle: {
    id: string;
    number: number;
    start_date: string;
    end_date: string;
    winner_id: string;
    products: Array<{
      id: string;
      name: string;
      builders?: {
        name: string;
      };
    }>;
  };
  index: number;
  onViewDetails: () => void;
}

export const BattleCard = ({ battle, index, onViewDetails }: BattleCardProps) => {
  const winner = battle.products?.find(p => p.id === battle.winner_id);
  const runnerUp = battle.products?.find(p => p.id !== battle.winner_id);

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Badge className="mb-2 bg-gray-800/70 text-white">
        {format(new Date(battle.start_date), 'MMM d')} - {format(new Date(battle.end_date), 'MMM d, yyyy')}
      </Badge>
      <h3 className="text-xl font-bold mb-2">Week {battle.number}</h3>
      <div className="space-y-3 mb-4">
        {winner && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-sixty40-purple flex items-center justify-center rounded-full mr-3">
              <Trophy size={16} className="text-white" />
            </div>
            <div>
              <p className="font-medium">{winner.name}</p>
              <p className="text-xs text-muted-foreground">by {winner.builders?.name}</p>
            </div>
          </div>
        )}
        {runnerUp && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full mr-3">
              <Star size={16} className="text-white" />
            </div>
            <div>
              <p className="font-medium">{runnerUp.name}</p>
              <p className="text-xs text-muted-foreground">by {runnerUp.builders?.name}</p>
            </div>
          </div>
        )}
      </div>
      <Button
        variant="outline"
        className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50"
        onClick={onViewDetails}
      >
        View Details
      </Button>
    </motion.div>
  );
};
