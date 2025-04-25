import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminHeader from "@/components/admin/AdminHeader";
import { useToast } from "@/hooks/use-toast";
import { CreateBattleDialog } from "@/components/admin/dashboard/CreateBattleDialog";
import { BattleDetailsModal } from "@/components/admin/modals/BattleDetailsModal";
import { ProductWeekCard } from "@/components/admin/dashboard/ProductWeekCard";
import { PastBattlesList } from "@/components/admin/dashboard/PastBattlesList";
import { WeekEditorModal } from "@/components/admin/modals/WeekEditorModal";
import ProductForm from "@/components/admin/ProductForm";
import { useDashboardState } from "@/hooks/use-dashboard-state";
import { AdminDashboardProps, DashboardState } from "@/types/admin-dashboard";
import { Week, Product } from "@/types/admin";

export const AdminDashboardLayout = ({ currentBattle, pastBattles }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    state,
    setCreateBattleDialogOpen,
    setBattleDetailsModalOpen,
    setWeekEditorModalOpen,
    setProductFormOpen,
    setSelectedWeek,
    setSelectedProduct,
  } = useDashboardState();

  const formatCurrentBattle = (): Week | null => {
    if (!currentBattle?.currentWeek) return null;
    
    return {
      id: currentBattle.currentWeek.id,
      number: currentBattle.currentWeek.number,
      startDate: new Date(currentBattle.currentWeek.startDate),
      endDate: new Date(currentBattle.currentWeek.endDate),
      status: currentBattle.currentWeek.status,
      products: currentBattle.products || [],
      winnerId: currentBattle.currentWeek.winnerId,
      theme: `Week ${currentBattle.currentWeek.number} Battle`,
      totalVotes: 0
    };
  };

  const currentFormattedBattle = formatCurrentBattle();

  const handleEditWeek = (week: Week) => {
    setSelectedWeek(week);
    setWeekEditorModalOpen(true);
  };

  const handleViewBattleDetails = (week: Week) => {
    setSelectedWeek(week);
    setBattleDetailsModalOpen(true);
  };

  const handleAddProduct = (week: Week) => {
    setSelectedWeek(week);
    setSelectedProduct(null);
    setProductFormOpen(true);
  };

  const handleEndVoting = () => {
    toast({
      title: "End Voting",
      description: "This would end the voting period and determine a winner."
    });
  };

  const handleSaveWeek = async (weekData: Partial<Week>) => {
    toast({
      title: "Week Saved",
      description: `Week ${weekData.number} has been saved.`
    });
    setWeekEditorModalOpen(false);
  };

  if (!currentBattle?.currentWeek && pastBattles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={() => navigate("/admin")} />
        
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sixty40-purple to-sixty40-blue mb-4">
            Welcome to Sixty40 Admin
          </h2>
          <p className="text-muted-foreground mb-6">
            Start by creating a new battle week and adding some products.
          </p>

          <button 
            className="bg-sixty40-purple hover:bg-sixty40-purple/90 px-4 py-2 rounded text-white"
            onClick={() => setCreateBattleDialogOpen(true)}
          >
            Create Battle Week
          </button>
        </main>

        <CreateBattleDialog
          open={state.createBattleDialogOpen}
          onClose={() => setCreateBattleDialogOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={() => navigate("/admin")} />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button 
            className="bg-sixty40-purple hover:bg-sixty40-purple/90 px-4 py-2 rounded text-white"
            onClick={() => setCreateBattleDialogOpen(true)}
          >
            Create New Battle
          </button>
        </div>
        
        {currentFormattedBattle && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Current Battle</h2>
            <ProductWeekCard
              week={currentFormattedBattle}
              onEdit={() => handleEditWeek(currentFormattedBattle)}
              onView={() => handleViewBattleDetails(currentFormattedBattle)}
              onEndVoting={handleEndVoting}
            />
          </motion.section>
        )}
        
        {pastBattles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4">Past Battles</h2>
            <PastBattlesList weeks={pastBattles} />
          </motion.section>
        )}
      </main>

      <CreateBattleDialog
        open={state.createBattleDialogOpen}
        onClose={() => setCreateBattleDialogOpen(false)}
      />
      
      {state.selectedWeek && (
        <BattleDetailsModal
          week={state.selectedWeek}
          isOpen={state.battleDetailsModalOpen}
          onClose={() => setBattleDetailsModalOpen(false)}
          onEditWeek={() => {
            setBattleDetailsModalOpen(false);
            setWeekEditorModalOpen(true);
          }}
          onAddProduct={() => {
            setBattleDetailsModalOpen(false);
            setProductFormOpen(true);
          }}
          onEditProduct={(product) => {
            setSelectedProduct(product);
            setBattleDetailsModalOpen(false);
            setProductFormOpen(true);
          }}
        />
      )}
      
      {state.selectedWeek && (
        <WeekEditorModal
          open={state.weekEditorModalOpen}
          onOpenChange={() => setWeekEditorModalOpen(false)}
          currentWeek={state.selectedWeek}
          onSave={handleSaveWeek}
        />
      )}
      
      {state.productFormOpen && (
        <ProductForm
          product={state.selectedProduct}
          onClose={() => setProductFormOpen(false)}
        />
      )}
    </div>
  );
};
