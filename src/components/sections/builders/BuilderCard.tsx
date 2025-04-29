
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuilderStatsProps {
  id: string;
  builder_id: string;
  wins: number;
  products_launched: number;
  builder?: {
    name: string;
    avatar_url?: string | null;
    tagline?: string | null;
    slug?: string;
  };
  index: number;
}

export const BuilderCard = ({ builder, index }: { builder: BuilderStatsProps, index: number }) => {
  if (!builder.builder) {
    return null;
  }

  // Extract social links based on builder name
  // In a real app, these would come from the database
  const socialLinks = {
    twitter: `https://x.com/${builder.builder.name === "Harry" ? "hnkioko" : "mjdymond"}`,
    instagram: `https://www.instagram.com/${builder.builder.name === "Harry" ? "harrykioko" : "mjdymond"}/`,
    linkedin: `https://www.linkedin.com/in/${builder.builder.name === "Harry" ? "harrisonkioko" : "mjdymond"}/`
  };

  return (
    <motion.div
      key={builder.id}
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
              src={builder.builder.avatar_url || "/placeholder.svg"}
              alt={builder.builder.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <h3 className="text-2xl font-bold mb-2 break-words">{builder.builder.name}</h3>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center whitespace-nowrap">
              <Trophy size={16} className="text-sixty40-purple mr-1 flex-shrink-0" />
              <span className="text-sm">
                {builder.wins} Wins
              </span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Star size={16} className="text-sixty40-blue mr-1 flex-shrink-0" />
              <span className="text-sm">
                {builder.products_launched} Products
              </span>
            </div>
          </div>
          <p className="text-muted-foreground mb-4 break-words line-clamp-4 md:line-clamp-none">
            {builder.builder.tagline || `${builder.builder.name} is a builder in the Sixty40 battles.`}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(socialLinks).map(([platform, link]) => (
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
