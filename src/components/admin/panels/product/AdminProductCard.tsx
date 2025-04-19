
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { ProductData } from "@/data/mock-data";

interface AdminProductCardProps {
  product: ProductData;
  onEdit: (product: ProductData) => void;
}

const AdminProductCard = ({ product, onEdit }: AdminProductCardProps) => {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    toast({
      title: "Product deleted",
      description: "The product has been removed successfully",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden border-white/10">
        <div className="h-48 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className={`${product.builderName === "Harry" ? "bg-gradient-to-r from-orange-400 to-pink-500" : "bg-gradient-to-r from-teal-400 to-blue-500"}`}>
              {product.builderName}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-muted-foreground line-clamp-2 mb-3">
                {product.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="bg-white/5">
                    {tech}
                  </Badge>
                ))}
                {product.techStack.length > 3 && (
                  <Badge variant="outline" className="bg-white/5">
                    +{product.techStack.length - 3} more
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
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-card border-white/10">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete product</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{product.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/20 hover:bg-white/10">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-500 hover:bg-red-600" 
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminProductCard;
