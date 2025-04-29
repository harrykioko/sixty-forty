import { Product } from "@/types/admin";
import AdminProductCard from "./panels/product/AdminProductCard";
import EmptyProductList from "./panels/product/EmptyProductList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onAddProduct?: () => void;
}

const ProductList = ({ products, onEdit, onAddProduct }: ProductListProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <h3 className="text-2xl font-medium text-center">No products yet</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Add a new product to get started with this week's battle
        </p>
        {onAddProduct && (
          <Button
            onClick={onAddProduct}
            className="bg-sixty40-blue hover:bg-sixty40-blue/90 text-white px-6 py-3 rounded-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </Button>
        )}
      </div>
    );
  }

  if (products.length === 1) {
    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-2xl">
          <AdminProductCard
            product={products[0]}
            onEdit={onEdit}
          />
        </div>
        {onAddProduct && (
          <Button
            onClick={onAddProduct}
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Another Product
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {products.map((product) => (
        <AdminProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ProductList;
