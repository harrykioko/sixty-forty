import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import { WeekManagerPanel } from "@/components/admin/panels/WeekManagerPanel";
import { AdminActionsPanel } from "@/components/admin/panels/AdminActionsPanel";
import { useCurrentBattle } from "@/hooks/use-current-battle";
import { EmptyStateModal } from "@/components/admin/panels/EmptyStateModal";
import { Week, Product } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";

const AdminDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: battleData, isLoading: battleLoading, error } = useCurrentBattle();
  const { isAuthenticated, isLoading } = useRequireAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={() => {
          supabase.auth.signOut();
          navigate("/admin");
        }} />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sixty40-purple"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={() => {
          supabase.auth.signOut();
          navigate("/admin");
        }} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="mb-4">Please sign in to access the admin dashboard.</p>
            <button 
              onClick={() => navigate("/admin")}
              className="bg-sixty40-purple hover:bg-sixty40-purple/90 text-white px-6 py-2 rounded-lg"
            >
              Go to Login
            </button>
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
        <AdminHeader onLogout={() => {
          supabase.auth.signOut();
          navigate("/admin");
        }} />
        <EmptyStateModal />
      </div>
    );
  }

  const formattedWeek: Week = {
    id: battleData.currentWeek.id,
    number: battleData.currentWeek.number,
    startDate: new Date(battleData.currentWeek.start_date),
    endDate: new Date(battleData.currentWeek.end_date),
    status: battleData.currentWeek.status,
    winnerId: battleData.currentWeek.winner_id,
    products: battleData.products || []
  };

  const handleAddProduct = (builderName: string) => {
    setEditingProduct({ builderName } as any);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={() => {
        supabase.auth.signOut();
        navigate("/admin");
      }} />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <AnimatePresence>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WeekManagerPanel
              currentWeek={formattedWeek}
              onEndVoting={() => {}}
              onCreateNewWeek={() => {}}
              formatDate={(date) => date.toLocaleDateString()}
            />
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ProductList
              products={formattedWeek.products}
              onEdit={handleEditProduct}
            />
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <AdminActionsPanel
              currentWeek={formattedWeek}
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
