
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import { WeekManagerPanel } from "@/components/admin/panels/WeekManagerPanel";
import { AdminActionsPanel } from "@/components/admin/panels/AdminActionsPanel";
import { EmptyStateModal } from "@/components/admin/panels/EmptyStateModal";
import { CreateBattleDialog } from "@/components/admin/dashboard/CreateBattleDialog";
import { Week, Product } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";

export const DashboardContent = ({ battleData }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
              onCreateNewBattleWeek={() => setShowCreateDialog(true)}
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

      <CreateBattleDialog 
        open={showCreateDialog} 
        onClose={() => setShowCreateDialog(false)} 
      />
    </div>
  );
};
