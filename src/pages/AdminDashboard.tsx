import { useAuth } from "@/contexts/AuthProvider";
import { useCurrentBattle } from "@/hooks/use-current-battle";
import { DashboardLoadingState } from "@/components/admin/dashboard/DashboardLoadingState";
import { DashboardAuthCheck } from "@/components/admin/dashboard/DashboardAuthCheck";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { data: battleData, isLoading: battleLoading, error } = useCurrentBattle();
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

  if (isLoading || battleLoading) {
    return <DashboardLoadingState onLogout={handleLogout} />;
  }

  if (!isAuthenticated) {
    return <DashboardAuthCheck onLogout={handleLogout} />;
  }

  if (error) {
    toast({
      title: "Error loading data",
      description: "Please try again later",
      variant: "destructive",
    });
  }

  return <DashboardContent battleData={battleData} />;
};

export default AdminDashboard;
