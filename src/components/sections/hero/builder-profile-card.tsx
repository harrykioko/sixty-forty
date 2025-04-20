
import { motion } from "framer-motion";
import { Trophy, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuilderProfile {
  name: string;
  avatar_url?: string | null;
  tagline?: string;
  wins?: number;
  products_launched?: number;
  product?: {
    name: string;
    url?: string;
  } | null;
  isHarry: boolean;
  isBuildPhase: boolean;
}

export const BuilderProfileCard = ({ 
  name, 
  avatar_url, 
  tagline, 
  wins = 0, 
  products_launched = 0,
  product,
  isHarry,
  isBuildPhase
}: BuilderProfile) => {
  const gradientClass = isHarry 
    ? `from-sixty40-orange${isBuildPhase ? '/40' : ''} via-sixty40-pink${isBuildPhase ? '/40' : ''} to-red-500${isBuildPhase ? '/40' : ''}`
    : `from-sixty40-blue${isBuildPhase ? '/40' : ''} via-sixty40-purple${isBuildPhase ? '/40' : ''} to-indigo-500${isBuildPhase ? '/40' : ''}`;

  return (
    <motion.div 
      className="relative glass-card p-4 rounded-lg bg-black/20 border border-white/10 flex flex-col items-center"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mb-3">
        <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${gradientClass} blur-sm opacity-70`}></div>
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
          {avatar_url ? (
            <img
              src={avatar_url}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-lg font-semibold text-white">
                {name?.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="font-bold text-xl">{name}</h3>
      <p className="text-xs text-muted-foreground italic mb-3">
        {tagline || (isHarry ? "Puts the VC into vibe coding" : "Speed. Sass. SaaS.")}
      </p>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center text-sm">
          <Trophy size={14} className={`mr-1 text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
          <span>{wins} Wins</span>
        </div>
        <div className="flex items-center text-sm">
          <Package size={14} className={`mr-1 text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
          <span>{products_launched} Products</span>
        </div>
      </div>
      
      {!isBuildPhase && product?.name && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full text-sm font-medium bg-gradient-to-r ${gradientClass} bg-opacity-10 backdrop-blur-sm border border-white/10`}
          >
            <Package size={14} className={`text-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}`} />
            <span>{product.name}</span>
          </motion.div>
          
          <Button
            size="sm"
            variant="outline"
            className={`w-full mt-2 border border-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}/50 hover:bg-${isHarry ? 'sixty40-orange' : 'sixty40-blue'}/10`}
            asChild
          >
            <a href="#vote-now">
              View Product
              <ExternalLink size={14} className="ml-2" />
            </a>
          </Button>
        </>
      )}
    </motion.div>
  );
};
