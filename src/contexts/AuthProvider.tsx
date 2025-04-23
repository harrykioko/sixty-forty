
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

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

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Process magic link if present
        if (window.location.hash.includes("access_token")) {
          await supabase.auth.exchangeCodeForSession(window.location.hash);
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Retrieve session after exchange
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Subscribe to future auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("Auth initialization error:", error);
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = {
    session,
    user,
    isAuthenticated: !!session,
    isLoading,
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sixty40-purple"></div>
        </div>
      ) : (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      )}
    </>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
