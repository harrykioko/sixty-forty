import { Trophy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "./Types";

interface PastProductColumnProps {
  product: Product;
  className?: string;
}

export const PastProductColumn = ({ product, className = "" }: PastProductColumnProps) => {
  return (
    <div className={`p-6 ${className}`}>
      {/* Builder Info */}
      <div className="flex items-center gap-3 mb-4">
        {product.builderAvatar && (
          <img
            src={product.builderAvatar}
            alt={product.builder}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <h3 className="font-medium text-lg">{product.builder}</h3>
          {product.isWinner && (
            <div className="flex items-center gap-1 text-sixty40-purple">
              <Trophy size={14} />
              <span className="text-sm">Winner</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-xl mb-2">{product.name}</h4>
          <p className="text-white/80">{product.description}</p>
        </div>

        {/* Product Image */}
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {product.demoUrl && (
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10"
              onClick={() => window.open(product.demoUrl, '_blank')}
            >
              <ExternalLink size={14} className="mr-2" />
              View Demo
            </Button>
          )}
          {product.githubUrl && (
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10"
              onClick={() => window.open(product.githubUrl, '_blank')}
            >
              <ExternalLink size={14} className="mr-2" />
              View Code
            </Button>
          )}
        </div>

        {/* Votes */}
        {product.votes !== undefined && (
          <div className="text-sm text-white/60">
            {product.votes} votes
          </div>
        )}
      </div>
    </div>
  );
}; 