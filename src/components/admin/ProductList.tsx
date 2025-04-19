
import { ProductData } from "@/data/mock-data";
import AdminProductCard from "./panels/product/AdminProductCard";
import EmptyProductList from "./panels/product/EmptyProductList";

interface ProductListProps {
  products: ProductData[];
  onEdit: (product: ProductData) => void;
}

const ProductList = ({ products, onEdit }: ProductListProps) => {
  if (products.length === 0) {
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
