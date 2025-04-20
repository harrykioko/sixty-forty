
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EmptyStateModal = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg"
      >
        <Card className="glass-card border-white/10 overflow-hidden">
          <div className="p-8 text-center space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sixty40-purple to-sixty40-blue">
              build bruh
            </h2>
            <p className="text-lg text-muted-foreground">
              Start by creating a new battle week and adding some products.
            </p>
            <div className="flex justify-center">
              <Button 
                className="bg-sixty40-purple hover:bg-sixty40-purple/90"
                size="lg"
                onClick={() => {}}
              >
                Create Battle Week
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
