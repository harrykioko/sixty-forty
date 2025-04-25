
import { Trophy, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PastProductColumnProps } from "./types";

export const PastProductColumn = ({ product, className = "" }: PastProductColumnProps) => {
  return (
    <div className={`p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {product.isWinner && (
          <div className="flex items-center px-3 py-1.5 bg-sixty40-purple/20 text-sixty40-purple rounded-full">
            <Trophy size={16} className="mr-2" />
            <span className="text-sm font-medium">Winner</span>
          </div>
        )}
        <Badge className="bg-gray-700">{product.builder}</Badge>
      </div>
      
      <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
      
      <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-black/30">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">About</h4>
        <p className="text-muted-foreground">{product.longDesc}</p>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Features</h4>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {product.techStack.map((tech, index) => (
            <Badge key={index} variant="outline" className="bg-black/20">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
      
      {product.pricing && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Pricing</h4>
          <p className="text-muted-foreground">{product.pricing}</p>
        </div>
      )}
      
      {product.builderNotes && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Builder Notes</h4>
          <div className="p-3 bg-black/20 rounded-md text-muted-foreground">
            {product.builderNotes}
          </div>
        </div>
      )}
      
      {product.demoUrl && (
        <Button 
          variant="outline" 
          className="w-full mt-2 border-white/10"
          onClick={() => window.open(product.demoUrl, '_blank')}
        >
          <ExternalLink size={16} className="mr-2" />
          Visit Live Demo
        </Button>
      )}
    </div>
  );
};
