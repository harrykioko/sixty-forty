
import { Link } from "react-router-dom";
import { Plus, Edit, Eye, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AdminAuth from "@/components/admin/AdminAuth";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import { supabase } from "@/integrations/supabase/client";

import { CURRENT_WEEK, PREVIOUS_WEEKS } from "@/data/mock-data";

const Admin = () => {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useRequireAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sixty40-purple"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => {}} />;
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

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
              onClick={handleLogout}
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

const productVotes = () => {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
};

export default Admin;
