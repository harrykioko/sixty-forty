
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderStats } from "@/hooks/use-builder-stats";

// Create a type definition based on the actual structure in the mock data
interface BuilderProps {
  name: string;
  avatar: string;
  bio: string;
  wins: number;
  products: number;
  socialLinks: Record<string, string>;
}

interface BuilderCardProps {
  builder: BuilderProps;
  index: number;
}

export const BuilderCard = ({ builder, index }: BuilderCardProps) => {
  const { data: builderStats = [], isLoading, error } = useBuilderStats();
  
  // Find the stats for this builder
  const stats = builderStats.find(
    (stat: any) => stat.builder?.name.toLowerCase().includes(builder.name.toLowerCase())
  );

  // If there's an error, show it
  if (error) {
    return (
      <div className="glass-card p-6 text-red-500">
        Error loading builder stats
      </div>
    );
  }

  return (
    <motion.div
      key={builder.name}
      className="glass-card p-6"
      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative w-32 h-32 mx-auto md:w-full md:h-48 overflow-hidden rounded-lg">
            <img
              src={builder.avatar}
              alt={builder.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <h3 className="text-2xl font-bold mb-2 break-words">{builder.name}</h3>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center whitespace-nowrap">
              <Trophy size={16} className="text-sixty40-purple mr-1 flex-shrink-0" />
              <span className="text-sm">
                {isLoading ? "Loading..." : stats?.wins || 0} Wins
              </span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Star size={16} className="text-sixty40-blue mr-1 flex-shrink-0" />
              <span className="text-sm">
                {isLoading ? "Loading..." : stats?.products_launched || 0} Products
              </span>
            </div>
          </div>
          <p className="text-muted-foreground mb-4 break-words line-clamp-4 md:line-clamp-none">
            {builder.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(builder.socialLinks).map(([platform, link]) => (
              <Button
                key={platform}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-white"
                asChild
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap"
                >
                  {platform}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

