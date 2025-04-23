
import { useAuth } from "@/contexts/AuthProvider";
import AdminAuth from "@/components/admin/AdminAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

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
