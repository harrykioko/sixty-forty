
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PREVIOUS_WEEKS } from "@/data/mock-data";

export const PastBattlesSection = () => {
  return (
    <section id="archive" className="py-16 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <Badge className="mb-2 bg-sixty40-blue text-white">
            Archive
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Previous Battles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out some of the past competitions and see who emerged victorious.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PREVIOUS_WEEKS.map((week, index) => (
            <motion.div
              key={week.id}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-2 bg-gray-800/70 text-white">
                {week.date}
              </Badge>
              <h3 className="text-xl font-bold mb-2">{week.theme}</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-sixty40-purple flex items-center justify-center rounded-full mr-3">
                    <Trophy size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{week.winner}</p>
                    <p className="text-xs text-muted-foreground">Winner</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full mr-3">
                    <Star size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{week.runnerUp}</p>
                    <p className="text-xs text-muted-foreground">Runner Up</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50"
              >
                View Details
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-sixty40-purple text-sixty40-purple hover:bg-sixty40-purple/10"
          >
            View All Past Battles
          </Button>
        </div>
      </div>
    </section>
  );
};
