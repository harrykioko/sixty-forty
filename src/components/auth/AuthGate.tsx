
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate = ({ children }: AuthGateProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await supabase.auth.getSession();
      setIsReady(true);
    };

    init();
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
};
