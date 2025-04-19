
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProductHeaderProps {
  image: string;
  title: string;
  builderName: string;
  onClose: () => void;
}

export const ProductHeader = ({ image, title, builderName, onClose }: ProductHeaderProps) => {
  return (
    <div className="relative">
      <button
        className="absolute top-4 right-4 z-10 text-white bg-black/30 hover:bg-black/50 p-1.5 rounded-full transition-colors"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-6 z-20">
          <Badge className="mb-2 bg-sixty40-purple text-white">
            Built by {builderName}
          </Badge>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
      </div>
    </div>
  );
};
