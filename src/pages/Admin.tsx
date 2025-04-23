
import { useAuth } from "@/contexts/AuthProvider";
import AdminAuth from "@/components/admin/AdminAuth";
import AdminHeader from "@/components/admin/AdminHeader";
import { ProductWeekCard } from "@/components/admin/dashboard/ProductWeekCard";
import { CreateBattleDialog } from "@/components/admin/dashboard/CreateBattleDialog";
import { PastBattlesList } from "@/components/admin/dashboard/PastBattlesList";
import { CURRENT_WEEK, PREVIOUS_WEEKS } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sixty40-purple"></div>
      </div>
    );
  }

  return <AdminAuth onAuthenticated={() => {}} />;
};

export default Admin;
