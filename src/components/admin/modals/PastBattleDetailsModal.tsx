import { motion, AnimatePresence } from "framer-motion";
import { X, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Week } from "@/types/admin";
import { format } from "date-fns";

interface PastBattleDetailsModalProps {
  week: Week;
  onClose: () => void;
  onEdit: () => void;
}

export const PastBattleDetailsModal = ({ week, onClose, onEdit }: PastBattleDetailsModalProps) => {
  const winner = week.products?.find(p => p.id === week.winnerId);
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-corner-transparent !scrollbar-w-1.5 !scrollbar-thumb-rounded-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Week {week.number} Battle
                </h2>
                <p className="text-white/60 mt-1">
                  {format(week.startDate, 'MMM d')} – {format(week.endDate, 'MMM d, yyyy')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  className="border-white/20 hover:bg-white/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Battle
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Winner Section */}
            {winner && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Winner</h3>
                <Card className="bg-white/5 border-white/10 overflow-hidden">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={winner.image}
                      alt={winner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-sixty40-blue/20 text-white/80">
                        Winner
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold mb-1">{winner.title}</h4>
                        <Badge className="bg-white/10 text-white/80">
                          {winner.builderName}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-white/60 mb-4">
                      {winner.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {winner.techStack?.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-white/5">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* All Products Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">All Entries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {week.products?.map((product) => (
                  <Card
                    key={product.id}
                    className={`bg-white/5 border-white/10 overflow-hidden ${
                      product.id === week.winnerId ? 'ring-2 ring-sixty40-blue' : ''
                    }`}
                  >
                    <div className="h-32 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      {product.id === week.winnerId && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-sixty40-blue/20 text-white/80">
                            Winner
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-1">{product.title}</h4>
                      <Badge className="bg-white/10 text-white/80 mb-2">
                        {product.builderName}
                      </Badge>
                      <p className="text-white/60 text-sm line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-white/40 text-sm">Total Entries</p>
                  <p className="text-2xl font-bold">{week.products?.length || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-sm">Total Votes</p>
                  <p className="text-2xl font-bold">{week.totalVotes || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-sm">Battle Duration</p>
                  <p className="text-2xl font-bold">
                    {Math.ceil((week.endDate.getTime() - week.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-sm">Status</p>
                  <p className="text-2xl font-bold capitalize">{week.status}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 