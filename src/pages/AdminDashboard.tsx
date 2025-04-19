import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";
import AdminAuth from "@/components/admin/AdminAuth";
import { CURRENT_WEEK } from "@/data/mock-data";

const AdminDashboard = () => {
  // DEVELOPMENT MODE: Default to authenticated
  // TODO: REMOVE IN PRODUCTION - Should check Supabase session and admin role
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // DEVELOPMENT MODE: Skip auth check
  // TODO: IN PRODUCTION:
  // 1. Check Supabase session
  // 2. Verify user email in admins table
  // 3. Redirect to login if either check fails
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {isFormOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductForm 
              product={editingProduct} 
              onClose={handleCloseForm} 
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Product Management</h1>
                <p className="text-muted-foreground">
                  Current Week: {CURRENT_WEEK.theme} (Ends {new Date(CURRENT_WEEK.endDate).toLocaleDateString()})
                </p>
              </div>
              <Button 
                onClick={handleAddProduct}
                className="mt-4 md:mt-0 bg-sixty40-purple hover:bg-sixty40-purple/90"
              >
                <Plus size={18} className="mr-2" />
                Add Product
              </Button>
            </div>
            
            <ProductList 
              products={CURRENT_WEEK.products} 
              onEdit={handleEditProduct} 
            />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
