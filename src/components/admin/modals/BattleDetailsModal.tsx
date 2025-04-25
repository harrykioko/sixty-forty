
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Edit, Plus } from "lucide-react";
import { Week, Product } from "@/types/admin";
import { StatusTimeline } from "@/components/admin/panels/StatusTimeline";
import { PastProductData } from "@/components/ui/past-battle-modal/types";
import { format } from "date-fns";

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
  // Convert admin products to the format expected by PastProductColumn
  const formatProducts = (products: Product[]): PastProductData[] => {
    return products.map(product => ({
      name: product.name || product.title || "",
      builder: product.builders?.name || product.builderName || "",
      isWinner: product.id === week.winnerId,
      imageUrl: product.image_url || product.image || "",
      longDesc: product.short_desc || "",
      features: product.tech_stack || [],
      techStack: product.tech_stack || [],
      pricing: "",
      demoUrl: "",
      builderNotes: ""
    }));
  };

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
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-sixty40-purple text-white">
                      <Calendar size={14} className="mr-1" />
                      Week {week.number}
                    </Badge>
                    <Badge variant="outline" className="bg-sixty40-dark/30 border-white/20">
                      {format(week.startDate, "MMM d")} - {format(week.endDate, "MMM d, yyyy")}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Battle #{week.number} Details</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-white/20 hover:bg-white/10"
                    onClick={onClose}
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  <Button
                    className="bg-sixty40-purple hover:bg-sixty40-purple/90"
                    onClick={onEditWeek}
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Week
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Status Timeline */}
            <div className="bg-black/20 border-b border-white/10 p-4">
              <StatusTimeline currentStatus={week.status} />
            </div>
            
            {/* Product Section */}
            <div className="flex-1 overflow-y-auto">
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
                    {week.products.map(product => (
                      <div 
                        key={product.id}
                        className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => onEditProduct(product)}
                      >
                        <div className="flex items-start gap-4">
                          {product.image_url || product.image ? (
                            <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-black/20">
                              <img 
                                src={product.image_url || product.image} 
                                alt={product.name || product.title || "Product"} 
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
                              {product.builders?.name || product.builderName || "Unknown Builder"}
                            </Badge>
                            <h4 className="text-lg font-semibold truncate">
                              {product.name || product.title || "Untitled Product"}
                            </h4>
                            {product.short_desc && (
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {product.short_desc}
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
