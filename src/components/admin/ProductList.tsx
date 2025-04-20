
import { Product } from "@/types/admin";
import AdminProductCard from "./panels/product/AdminProductCard";
import EmptyProductList from "./panels/product/EmptyProductList";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductList = ({ products, onEdit }: ProductListProps) => {
  if (!products || products.length === 0) {
    return <EmptyProductList />;
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
