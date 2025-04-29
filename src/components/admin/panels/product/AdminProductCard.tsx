import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertModal, AlertModalAction, AlertModalCancel, AlertModalContent, AlertModalDescription, AlertModalFooter, AlertModalHeader, AlertModalTitle, AlertModalTrigger } from "@/components/ui/AlertModal";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/admin";

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

const AdminProductCard = ({ product, onEdit }: AdminProductCardProps) => {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    toast({
      title: "Product deleted",
      description: "The product has been removed successfully",
    });
  };

  const productTitle = product.title;
  const productDescription = product.shortDescription;
  const productImage = product.image;
  const builderName = product.builderName;
  
  // Ensure techStack is an array
  const techStack = product.techStack || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden border-white/10">
        <div className="h-48 overflow-hidden relative">
          <img
            src={productImage || "/placeholder.svg"}
            alt={productTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className={`${builderName === "Harry" ? "bg-gradient-to-r from-orange-400 to-pink-500" : "bg-gradient-to-r from-teal-400 to-blue-500"}`}>
              {builderName}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{productTitle}</h3>
              <p className="text-muted-foreground line-clamp-2 mb-3">
                {productDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="bg-white/5">
                    {tech}
                  </Badge>
                ))}
                {techStack.length > 3 && (
                  <Badge variant="outline" className="bg-white/5">
                    +{techStack.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(product)}
              >
                <Edit size={16} className="mr-2" />
                Edit
              </Button>
              
              <AlertModal>
                <AlertModalTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </AlertModalTrigger>
                <AlertModalContent className="glass-card border-white/10">
                  <AlertModalHeader>
                    <AlertModalTitle>Delete product</AlertModalTitle>
                    <AlertModalDescription>
                      Are you sure you want to delete "{productTitle}"? This action cannot be undone.
                    </AlertModalDescription>
                  </AlertModalHeader>
                  <AlertModalFooter>
                    <AlertModalCancel className="bg-transparent border-white/20 hover:bg-white/10">Cancel</AlertModalCancel>
                    <AlertModalAction 
                      className="bg-red-500 hover:bg-red-600" 
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </AlertModalAction>
                  </AlertModalFooter>
                </AlertModalContent>
              </AlertModal>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminProductCard;
