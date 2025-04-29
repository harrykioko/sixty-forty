
import { Badge } from "@/components/ui/badge";

interface ProductHeaderProps {
  image: string;
  title: string;
  builderName: string;
}

export const ProductHeader = ({ image, title, builderName }: ProductHeaderProps) => {
  return (
    <div className="relative">
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
