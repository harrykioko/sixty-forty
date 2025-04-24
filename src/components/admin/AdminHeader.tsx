
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="border-b border-white/10 p-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/admin/dashboard" className="mr-8">
            <h1 className="text-2xl font-bold">
              <span className="text-white">Sixty</span>
              <span className="text-sixty40-purple">40</span>
              <span className="text-white ml-2">Admin</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home size={16} className="mr-2" />
              View Website
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
