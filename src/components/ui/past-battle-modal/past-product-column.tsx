
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy } from "lucide-react";
import { PastProductColumnProps } from "./types";

export const PastProductColumn = ({ product, className }: PastProductColumnProps) => {
  const isHarry = product.builder.toLowerCase().includes('harry');
  const gradientClass = isHarry 
    ? 'from-sixty40-orange via-sixty40-pink to-red-500'
    : 'from-sixty40-blue via-sixty40-purple to-indigo-500';

  return (
    <div className={`p-6 ${className}`}>
      <div className="relative">
        {product.isWinner && (
          <div className="absolute top-4 right-4 z-20">
            <Badge className={`bg-gradient-to-r ${gradientClass} text-white font-medium px-3 py-1 flex items-center gap-1`}>
              <Trophy size={14} />
              Winner
            </Badge>
          </div>
        )}
        
        <div className="relative h-56 overflow-hidden rounded-t-lg mb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 z-20">
            <Badge className={`mb-2 bg-gradient-to-r ${gradientClass} text-white`}>
              Built by {product.builder}
            </Badge>
            <h3 className="text-2xl font-bold text-white">{product.name}</h3>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">About this Product</h4>
            <p className="text-muted-foreground">{product.longDesc}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">Key Features</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {product.techStack.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="bg-sixty40-dark/40 border-gray-700"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          {product.pricing && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Pricing</h4>
              <p className="text-muted-foreground">{product.pricing}</p>
            </div>
          )}
          
          {product.demoUrl && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Demo</h4>
              <Button
                variant="outline"
                className={`w-full border-2 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent border-opacity-50 hover:bg-white/10 flex items-center justify-center`}
                onClick={() => window.open(product.demoUrl, '_blank')}
              >
                <ExternalLink size={16} className="mr-2 text-white" />
                See Product
              </Button>
            </div>
          )}
          
          {product.builderNotes && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Builder Notes</h4>
              <div className="p-4 bg-sixty40-dark/50 rounded-lg">
                <p className="text-muted-foreground">{product.builderNotes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
