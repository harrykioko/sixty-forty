
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
            className="absolute inset-0 bg-gradient-to-b from-transparent to-sixty40-dark/80 z-10"
            animate={{ opacity: isHovered ? 0.7 : 0.5 }}
          />
          <motion.div
            className="absolute inset-0 bg-sixty40-purple/20 z-10"
            animate={{ opacity: isHovered ? 0.3 : 0 }}
          />
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-3 left-3 z-20">
            <Badge className="bg-sixty40-purple text-white font-medium">
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
            className="w-full border-sixty40-purple/50 text-sixty40-purple hover:bg-sixty40-purple/10"
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
