
import { Badge } from "@/components/ui/badge";

export const EmptyState = () => {
  return (
    <div className="text-center mb-12">
      <Badge className="mb-2 bg-sixty40-purple text-white text-xl">
        Paradigm shifting shit is imminent
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Battle Archive
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Stay tuned for epic product showdowns that will redefine innovation.
      </p>
    </div>
  );
};
