
import { BUILDERS } from "@/data/mock-data";
import { BuilderCard } from "./builders/builder-card";
import { BuildersSectionHeader } from "./builders/section-header";

export const BuildersSection = () => {
  return (
    <section id="builders" className="py-16 px-4 bg-black/20">
      <div className="container mx-auto max-w-screen-xl">
        <BuildersSectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BUILDERS.map((builder, index) => (
            <BuilderCard key={builder.name} builder={builder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
