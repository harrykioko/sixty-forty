
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus, Edit, Eye, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { CURRENT_WEEK, PREVIOUS_WEEKS } from "@/data/mock-data";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would authenticate with Supabase
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      
      toast({
        title: "Logged in successfully",
        description: "Welcome to the admin dashboard",
      });
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
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

          <div className="glass-card p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md text-white"
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
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
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
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="mr-8">
              <h1 className="text-2xl font-bold">
                <span className="text-white">Sixty</span>
                <span className="text-sixty40-purple">40</span>
                <span className="text-white ml-2">Admin</span>
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                View Website
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsAuthenticated(false);
                toast({
                  title: "Logged out",
                  description: "You have been logged out successfully",
                });
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
              <p className="text-muted-foreground">
                Manage your weekly competitions and entries
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-sixty40-purple hover:bg-sixty40-purple/90">
                  <Plus size={16} className="mr-2" />
                  Create New Battle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-background border-white/10">
                <DialogHeader>
                  <DialogTitle>New Battle</DialogTitle>
                  <DialogDescription>
                    Create a new weekly battle. This will be in draft mode until you publish it.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    In a real app, there would be a form here to create a new battle.
                  </p>
                  <Button
                    className="w-full bg-sixty40-purple hover:bg-sixty40-purple/90"
                    onClick={() => {
                      toast({
                        title: "Created!",
                        description: "New battle has been created in draft mode",
                      });
                    }}
                  >
                    Create Battle
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4">Current Week</h3>
            <Card className="bg-transparent border-white/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-600">Live</Badge>
                      <span className="text-muted-foreground text-sm">
                        Week 15 • Ends {new Date(CURRENT_WEEK.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-1">{CURRENT_WEEK.theme}</h4>
                    <p className="text-muted-foreground">
                      {CURRENT_WEEK.products.length} entries • {productVotes()} votes so far
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye size={16} className="mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-black/20 p-4 flex justify-between border-t border-white/10">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Calendar size={14} className="mr-2" />
                  Created on {new Date(CURRENT_WEEK.startDate).toLocaleDateString()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                >
                  <AlertTriangle size={14} className="mr-2" />
                  End Voting Early
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Previous Weeks</h3>
            <div className="space-y-4">
              {PREVIOUS_WEEKS.map((week) => (
                <Card key={week.id} className="bg-transparent border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-gray-600">Completed</Badge>
                          <span className="text-muted-foreground text-sm">
                            {week.date}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold mb-1">{week.theme}</h4>
                        <p className="text-muted-foreground">
                          Winner: {week.winner}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit size={16} className="mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper function to simulate random votes for demo purposes
const productVotes = () => {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
};

export default Admin;
