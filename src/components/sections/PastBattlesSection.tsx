import { useState } from "react";
import { ChevronDown, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PastBattleModal from "@/components/ui/PastBattleModal";
import { usePastBattles } from "@/hooks/use-past-battles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BattleCard } from "./past-battles/BattleCard";
import { OlderBattlesList } from "./past-battles/OlderBattlesList";
import { LoadingState } from "./past-battles/LoadingState";
import { ErrorState } from "./past-battles/ErrorState";
import { EmptyState } from "./past-battles/EmptyState";
import { format } from "date-fns";

export const PastBattlesSection = () => {
  const { data: pastBattles, isLoading, error } = usePastBattles();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <section id="archive" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <LoadingState />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="archive" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <ErrorState />
        </div>
      </section>
    );
  }

  if (!pastBattles?.length) {
    return (
      <section id="archive" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <EmptyState />
        </div>
      </section>
    );
  }

  // Get the three most recent battles
  const recentBattles = pastBattles.slice(0, 3);
  // Get the remaining battles
  const olderBattles = pastBattles.slice(3);

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
            <BattleCard
              key={battle.id}
              battle={battle}
              index={index}
              onViewDetails={() => {
                setSelectedWeek(index);
                setIsModalOpen(true);
              }}
            />
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
                <OlderBattlesList
                  battles={olderBattles}
                  onSelectBattle={(index) => {
                    setSelectedWeek(index + 3);
                    setIsModalOpen(true);
                  }}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {selectedWeek !== null && pastBattles[selectedWeek] && (
        <PastBattleModal 
          week={{
            number: pastBattles[selectedWeek].number,
            startDate: format(pastBattles[selectedWeek].startDate, "yyyy-MM-dd"),
            endDate: format(pastBattles[selectedWeek].endDate, "yyyy-MM-dd"),
            theme: pastBattles[selectedWeek].theme || `Week ${pastBattles[selectedWeek].number} Battle`
          }}
          products={pastBattles[selectedWeek].products?.map(product => ({
            name: product.title,
            builder: product.builderName,
            isWinner: product.id === pastBattles[selectedWeek].winnerId,
            imageUrl: product.image || 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2',
            description: product.description || 'Product description will be added soon.',
            longDesc: product.description || 'Product description will be added soon.',
            features: product.features || ['Feature coming soon'],
            techStack: product.techStack || ['Tech stack coming soon'],
            pricing: product.pricing || 'Pricing info coming soon',
            demoUrl: product.demoLink || '#',
            builderNotes: product.builderNotes || 'Builder notes coming soon'
          })) || []}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};
