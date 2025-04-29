import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, ExternalLink } from "lucide-react";
import type { PastBattleModalProps } from "@/components/ui/PastBattleModal/Types";
import { PastProductColumn } from "@/components/ui/PastBattleModal/PastProductColumn";

export const PastBattleModal = ({
  week,
  products,
  isOpen,
  onClose
}: PastBattleModalProps) => {
  // Format date range for display
  const formatDateRange = () => {
    const startDate = new Date(week.startDate);
    const endDate = new Date(week.endDate);
    return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}–${endDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}, ${endDate.getFullYear()}`;
  };

  // Get winner and runner-up products
  const winnerProduct = products.find(product => product.isWinner) || products[0];
  const runnerUpProduct = products.find(product => !product.isWinner) || products[1];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-sixty40-purple text-white">
                    <Calendar size={14} className="mr-1" />
                    Week {week.number}
                  </Badge>
                  {week.theme && (
                    <Badge variant="outline" className="bg-sixty40-dark/30 border-white/20">
                      {week.theme}
                    </Badge>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Battle Results — {formatDateRange()}
                </h2>
              </div>
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/10"
                onClick={onClose}
              >
                Close
              </Button>
            </div>

            {/* Products Comparison Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Harry's Product (left or top) */}
                <PastProductColumn 
                  product={products.find(p => p.builder.toLowerCase().includes('harry')) || products[0]} 
                  className="md:w-1/2"
                />
                
                {/* Marcos's Product (right or bottom) */}
                <PastProductColumn 
                  product={products.find(p => p.builder.toLowerCase().includes('marcos')) || products[1]} 
                  className="md:w-1/2"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PastBattleModal; 