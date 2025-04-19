
import { Badge } from "@/components/ui/badge";

export const ErrorState = () => {
  return (
    <div className="text-center mb-12">
      <Badge className="mb-2 bg-destructive text-white">
        Error loading past battles
      </Badge>
    </div>
  );
};
