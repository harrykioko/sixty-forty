
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { useBuilderStats } from "@/hooks/use-builder-stats";
import { useCurrentBattle } from "@/hooks/use-current-battle";
import { BattleLoadingState } from "./battle-states/loading-state";
import { BattleErrorState } from "./battle-states/error-state";
import { BattleEmptyState } from "./battle-states/empty-state";
import { BattleHeader } from "./battle-header";
import { BuilderProfileCard } from "./builder-profile-card";
import { BattleActions } from "./battle-actions";

export const BattleCard = () => {
  const { data: builderStats = [] } = useBuilderStats();
  const { data: battleData, isLoading, error } = useCurrentBattle();
  
  const isBattleActive = battleData?.currentWeek?.status === 'active';

  if (isLoading) {
    return <BattleLoadingState />;
  }

  if (error) {
    return <BattleErrorState />;
  }

  if (!battleData?.currentWeek || !battleData?.products?.length) {
    return <BattleEmptyState />;
  }

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
            {battleData.products.map((product) => {
              const isHarry = product.builders?.name.toLowerCase().includes('harry');
              const stats = builderStats.find(
                (stat: any) => stat.builder?.name.toLowerCase().includes(isHarry ? 'harry' : 'marcos')
              );
              
              return (
                <BuilderProfileCard
                  key={product.id}
                  name={product.builders?.name || ''}
                  avatar_url={product.builders?.avatar_url}
                  tagline={stats?.builder?.tagline}
                  wins={stats?.wins || 0}
                  products_launched={stats?.products_launched || 0}
                  product={isBattleActive ? { name: product.name } : null}
                  isHarry={isHarry}
                  isBattleActive={isBattleActive}
                />
              );
            })}
          </div>
          
          <BattleActions 
            isBattleActive={isBattleActive}
            endDate={battleData.currentWeek.end_date}
          />
        </div>
      </div>
    </motion.div>
  );
};
