
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { AdminActionsPanel } from "@/components/admin/panels/AdminActionsPanel";
import { EmptyStateModal } from "@/components/admin/panels/EmptyStateModal";
import { CreateBattleDialog } from "@/components/admin/dashboard/CreateBattleDialog";
import { Week, Product, WeekData } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProductWeekCard } from "@/components/admin/dashboard/ProductWeekCard";
import { PastBattlesList } from "@/components/admin/dashboard/PastBattlesList";
import { PastBattleModal } from "@/components/ui/past-battle-modal";
import { Plus } from "lucide-react";

export const DashboardContent = ({ battleData }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Battle Week
          </Button>
        </main>

        <CreateBattleDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
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

  // Sample past battles for demonstration
  const pastWeeks: WeekData[] = [
    {
      id: 'week-14',
      number: 14,
      startDate: new Date('2025-04-07'),
      endDate: new Date('2025-04-14'),
      status: 'completed',
      products: [],
      theme: "Personal Finance Apps",
      totalVotes: 105,
      winnerName: "MoneyTracker by Marcos"
    },
    {
      id: 'week-13',
      number: 13,
      startDate: new Date('2025-03-31'),
      endDate: new Date('2025-04-07'),
      status: 'completed',
      products: [],
      theme: "Email Automation Tools",
      totalVotes: 87,
      winnerName: "MailGenius by Harry"
    },
    {
      id: 'week-12',
      number: 12,
      startDate: new Date('2025-03-24'),
      endDate: new Date('2025-03-31'),
      status: 'completed',
      products: [],
      theme: "Knowledge Management",
      totalVotes: 132,
      winnerName: "BrainBox by Marcos"
    }
  ];

  const handleShowBattleModal = (week) => {
    setSelectedBattle(week);
    setModalOpen(true);
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
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your weekly competitions and entries
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-sixty40-purple hover:bg-sixty40-purple/90"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Battle
          </Button>
        </div>
        
        <AnimatePresence>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Current Week</h2>
            <ProductWeekCard
              week={{
                ...formattedWeek,
                theme: "AI Productivity Tools",
                totalVotes: 78
              }}
              isCurrentWeek={true}
              onEdit={() => {/* handle edit */}}
              onView={() => handleShowBattleModal(formattedWeek)}
              onEndVoting={() => {/* handle end voting */}}
            />
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-8"
          >
            <AdminActionsPanel
              currentWeek={formattedWeek}
              onCreateNewBattleWeek={() => setDialogOpen(true)}
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
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold mb-4">Previous Weeks</h2>
            <div className="space-y-4">
              {pastWeeks.map((week) => (
                <ProductWeekCard
                  key={week.id}
                  week={week}
                  onEdit={() => {/* handle edit */}}
                  onView={() => handleShowBattleModal(week)}
                />
              ))}
            </div>
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
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      {selectedBattle && (
        <PastBattleModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          week={{
            id: selectedBattle.id,
            number: selectedBattle.number,
            startDate: selectedBattle.startDate.toISOString(),
            endDate: selectedBattle.endDate.toISOString(),
            theme: selectedBattle.theme || "Weekly Battle"
          }}
          products={[
            {
              id: "1",
              name: "Harry's Product",
              builder: "Harry",
              shortDescription: "An innovative tool that helps with productivity",
              technologies: ["React", "Node.js", "MongoDB"],
              image: "/lovable-uploads/04f69a9a-fed8-4b84-a2b4-ca270cdbf3f6.png",
              liveDemoUrl: "https://example.com",
              features: ["Feature 1", "Feature 2", "Feature 3"],
              isWinner: selectedBattle.winnerName?.includes("Harry") || false
            },
            {
              id: "2",
              name: "Marcos's Product",
              builder: "Marcos",
              shortDescription: "A revolutionary app for managing tasks",
              technologies: ["Vue", "Express", "PostgreSQL"],
              image: "/lovable-uploads/b93e6079-f7de-459d-b2f7-237ae698d76f.png",
              liveDemoUrl: "https://example.com",
              features: ["Feature A", "Feature B", "Feature C"],
              isWinner: selectedBattle.winnerName?.includes("Marcos") || false
            }
          ]}
        />
      )}
    </div>
  );
};
