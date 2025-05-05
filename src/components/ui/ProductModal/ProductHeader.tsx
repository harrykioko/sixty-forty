import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  title: string;
  builderName: string;
  onClose: () => void;
}

export const ProductHeader = ({ title, builderName, onClose }: ProductHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <Badge className="mb-3 bg-gradient-to-r from-sixty40-purple to-sixty40-blue text-white border-none">
          Built by {builderName}
        </Badge>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          {title}
        </h2>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-white/60 hover:text-white hover:bg-white/10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  );
};
