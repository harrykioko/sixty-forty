
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export const StickyCta = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (roughly 600px)
      const shouldShow = window.scrollY > 600;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would make an API call here
    toast({
      title: "Success!",
      description: "You're now subscribed to weekly updates.",
    });
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
            <div className="relative overflow-hidden glass-card border border-white/10 bg-gradient-to-r from-sixty40-purple/10 to-sixty40-blue/10 backdrop-blur-lg shadow-lg">
              <div className="px-6 py-4">
                <button
                  onClick={() => setIsDismissed(true)}
                  className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <p className="text-white/90 font-medium">
                    Never miss a vote — get weekly updates straight to your inbox.
                  </p>
                  
                  <div className="flex w-full sm:w-auto gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full sm:w-64 bg-white/5 border-white/10"
                    />
                    <Button 
                      type="submit"
                      className="bg-sixty40-purple hover:bg-sixty40-purple/90 transition-transform hover:scale-105"
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
