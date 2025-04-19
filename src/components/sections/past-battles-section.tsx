import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, ChevronDown, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PastBattleModal from "@/components/ui/past-battle-modal";
import { usePastBattles } from "@/hooks/use-past-battles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

export const PastBattlesSection = () => {
  const { data: pastBattles, isLoading, error } = usePastBattles();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the three most recent battles
  const recentBattles = pastBattles?.slice(0, 3) ?? [];
  // Get the remaining battles
  const olderBattles = pastBattles?.slice(3) ?? [];

  const BattleCard = ({ battle, index }: { battle: any; index: number }) => {
    const winner = battle.products?.find(p => p.id === battle.winner_id);
    const runnerUp = battle.products?.find(p => p.id !== battle.winner_id);

    return (
      <motion.div
        key={battle.id}
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
          onClick={() => {
            setSelectedWeek(index);
            setIsModalOpen(true);
          }}
        >
          View Details
        </Button>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <section id="archive" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-sixty40-blue text-white animate-pulse">
              Loading...
            </Badge>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="archive" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-destructive text-white">
              Error loading past battles
            </Badge>
          </div>
        </div>
      </section>
    );
  }

  if (!pastBattles?.length) {
    return (
      <section id="archive" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-sixty40-blue text-white">
              Archive
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Previous Battles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No past battles yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="archive" className="py-16 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <Badge className="mb-2 bg-sixty40-blue text-white">
            Archive
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Previous Battles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out some of the past competitions and see who emerged victorious.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentBattles.map((battle, index) => (
            <BattleCard key={battle.id} battle={battle} index={index} />
          ))}
        </div>

        {olderBattles.length > 0 && (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative px-6 border-sixty40-purple text-sixty40-purple transition-all duration-300 hover:bg-transparent hover:border-transparent hover:text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-sixty40-purple before:to-sixty40-blue before:opacity-0 hover:before:opacity-100 before:transition-opacity before:rounded-md before:-z-10"
                >
                  <History className="mr-2" />
                  View All Past Battles
                  <ChevronDown className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[320px] bg-black/90 backdrop-blur-sm border border-white/10"
                align="center"
              >
                <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
                  {olderBattles.map((battle, index) => (
                    <div 
                      key={battle.id}
                      className="p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedWeek(index + 3);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="bg-sixty40-dark/30 border-white/20">
                          {format(new Date(battle.start_date), 'MMM d')} - {format(new Date(battle.end_date), 'MMM d, yyyy')}
                        </Badge>
                        <Badge className="bg-sixty40-purple/20 text-sixty40-purple border border-sixty40-purple/30">
                          Week {battle.number}
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1">
                        {battle.products?.find(p => p.id === battle.winner_id)?.name || 'Unknown Winner'}
                      </h4>
                      <div className="text-sm text-muted-foreground">
                        Winner: {battle.products?.find(p => p.id === battle.winner_id)?.builders?.name || 'Unknown'}
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {selectedWeek !== null && pastBattles[selectedWeek] && (
        <PastBattleModal 
          week={{
            number: pastBattles[selectedWeek].number,
            startDate: pastBattles[selectedWeek].start_date,
            endDate: pastBattles[selectedWeek].end_date,
            theme: `Week ${pastBattles[selectedWeek].number} Battle`
          }}
          products={pastBattles[selectedWeek].products.map(product => ({
            name: product.name,
            builder: product.builders?.name || 'Unknown',
            isWinner: product.id === pastBattles[selectedWeek].winner_id,
            imageUrl: product.image_url || 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2',
            longDesc: 'Product description will be added soon.',
            features: ['Feature coming soon'],
            techStack: ['Tech stack coming soon'],
            pricing: 'Pricing info coming soon',
            demoUrl: '#',
            builderNotes: 'Builder notes coming soon'
          }))}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};
