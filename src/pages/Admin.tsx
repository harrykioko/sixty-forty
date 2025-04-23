
import { useAuth } from "@/contexts/AuthProvider";
import AdminAuth from "@/components/admin/AdminAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return <AdminAuth onAuthenticated={() => navigate("/admin/dashboard")} />;
};

export default Admin;
