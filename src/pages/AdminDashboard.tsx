
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminAuth from "@/components/admin/AdminAuth";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import { WeekManagerPanel } from "@/components/admin/panels/WeekManagerPanel";
import { AdminActionsPanel } from "@/components/admin/panels/AdminActionsPanel";
import { CURRENT_WEEK, ProductData } from "@/data/mock-data";
import { useWeekManager } from "@/hooks/use-week-manager";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  
  const { toast } = useToast();
  const {
    isEditingWeek,
    handleEndVoting,
    handleCreateNewWeek,
    formatDate
  } = useWeekManager(CURRENT_WEEK);

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const handleAddProduct = (builderName: string) => {
    setEditingProduct({ builderName } as ProductData);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: ProductData) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };
  
  const handleEmailSubscribers = () => {
    toast({
      title: "Emails queued",
      description: "Notification emails will be sent to all subscribers."
    });
  };
  
  const handlePublishBattle = () => {
    toast({
      title: "Battle published",
      description: "The current battle is now live on the main site."
    });
  };

  if (isFormOpen) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={() => setIsAuthenticated(false)} />
        <main className="flex-1 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductForm 
              product={editingProduct} 
              onClose={handleCloseForm} 
            />
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <WeekManagerPanel
            currentWeek={CURRENT_WEEK}
            onEndVoting={handleEndVoting}
            onCreateNewWeek={handleCreateNewWeek}
            formatDate={formatDate}
          />
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ProductList
            products={CURRENT_WEEK.products}
            onEdit={handleEditProduct}
          />
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <AdminActionsPanel
            currentWeek={CURRENT_WEEK}
            onEmailSubscribers={handleEmailSubscribers}
            onPublishBattle={handlePublishBattle}
          />
        </motion.section>
      </main>
    </div>
  );
};

export default AdminDashboard;
