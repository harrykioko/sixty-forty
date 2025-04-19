
import { Badge } from "@/components/ui/badge";

export const LoadingState = () => {
  return (
    <div className="text-center mb-12">
      <Badge className="mb-2 bg-sixty40-blue text-white animate-pulse">
        Loading...
      </Badge>
    </div>
  );
};
