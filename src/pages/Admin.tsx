
import { useToast } from "@/hooks/use-toast";
import AdminAuth from "@/components/admin/AdminAuth";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductWeekCard } from "@/components/admin/dashboard/ProductWeekCard";
import { CreateBattleDialog } from "@/components/admin/dashboard/CreateBattleDialog";
import { PastBattlesList } from "@/components/admin/dashboard/PastBattlesList";
import { supabase } from "@/integrations/supabase/client";
import { CURRENT_WEEK, PREVIOUS_WEEKS } from "@/data/mock-data";

const Admin = () => {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useRequireAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sixty40-purple"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => {}} />;
  }

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

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader onLogout={handleLogout} />

      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
              <p className="text-muted-foreground">
                Manage your weekly competitions and entries
              </p>
            </div>
            <CreateBattleDialog />
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4">Current Week</h3>
            <ProductWeekCard
              week={CURRENT_WEEK}
              onEdit={() => {}}
              onView={() => {}}
              onEndVoting={() => {
                toast({
                  title: "Voting Ended",
                  description: "Voting has been ended early for this battle.",
                });
              }}
            />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Previous Weeks</h3>
            <PastBattlesList weeks={PREVIOUS_WEEKS} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
