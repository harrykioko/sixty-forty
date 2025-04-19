
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BUILDERS } from "@/data/mock-data";

export const BuildersSection = () => {
  return (
    <section id="builders" className="py-16 px-4 bg-black/20">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <Badge className="mb-2 bg-sixty40-purple text-white">
            The Builders
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Harry & Marcos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            we're so half black this just might work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BUILDERS.map((builder, index) => (
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
                  <h3 className="text-2xl font-bold mb-2">{builder.name}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Trophy size={16} className="text-sixty40-purple mr-1" />
                      <span className="text-sm">{builder.wins} Wins</span>
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="text-sixty40-blue mr-1" />
                      <span className="text-sm">{builder.products} Products</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{builder.bio}</p>
                  <div className="flex gap-2">
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
                        >
                          {platform}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
