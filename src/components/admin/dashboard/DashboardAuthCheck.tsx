
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";

export const DashboardAuthCheck = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-4">Please sign in to access the admin dashboard.</p>
          <Button 
            onClick={() => navigate("/admin")}
            className="bg-sixty40-purple hover:bg-sixty40-purple/90"
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
};
