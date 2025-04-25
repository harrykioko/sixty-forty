
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "@/components/admin/AdminHeader";
import { useToast } from "@/hooks/use-toast";
import { Week, Product, WeekData } from "@/types/admin";
import { CreateBattleDialog } from "@/components/admin/dashboard/CreateBattleDialog";
import { BattleDetailsModal } from "@/components/admin/modals/BattleDetailsModal";
import { ProductWeekCard } from "@/components/admin/dashboard/ProductWeekCard";
import { PastBattlesList } from "@/components/admin/dashboard/PastBattlesList";
import { WeekEditorModal } from "@/components/admin/modals/WeekEditorModal";
import ProductForm from "@/components/admin/ProductForm";

interface AdminDashboardLayoutProps {
  currentBattle: {
    currentWeek: any;
    products: Product[];
  } | null;
  pastBattles: WeekData[];
}

export const AdminDashboardLayout = ({ currentBattle, pastBattles }: AdminDashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Modal states
  const [createBattleDialogOpen, setCreateBattleDialogOpen] = useState(false);
  const [battleDetailsModalOpen, setBattleDetailsModalOpen] = useState(false);
  const [weekEditorModalOpen, setWeekEditorModalOpen] = useState(false);
  const [productFormOpen, setProductFormOpen] = useState(false);
  
  // Selected data states
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };
  
  // Format current battle data
  const formatCurrentBattle = (): Week | null => {
    if (!currentBattle?.currentWeek) return null;
    
    return {
      id: currentBattle.currentWeek.id,
      number: currentBattle.currentWeek.number,
      startDate: new Date(currentBattle.currentWeek.start_date),
      endDate: new Date(currentBattle.currentWeek.end_date),
      status: currentBattle.currentWeek.status,
      winnerId: currentBattle.currentWeek.winner_id,
      products: currentBattle.products || []
    };
  };
  
  // Current formatted battle
  const currentFormattedBattle = formatCurrentBattle();
  
  // Handle edit week
  const handleEditWeek = (week: Week) => {
    setSelectedWeek(week);
    setWeekEditorModalOpen(true);
  };
  
  // Handle view battle details
  const handleViewBattleDetails = (week: Week) => {
    setSelectedWeek(week);
    setBattleDetailsModalOpen(true);
  };
  
  // Handle add product
  const handleAddProduct = (week: Week) => {
    setSelectedWeek(week);
    setSelectedProduct(null);
    setProductFormOpen(true);
  };
  
  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductFormOpen(true);
  };
  
  // Handle end voting
  const handleEndVoting = () => {
    toast({
      title: "End Voting",
      description: "This would end the voting period and determine a winner."
    });
  };
  
  // Handle save week
  const handleSaveWeek = async (weekData: Partial<Week>) => {
    // This would make an actual API call in a real implementation
    toast({
      title: "Week Saved",
      description: `Week ${weekData.number} has been saved.`
    });
    setWeekEditorModalOpen(false);
  };
  
  // If no current battle, show empty state
  if (!currentBattle?.currentWeek && pastBattles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={handleLogout} />
        
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
          open={createBattleDialogOpen}
          onClose={() => setCreateBattleDialogOpen(false)}
        />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={handleLogout} />
      
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
              week={{
                id: currentFormattedBattle.id,
                number: currentFormattedBattle.number,
                startDate: currentFormattedBattle.startDate,
                endDate: currentFormattedBattle.endDate,
                status: currentFormattedBattle.status,
                products: currentFormattedBattle.products,
                theme: `Week ${currentFormattedBattle.number} Battle`,
                totalVotes: 0
              }}
              onEdit={() => handleEditWeek(currentFormattedBattle)}
              onView={() => handleViewBattleDetails(currentFormattedBattle)}
              onEndVoting={handleEndVoting}
            />
          </motion.section>
        )}
        
        {pastBattles && pastBattles.length > 0 && (
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

      {/* Modals */}
      <CreateBattleDialog
        open={createBattleDialogOpen}
        onClose={() => setCreateBattleDialogOpen(false)}
      />
      
      {selectedWeek && (
        <BattleDetailsModal
          week={selectedWeek}
          isOpen={battleDetailsModalOpen}
          onClose={() => setBattleDetailsModalOpen(false)}
          onEditWeek={() => {
            setBattleDetailsModalOpen(false);
            setWeekEditorModalOpen(true);
          }}
          onAddProduct={() => {
            setBattleDetailsModalOpen(false);
            setProductFormOpen(true);
          }}
          onEditProduct={handleEditProduct}
        />
      )}
      
      {selectedWeek && (
        <WeekEditorModal
          open={weekEditorModalOpen}
          onOpenChange={() => setWeekEditorModalOpen(false)}
          currentWeek={selectedWeek}
          onSave={handleSaveWeek}
        />
      )}
      
      {productFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setProductFormOpen(false)}
        />
      )}
    </div>
  );
};
