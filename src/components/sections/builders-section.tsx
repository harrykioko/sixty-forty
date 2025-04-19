
import { useBuilderStats } from "@/hooks/use-builder-stats";
import { BuilderCard } from "./builders/builder-card";
import { BuildersSectionHeader } from "./builders/section-header";

export const BuildersSection = () => {
  const { data: builderStats = [], isLoading, error } = useBuilderStats();

  if (isLoading) {
    return (
      <section id="builders" className="py-16 px-4 bg-black/20">
        <div className="container mx-auto max-w-screen-xl">
          <BuildersSectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[0, 1].map((index) => (
              <div key={index} className="glass-card p-6 animate-pulse">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="w-32 h-32 mx-auto md:w-full md:h-48 bg-gray-700/50 rounded-lg" />
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="h-8 bg-gray-700/50 rounded w-1/3" />
                    <div className="h-4 bg-gray-700/50 rounded w-full" />
                    <div className="h-4 bg-gray-700/50 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="builders" className="py-16 px-4 bg-black/20">
        <div className="container mx-auto max-w-screen-xl text-center">
          <p className="text-red-500">Failed to load builder data</p>
        </div>
      </section>
    );
  }

  return (
    <section id="builders" className="py-16 px-4 bg-black/20">
      <div className="container mx-auto max-w-screen-xl">
        <BuildersSectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {builderStats.map((stats, index) => (
            <BuilderCard 
              key={stats.builder?.name || index} 
              stats={stats} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
