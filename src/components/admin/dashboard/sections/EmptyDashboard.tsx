
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";

interface EmptyDashboardProps {
  onCreateBattle: () => void;
  onLogout: () => void;
}

export const EmptyDashboard = ({ onCreateBattle, onLogout }: EmptyDashboardProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={onLogout} />
      
      <main className="flex-1 container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sixty40-purple to-sixty40-blue mb-4">
          Welcome to Sixty40 Admin
        </h2>
        <p className="text-muted-foreground mb-6">
          Start by creating a new battle week and adding some products.
        </p>

        <Button 
          className="bg-sixty40-purple hover:bg-sixty40-purple/90 px-4 py-2 rounded text-white"
          onClick={onCreateBattle}
        >
          Create Battle Week
        </Button>
      </main>
    </div>
  );
};
