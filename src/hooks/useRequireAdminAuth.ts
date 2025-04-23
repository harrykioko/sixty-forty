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
    // Clean the URL hash if it includes an access token (magic link flow)
    const cleanUrl = () => {
      if (window.location.hash && window.location.hash.includes("access_token")) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    // Check the current session from Supabase
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to verify session",
          variant: "destructive",
        });
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      if (!data.session) {
        if (window.location.pathname !== "/admin") {
          navigate("/admin");
        }
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    // Set up auth listener to catch redirect logins (magic link success)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setIsAuthenticated(true);
          setIsLoading(false);
          cleanUrl(); // important: remove tokens from URL
        }
      }
    );

    checkSession();

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return { isAuthenticated, isLoading };
};
