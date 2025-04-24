
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProcessedMagicLink, setHasProcessedMagicLink] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const initAuth = useCallback(async () => {
    try {
      console.log("Initializing auth...");
      
      // Process magic link if present and hasn't been processed yet
      if (window.location.hash.includes("access_token") && !hasProcessedMagicLink) {
        console.log("Magic link detected, processing...");
        setHasProcessedMagicLink(true);
        
        try {
          // Exchange the code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.hash);
          if (error) throw error;
          console.log("Code exchanged for session successfully:", data);
          
          // Clean the URL hash
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (exchangeError) {
          console.error("Error exchanging code for session:", exchangeError);
        }
      }

      // Retrieve session after potential exchange
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      console.log("Session retrieved from getSession:", currentSession);
      
      if (sessionError) {
        throw sessionError;
      }
      
      console.log("Session retrieved:", currentSession ? "Session exists" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // If user is authenticated and on the /admin page, redirect to dashboard
      if (currentSession && location.pathname === "/admin") {
        console.log("User authenticated on /admin, redirecting to dashboard");
        navigate("/admin/dashboard");
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Auth initialization error:", error);
      setIsLoading(false);
    }
  }, [navigate, location.pathname, hasProcessedMagicLink]);

  // Set up auth state change listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state changed:", event);
      
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      // Handle login event specifically
      if (event === 'SIGNED_IN' && location.pathname === "/admin") {
        console.log("User signed in, redirecting to dashboard");
        navigate("/admin/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Initialize authentication on mount and when hash or path changes
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Create the context value
  const value = {
    session,
    user,
    isAuthenticated: !!session,
    isLoading,
  };

  // Show a full-screen loading state while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sixty40-purple"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
