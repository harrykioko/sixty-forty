
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate = ({ children }: AuthGateProps) => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if URL contains access_token (magic link)
        if (window.location.hash && window.location.hash.includes("access_token")) {
          try {
            // Exchange the code for a session
            await supabase.auth.exchangeCodeForSession(window.location.hash);
            
            // Clean the URL hash
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Get the newly established session
            const { data } = await supabase.auth.getSession();
            
            // If session exists, redirect to dashboard if not already there
            if (data.session && location.pathname === "/admin") {
              navigate("/admin/dashboard");
            }
            
          } catch (error) {
            // Handle magic link errors
            toast({
              title: "Authentication Error",
              description: "Your login link has expired. Please try again.",
              variant: "destructive",
            });
            
            if (location.pathname !== "/admin") {
              navigate("/admin");
            }
          }
        } else {
          // No magic link, just get current session
          await supabase.auth.getSession();
        }
        
        // Mark authentication as initialized
        setIsReady(true);
      } catch (error) {
        console.error("Auth initialization error:", error);
        setIsReady(true); // Still mark as ready to prevent blocking the app
      }
    };

    initAuth();
  }, [navigate, location.pathname, toast]);

  // Show loading state until auth is ready
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sixty40-purple"></div>
      </div>
    );
  }

  return <>{children}</>;
};
