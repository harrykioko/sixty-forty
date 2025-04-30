import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { useBuilderStats } from "@/hooks/use-builder-stats";
import { useCurrentBattle } from "@/hooks/use-current-battle";
import { BattleLoadingState } from "./battle-states/LoadingState";
import { BattleErrorState } from "./battle-states/ErrorState";
import { BattleEmptyState } from "./battle-states/EmptyState";
import { BattleHeader } from "./BattleHeader";
import { BuilderProfileCard } from "./BuilderProfileCard";
import { BattleActions } from "./BattleActions";
import { BuilderStatsProps } from "@/components/sections/builders/BuilderCard";
import { Product } from "@/types/admin";

export const BattleCard = () => {
  const { data: builderStats = [] } = useBuilderStats<BuilderStatsProps[]>();
  const { data: battleData, isLoading, error } = useCurrentBattle();
  
  console.log('Builder Stats:', builderStats);
  
  if (isLoading) {
    return <BattleLoadingState />;
  }

  if (error) {
    return <BattleErrorState />;
  }

  if (!battleData?.currentWeek) {
    return <BattleEmptyState />;
  }

  const isBattleActive = battleData.currentWeek.status === 'active';
  const isBuilding = battleData.isBuildingPhase || battleData.currentWeek.status === 'draft';

  // Find Harry and Marcos stats by their builder_ids from the products
  const getBuilderStats = (product: Product): BuilderStatsProps | undefined => {
    return builderStats.find(stat => stat.builder_id === product.builder_id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="order-first lg:order-last"
    >
      <div className="relative">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${isBattleActive ? 'from-sixty40-purple/50 to-sixty40-blue/50' : 'from-sixty40-purple to-sixty40-blue'} rounded-lg blur opacity-75`}></div>
        <div className="relative glass-card p-6 md:p-8 rounded-lg overflow-hidden backdrop-blur-md bg-black/20 border border-white/10">
          <BattleHeader 
            weekNumber={battleData.currentWeek.number}
            isBattleActive={isBattleActive}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {battleData.products?.length > 0 ? (
              battleData.products.map((product) => {
                const isHarry = product.builderName.toLowerCase().includes('harry');
                const stats = getBuilderStats(product);
                
                return (
                  <BuilderProfileCard
                    key={product.id}
                    name={stats?.builder?.name || product.builderName}
                    avatar_url={stats?.builder?.avatar_url}
                    tagline={stats?.builder?.tagline}
                    wins={stats?.wins || 0}
                    products_launched={stats?.products_launched || 0}
                    product={isBattleActive ? { name: product.title } : null}
                    isHarry={isHarry}
                    isBattleActive={isBattleActive}
                  />
                );
              })
            ) : (
              // Fallback when no products are available
              builderStats.map((stats) => (
                <BuilderProfileCard
                  key={stats.id}
                  name={stats.builder?.name || ''}
                  avatar_url={stats.builder?.avatar_url}
                  tagline={stats.builder?.tagline}
                  wins={stats.wins}
                  products_launched={stats.products_launched}
                  product={null}
                  isHarry={stats.builder?.name?.toLowerCase().includes('harry') || false}
                  isBattleActive={false}
                />
              ))
            )}
          </div>
          
          <BattleActions 
            isBattleActive={isBattleActive}
            isBuilding={isBuilding}
            endDate={battleData.currentWeek.endDate.toISOString()}
          />
        </div>
      </div>
    </motion.div>
  );
};
