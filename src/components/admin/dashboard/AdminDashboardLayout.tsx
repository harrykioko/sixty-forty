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
  const navigate = useNavigate(); // Add this line to fix navigation
  const { 
    state, 
    setCreateBattleDialogOpen, 
    setBattleDetailsModalOpen, 
    setWeekEditorModalOpen,
    setProductFormOpen,
    setSelectedWeek,
    setSelectedProduct 
  } = useDashboardState();

  const { 
    handleEditWeek, 
    handleViewBattleDetails, 
    handleAddProduct, 
    handleEditProduct, 
    handleEndVoting, 
    handleSaveWeek 
  } = useDashboardActions();

  const handleViewCurrentBattle = () => {
    if (currentBattle?.currentWeek) {
      setSelectedWeek(currentBattle.currentWeek);
      setBattleDetailsModalOpen(true);
    }
  };

  const handleEditCurrentBattle = () => {
    if (currentBattle?.currentWeek) {
      setSelectedWeek(currentBattle.currentWeek);
      setWeekEditorModalOpen(true);
    }
  };

  const currentFormattedBattle = formatCurrentBattle(currentBattle);

  if (!currentBattle?.currentWeek && pastBattles.length === 0) {
    return (
      <EmptyDashboard 
        onCreateBattle={() => setCreateBattleDialogOpen(true)}
        onLogout={() => navigate("/admin")} // Use navigate here
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={() => navigate("/admin")} />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 space-y-8">
        <DashboardHeader 
          onCreateBattle={() => setCreateBattleDialogOpen(true)} 
        />
        
        {currentBattle?.currentWeek && (
          <CurrentBattleSection
            week={currentBattle.currentWeek}
            onEdit={handleEditCurrentBattle}
            onView={handleViewCurrentBattle}
          />
        )}
        
        {pastBattles.length > 0 && (
          <PastBattlesSection
            weeks={pastBattles}
            onView={(week) => {
              setSelectedWeek(week);
              setBattleDetailsModalOpen(true);
            }}
            onEdit={(week) => {
              setSelectedWeek(week);
              setWeekEditorModalOpen(true);
            }}
          />
        )}
      </main>

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
        onEndVoting={handleEndVoting}
      />
    </div>
  );
};

