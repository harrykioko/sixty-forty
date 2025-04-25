
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { useCurrentBattle } from "@/hooks/use-current-battle";
import { usePastBattles } from "@/hooks/use-past-battles";
import { DashboardLoadingState } from "@/components/admin/dashboard/DashboardLoadingState";
import { DashboardAuthCheck } from "@/components/admin/dashboard/DashboardAuthCheck";
import { AdminDashboardLayout } from "@/components/admin/dashboard/AdminDashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Week } from "@/types/admin";

const AdminDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { data: battleData, isLoading: battleLoading, error: battleError } = useCurrentBattle();
  const { data: pastBattles, isLoading: pastBattlesLoading, error: pastBattlesError } = usePastBattles();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auth check effect - separate dependency list
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Error handling effect - separate with memoized errors to prevent infinite loops
  useEffect(() => {
    const hasError = battleError || pastBattlesError;
    
    if (hasError) {
      const errorMessage = battleError?.message || pastBattlesError?.message || "Unknown error";
      
      toast({
        title: "Error loading data",
        description: `Error details: ${errorMessage}`,
        variant: "destructive",
      });
      
      console.error("Battle error:", battleError);
      console.error("Past battles error:", pastBattlesError);
    }
  }, [battleError, pastBattlesError, toast]);

  const handleLogout = useCallback(async () => {
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
  }, [toast, navigate]);

  if (isLoading || battleLoading || pastBattlesLoading) {
    return <DashboardLoadingState onLogout={handleLogout} />;
  }

  if (!isAuthenticated) {
    return <DashboardAuthCheck onLogout={handleLogout} />;
  }

  const formattedPastBattles: Week[] = pastBattles?.map(battle => ({
    ...battle,
    products: battle.products || []
  })) || [];

  const currentBattleData = battleData ? {
    currentWeek: battleData.currentWeek,
    products: battleData.products || []
  } : null;

  return (
    <AdminDashboardLayout 
      currentBattle={currentBattleData} 
      pastBattles={formattedPastBattles}
    />
  );
};

export default AdminDashboard;
