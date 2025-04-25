
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import { useToast } from "@/hooks/use-toast";
import { AdminDashboardProps } from "@/types/admin-dashboard";
import { Week } from "@/types/admin";
import { useDashboardState } from "@/hooks/use-dashboard-state";
import { useDashboardActions } from "@/hooks/dashboard/useDashboardActions";
import { formatCurrentBattle } from "@/utils/battle-formatter";
import { DashboardHeader } from "@/components/admin/dashboard/sections/DashboardHeader";
import { EmptyDashboard } from "@/components/admin/dashboard/sections/EmptyDashboard";
import { CurrentBattleSection } from "@/components/admin/dashboard/sections/CurrentBattleSection";
import { PastBattlesSection } from "@/components/admin/dashboard/sections/PastBattlesSection";
import { DashboardModals } from "@/components/admin/dashboard/modals/DashboardModals";

export const AdminDashboardLayout = ({ currentBattle, pastBattles }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const { state, setCreateBattleDialogOpen, setBattleDetailsModalOpen, setWeekEditorModalOpen, setProductFormOpen } = useDashboardState();
  const { 
    handleEditWeek, 
    handleViewBattleDetails, 
    handleAddProduct, 
    handleEditProduct, 
    handleEndVoting, 
    handleSaveWeek 
  } = useDashboardActions();

  const currentFormattedBattle = formatCurrentBattle(currentBattle);

  // Handle empty state when no battles exist
  if (!currentBattle?.currentWeek && pastBattles.length === 0) {
    return (
      <EmptyDashboard 
        onCreateBattle={() => setCreateBattleDialogOpen(true)}
        onLogout={() => navigate("/admin")}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={() => navigate("/admin")} />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Header */}
        <DashboardHeader 
          onCreateBattle={() => setCreateBattleDialogOpen(true)} 
        />
        
        {/* Current Battle Section */}
        {currentFormattedBattle && (
          <CurrentBattleSection
            week={currentFormattedBattle}
            onEdit={() => handleEditWeek(currentFormattedBattle)}
            onView={() => handleViewBattleDetails(currentFormattedBattle)}
            onEndVoting={handleEndVoting}
          />
        )}
        
        {/* Past Battles Section */}
        {pastBattles.length > 0 && (
          <PastBattlesSection
            weeks={pastBattles}
            onView={(week) => handleViewBattleDetails(week)}
            onEdit={(week) => handleEditWeek(week)}
          />
        )}
      </main>

      {/* Modals */}
      <DashboardModals
        createBattleDialogOpen={state.createBattleDialogOpen}
        battleDetailsModalOpen={state.battleDetailsModalOpen}
        weekEditorModalOpen={state.weekEditorModalOpen}
        productFormOpen={state.productFormOpen}
        selectedWeek={state.selectedWeek}
        selectedProduct={state.selectedProduct}
        onCloseCreateBattle={() => setCreateBattleDialogOpen(false)}
        onCloseBattleDetails={() => setBattleDetailsModalOpen(false)}
        onCloseWeekEditor={() => setWeekEditorModalOpen(false)}
        onCloseProductForm={() => setProductFormOpen(false)}
        onEditWeekFromDetails={() => {
          setBattleDetailsModalOpen(false);
          setWeekEditorModalOpen(true);
        }}
        onAddProductFromDetails={() => {
          setBattleDetailsModalOpen(false);
          setProductFormOpen(true);
        }}
        onEditProductFromDetails={(product) => {
          handleEditProduct(product);
          setBattleDetailsModalOpen(false);
        }}
        onSaveWeek={handleSaveWeek}
      />
    </div>
  );
};
