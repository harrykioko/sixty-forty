
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
    // Set up auth state listener FIRST to prevent missing any auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Only update auth state, avoid triggering navigation here
        setIsAuthenticated(!!session);
      }
    );

    // THEN check for initial session and clean URL if needed
    const checkSession = async () => {
      try {
        // Clean URL hash if present
        if (window.location.hash && window.location.hash.includes("access_token")) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (!session) {
          // Only redirect if we're not already on the admin page
          if (window.location.pathname !== '/admin') {
            navigate('/admin');
          }
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to verify session",
          variant: "destructive",
        });
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return { isAuthenticated, isLoading };
};
