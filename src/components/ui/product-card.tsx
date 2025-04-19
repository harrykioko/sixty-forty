
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ProductProps {
  id: string;
  title: string;
  builderName: string;
  shortDescription: string;
  image: string;
  techStack: string[];
  onClick: () => void;
}

export const ProductCard = ({
  title,
  builderName,
  shortDescription,
  image,
  techStack,
  onClick,
}: ProductProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isHarry = builderName.toLowerCase().includes('harry');
  const gradientClass = isHarry 
    ? 'from-sixty40-orange via-sixty40-pink to-red-500'
    : 'from-sixty40-blue via-sixty40-purple to-indigo-500';

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div 
        className="glass-card glass-card-hover h-full flex flex-col overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <div className="relative w-full h-48 overflow-hidden">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-b ${gradientClass} opacity-20 z-10`}
            animate={{ opacity: isHovered ? 0.3 : 0.2 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-sixty40-dark/80 z-10"
            animate={{ opacity: isHovered ? 0.7 : 0.5 }}
          />
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-3 left-3 z-20">
            <Badge className={`bg-gradient-to-r ${gradientClass} text-white font-medium animate-pulse-slow`}>
              {builderName}
            </Badge>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">
            {shortDescription}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.slice(0, 3).map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="text-xs bg-gray-800/50 border-gray-700"
              >
                {tech}
              </Badge>
            ))}
            {techStack.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs bg-gray-800/50 border-gray-700"
              >
                +{techStack.length - 3} more
              </Badge>
            )}
          </div>
          
          <Button 
            variant="outline" 
            className={`w-full border-2 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent border-opacity-50 hover:bg-white/10`}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
