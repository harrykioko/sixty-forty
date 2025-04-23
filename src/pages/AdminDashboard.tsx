
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import { useCurrentBattle } from "@/hooks/use-current-battle";
import { DashboardLoadingState } from "@/components/admin/dashboard/DashboardLoadingState";
import { DashboardAuthCheck } from "@/components/admin/dashboard/DashboardAuthCheck";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { isAuthenticated, isLoading } = useRequireAdminAuth();
  const { data: battleData, isLoading: battleLoading, error } = useCurrentBattle();
  const { toast } = useToast();

  if (isLoading || battleLoading) {
    return <DashboardLoadingState />;
  }

  if (!isAuthenticated) {
    return <DashboardAuthCheck />;
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
