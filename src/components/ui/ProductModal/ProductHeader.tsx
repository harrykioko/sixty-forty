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
    <div className="flex items-center justify-between mb-6">
      <div>
        <Badge className="mb-2 bg-sixty40-purple text-white">
          Built by {builderName}
        </Badge>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-white/60 hover:text-white"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  );
};
