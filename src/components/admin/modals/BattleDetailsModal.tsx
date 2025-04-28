import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Edit, Plus } from "lucide-react";
import { Week, Product } from "@/types/admin";
import { StatusTimeline } from "@/components/admin/panels/StatusTimeline";
import { format } from "date-fns";
import { mapSupabaseProduct } from "@/utils/mapSupabase";

interface BattleDetailsModalProps {
  week: Week;
  isOpen: boolean;
  onClose: () => void;
  onEditWeek: () => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export const BattleDetailsModal = ({
  week,
  isOpen,
  onClose,
  onEditWeek,
  onAddProduct,
  onEditProduct
}: BattleDetailsModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
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
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-white"
                  onClick={onClose}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 hover:bg-white/10"
                  onClick={onEditWeek}
                >
                  <Edit size={16} className="mr-2" />
                  Edit Week
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-sixty40-purple/20 text-sixty40-purple border-sixty40-purple/30">
                  Week {week.number}
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  <Calendar size={14} className="mr-2" />
                  {format(new Date(week.startDate), "MMM d")} - {format(new Date(week.endDate), "MMM d, yyyy")}
                </Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {week.status}
                </Badge>
              </div>
            </div>
            
            <div className="bg-black/20 border-b border-white/10 p-4">
              <StatusTimeline currentStatus={week.status} />
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-corner-transparent !scrollbar-w-1.5 !scrollbar-thumb-rounded-full">
              {week.products && week.products.length > 0 ? (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Products ({week.products.length})</h3>
                    <Button 
                      variant="outline"
                      className="border-white/20 hover:bg-white/10"
                      onClick={onAddProduct}
                    >
                      <Plus size={16} className="mr-2" />
                      Add Product
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {week.products.map((product) => (
                      <div 
                        key={product.id}
                        className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => onEditProduct(product)}
                      >
                        <div className="flex items-start gap-4">
                          {product.image ? (
                            <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-black/20">
                              <img 
                                src={product.image} 
                                alt={product.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-black/20 flex items-center justify-center">
                              <span className="text-muted-foreground text-xs">No Image</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <Badge className="mb-2 bg-gray-700">
                              {product.builderName}
                            </Badge>
                            <h4 className="text-lg font-semibold truncate">
                              {product.title}
                            </h4>
                            {product.shortDescription && (
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {product.shortDescription}
                              </p>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="flex-shrink-0"
                          >
                            <Edit size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <h3 className="text-xl font-semibold mb-4">No Products Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start by adding products for this battle week.
                  </p>
                  <Button 
                    className="bg-sixty40-purple hover:bg-sixty40-purple/90"
                    onClick={onAddProduct}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Product
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
