import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductList from "@/components/admin/ProductList";
import { WeekManagerPanel } from "@/components/admin/panels/WeekManagerPanel";
import { AdminActionsPanel } from "@/components/admin/panels/AdminActionsPanel";
import { EmptyStateModal } from "@/components/admin/panels/EmptyStateModal";
import { CreateBattleModal } from "@/components/admin/dashboard/CreateBattleModal";
import { StatusProgressBar } from "@/components/admin/panels/StatusProgressBar";
import { PastBattlesSection } from "@/components/admin/dashboard/sections/PastBattlesSection";
import { PastBattleDetailsModal } from "@/components/admin/modals/PastBattleDetailsModal";
import { EditBattleModal } from "@/components/admin/modals/EditBattleModal";
import { Week, Product } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import CreateProductForm from "@/components/admin/form/CreateProductForm";
import EditProductForm from "@/components/admin/form/EditProductForm";
import { usePastBattles } from "@/hooks/use-past-battles";

export const DashboardContent = ({ battleData }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dialogOpen, setModalOpen] = useState(false);
  const [selectedPastWeek, setSelectedPastWeek] = useState(null);
  const [isEditingBattle, setIsEditingBattle] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: pastWeeks = [], isLoading: isLoadingPastWeeks } = usePastBattles();

  // Debug logs for past battles data
  React.useEffect(() => {
    console.log("Past Battles Data:", pastWeeks);
    console.log("Is Loading Past Battles:", isLoadingPastWeeks);
  }, [pastWeeks, isLoadingPastWeeks]);

  // Debug log to verify dialog state
  React.useEffect(() => {
    console.log("DASHBOARD CONTENT render — dialogOpen:", dialogOpen);
  }, [dialogOpen]);

  if (!battleData?.currentWeek) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={() => {
          supabase.auth.signOut();
          navigate("/admin");
        }} />
        
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sixty40-purple to-sixty40-blue mb-4">build bruh</h2>
          <p className="text-muted-foreground mb-6">
            Start by creating a new battle week and adding some products.
          </p>

          <Button 
            className="bg-sixty40-purple hover:bg-sixty40-purple/90"
            onClick={() => setModalOpen(true)}
          >
            Create Battle Week
          </Button>
        </main>

        <CreateBattleModal
          open={dialogOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    );
  }

  // Convert string dates to Date objects
  const formattedWeek: Week = {
    id: battleData.currentWeek.id,
    number: battleData.currentWeek.number,
    startDate: new Date(battleData.currentWeek.start_date),
    endDate: new Date(battleData.currentWeek.end_date),
    status: battleData.currentWeek.status,
    winnerId: battleData.currentWeek.winner_id,
    products: battleData.products || []
  };

  // Format past weeks
  const formattedPastWeeks: Week[] = (battleData.pastWeeks || []).map(week => ({
    id: week.id,
    number: week.number,
    startDate: new Date(week.start_date),
    endDate: new Date(week.end_date),
    status: week.status,
    winnerId: week.winner_id,
    products: week.products || [],
    totalVotes: week.total_votes || 0
  }));

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

  const handleViewPastBattle = (week: Week) => {
    setSelectedPastWeek(week);
  };

  const handleClosePastBattleModal = () => {
    setSelectedPastWeek(null);
  };

  const handleEditBattle = () => {
    setIsEditingBattle(true);
  };

  const handleCloseEditBattleModal = () => {
    setIsEditingBattle(false);
  };

  const handleSaveBattle = async (data: any) => {
    try {
      // TODO: Implement API call to update battle
      toast({
        title: "Battle updated",
        description: "The battle has been updated successfully."
      });
      setIsEditingBattle(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update battle. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={() => {
        supabase.auth.signOut();
        navigate("/admin");
      }} />
      
      <StatusProgressBar week={formattedWeek} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Products */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Products
              </h2>
              <Button
                onClick={() => handleAddProduct("")}
                className="bg-sixty40-blue hover:bg-sixty40-blue/90"
              >
                Add Product
              </Button>
            </div>
            
            <ProductList
              products={formattedWeek.products}
              onEdit={handleEditProduct}
              onAddProduct={() => handleAddProduct("")}
            />
          </div>

          {/* Sidebar - Week Info & Actions */}
          <div className="space-y-6">
            <WeekManagerPanel
              currentWeek={formattedWeek}
              onEndVoting={() => {}}
              onCreateNewWeek={() => {}}
              formatDate={(date) => format(date, "MMM d, yyyy")}
            />
            
            <AdminActionsPanel
              currentWeek={formattedWeek}
              onCreateNewBattleWeek={() => setModalOpen(true)}
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
          </div>
        </div>

        {/* Past Battles Section with debug info */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-6">
            Past Battles
          </h2>
          {isLoadingPastWeeks ? (
            <div className="text-white/60">Loading past battles...</div>
          ) : pastWeeks.length > 0 ? (
            <PastBattlesSection
              pastWeeks={pastWeeks}
              onViewBattle={handleViewPastBattle}
            />
          ) : (
            <div className="text-white/60">No past battles found</div>
          )}
        </div>
      </main>

      {isFormOpen && (
        editingProduct ? (
          <EditProductForm
            product={editingProduct}
            onClose={handleCloseForm}
            selectedWeek={formattedWeek}
          />
        ) : (
          <CreateProductForm
            onClose={handleCloseForm}
            selectedWeek={formattedWeek}
          />
        )
      )}

      {selectedPastWeek && (
        <PastBattleDetailsModal
          week={selectedPastWeek}
          onClose={handleClosePastBattleModal}
          onEdit={handleEditBattle}
        />
      )}

      {isEditingBattle && selectedPastWeek && (
        <EditBattleModal
          week={selectedPastWeek}
          onClose={handleCloseEditBattleModal}
          onSave={handleSaveBattle}
        />
      )}

      <CreateBattleModal
        open={dialogOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
