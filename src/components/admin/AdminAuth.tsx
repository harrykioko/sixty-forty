
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminAuth = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log("Session set from login:", session);
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://sixty40.xyz/admin/dashboard",
        },
      });

      if (error) throw error;

      toast({
        title: "Magic link sent!",
        description: "Check your inbox to sign in to the admin dashboard.",
      });
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error.message || "Please try again with an authorized email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold">
              <span className="text-white">Sixty</span>
              <span className="text-sixty40-purple">40</span>
              <span className="text-white ml-2">Admin</span>
            </h1>
          </Link>
          <p className="text-muted-foreground mt-2">
            Sign in to manage weekly competitions
          </p>
        </div>

        <div className="glass-card p-6 border border-white/10 backdrop-blur-md rounded-lg">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your admin email"
                className="bg-black/20 border-white/10"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-sixty40-purple hover:bg-sixty40-purple/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending magic link...
                </span>
              ) : (
                "Send Magic Link"
              )}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            Admins only. A magic link will be sent to your email.
          </p>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-white flex items-center justify-center gap-1"
          >
            <ChevronLeft size={16} />
            Back to homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;

