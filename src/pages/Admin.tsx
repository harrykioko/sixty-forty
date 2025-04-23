
import { useAuth } from "@/contexts/AuthProvider";
import AdminAuth from "@/components/admin/AdminAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sixty40-purple"></div>
      </div>
    );
  }

  return <AdminAuth />;
};

export default Admin;

