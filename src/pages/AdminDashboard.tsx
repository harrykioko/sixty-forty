
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminAuth from "@/components/admin/AdminAuth";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import { WeekManagerPanel } from "@/components/admin/panels/WeekManagerPanel";
import { AdminActionsPanel } from "@/components/admin/panels/AdminActionsPanel";
import { useCurrentBattle } from "@/hooks/use-current-battle";
import { EmptyStateModal } from "@/components/admin/panels/EmptyStateModal";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { toast } = useToast();
  const { data: battleData, isLoading, error } = useCurrentBattle();

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={() => setIsAuthenticated(false)} />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sixty40-purple"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    toast({
      title: "Error loading data",
      description: "Please try again later",
      variant: "destructive",
    });
  }

  if (!battleData?.currentWeek) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={() => setIsAuthenticated(false)} />
        <EmptyStateModal />
      </div>
    );
  }

  const handleAddProduct = (builderName: string) => {
    setEditingProduct({ builderName } as any);
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
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <AnimatePresence>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WeekManagerPanel
              currentWeek={battleData.currentWeek}
              onEndVoting={() => {}}
              onCreateNewWeek={() => {}}
              formatDate={(date) => new Date(date).toLocaleDateString()}
            />
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ProductList
              products={battleData.products}
              onEdit={handleEditProduct}
            />
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <AdminActionsPanel
              currentWeek={battleData.currentWeek}
              onEmailSubscribers={() => {
                toast({
                  title: "Emails queued",
                  description: "Notification emails will be sent to all subscribers."
                });
              }}
              onPublishBattle={() => {
                toast({
                  title: "Battle published",
                  description: "The current battle is now live on the main site."
                });
              }}
            />
          </motion.section>
        </AnimatePresence>
      </main>

      {isFormOpen && (
        <ProductForm 
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
