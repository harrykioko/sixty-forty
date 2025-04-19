
import { Badge } from "@/components/ui/badge";

export const BuildersSectionHeader = () => {
  return (
    <div className="text-center mb-12">
      <Badge className="mb-2 bg-sixty40-purple text-white">
        The Builders
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 break-words">
        Meet Harry & Marcos
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto break-words">
        we're so half black this just might work
      </p>
    </div>
  );
};
