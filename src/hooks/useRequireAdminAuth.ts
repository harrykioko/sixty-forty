
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useRequireAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simplified auth check - just verify session exists
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          toast({
            title: "Authentication Error",
            description: error.message || "Failed to verify session",
            variant: "destructive",
          });
          setIsAuthenticated(false);
          
          if (window.location.pathname !== "/admin") {
            navigate("/admin");
          }
        } else if (!data.session) {
          setIsAuthenticated(false);
          
          if (window.location.pathname !== "/admin") {
            navigate("/admin");
          }
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setIsAuthenticated(false);
        
        if (window.location.pathname !== "/admin") {
          navigate("/admin");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate, toast]);

  return { isAuthenticated, isLoading };
};
