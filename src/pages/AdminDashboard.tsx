import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { useCurrentBattle } from "@/hooks/use-current-battle";
import { usePastBattles } from "@/hooks/use-past-battles";
import { DashboardLoadingState } from "@/components/admin/dashboard/DashboardLoadingState";
import { DashboardAuthCheck } from "@/components/admin/dashboard/DashboardAuthCheck";
import { AdminDashboardLayout } from "@/components/admin/dashboard/AdminDashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { WeekData, WeekStatus } from "@/types/admin-dashboard";
import { Product } from "@/types/admin";

const AdminDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { data: battleData, isLoading: battleLoading, error: battleError } = useCurrentBattle();
  const { data: pastBattles, isLoading: pastBattlesLoading, error: pastBattlesError } = usePastBattles();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate("/admin");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || battleLoading || pastBattlesLoading) {
    return <DashboardLoadingState onLogout={handleLogout} />;
  }

  if (!isAuthenticated) {
    return <DashboardAuthCheck onLogout={handleLogout} />;
  }

  if (battleError || pastBattlesError) {
    toast({
      title: "Error loading data",
      description: "Please try again later",
      variant: "destructive",
    });
  }

  const formattedPastBattles: WeekData[] = pastBattles?.map(battle => ({
    id: battle.id,
    number: battle.number,
    startDate: new Date(battle.start_date),
    endDate: new Date(battle.end_date),
    status: battle.status as WeekStatus,
    products: battle.products?.map(product => ({
      id: product.id,
      name: product.name,
      title: product.name,
      description: product.long_desc || '',
      short_desc: product.short_desc,
      image_url: product.image_url,
      image: product.image_url,
      tech_stack: product.tech_stack || [],
      techStack: product.tech_stack || [],
      features: [],
      votes: 0,
      builder_id: product.builder_id,
      builders: product.builders,
      builderName: product.builders?.name || '',
      shortDescription: product.short_desc || ''
    })) || [],
    winnerId: battle.winner_id,
    created_at: battle.created_at,
    totalVotes: 0,
    theme: `Week ${battle.number} Battle`
  })) || [];

  const currentBattleData = battleData ? {
    currentWeek: {
      ...battleData.currentWeek,
      status: battleData.currentWeek.status as WeekStatus
    },
    products: battleData.products?.map(product => ({
      id: product.id,
      name: product.name,
      title: product.name,
      description: product.long_desc || '',
      short_desc: product.short_desc,
      image_url: product.image_url,
      image: product.image_url,
      tech_stack: product.tech_stack || [],
      techStack: product.tech_stack || [],
      features: [],
      votes: 0,
      builder_id: product.builder_id,
      builders: product.builders,
      builderName: product.builders?.name || '',
      shortDescription: product.short_desc || ''
    })) || []
  } : null;

  return (
    <AdminDashboardLayout 
      currentBattle={currentBattleData} 
      pastBattles={formattedPastBattles}
    />
  );
};

export default AdminDashboard;
