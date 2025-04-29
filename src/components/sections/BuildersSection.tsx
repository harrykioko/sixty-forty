
import { useBuilderStats } from "@/hooks/use-builder-stats";
import { BuilderCard } from "./builders/builder-card";
import { BuildersSectionHeader } from "./builders/section-header";

export const BuildersSection = () => {
  const { data: builderStats = [], isLoading, error } = useBuilderStats();

  // If loading, show loading state
  if (isLoading) {
    return (
      <section id="builders" className="py-16 px-4 bg-black/20">
        <div className="container mx-auto max-w-screen-xl">
          <BuildersSectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 h-64 animate-pulse" />
            <div className="glass-card p-6 h-64 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <section id="builders" className="py-16 px-4 bg-black/20">
        <div className="container mx-auto max-w-screen-xl">
          <BuildersSectionHeader />
          <div className="glass-card p-6 text-center">
            <p className="text-red-400">Failed to load builder information</p>
          </div>
        </div>
      </section>
    );
  }

  // If no builders, show empty state
  if (!builderStats.length) {
    return (
      <section id="builders" className="py-16 px-4 bg-black/20">
        <div className="container mx-auto max-w-screen-xl">
          <BuildersSectionHeader />
          <div className="glass-card p-6 text-center">
            <p className="text-muted-foreground">No builders available at the moment</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="builders" className="py-16 px-4 bg-black/20">
      <div className="container mx-auto max-w-screen-xl">
        <BuildersSectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {builderStats.map((builderStat, index) => (
            <BuilderCard 
              key={builderStat.id} 
              builder={{...builderStat, index}}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
