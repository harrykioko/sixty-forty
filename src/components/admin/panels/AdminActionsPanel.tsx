
import { Archive, ExternalLink, Mail, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AdminActionsProps } from "@/types/admin";

export const AdminActionsPanel = ({
  currentWeek,
  onEmailSubscribers,
  onPublishBattle,
}: AdminActionsProps) => {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle>Admin Actions</CardTitle>
        <CardDescription>
          Manage the current battle and perform administrative tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center">
              <TrendingUp size={16} className="mr-2 text-sixty40-blue" />
              Current Votes
            </h4>
            {currentWeek.products.map(product => (
              <div key={product.id} className="flex justify-between items-center">
                <span className="text-sm truncate max-w-[180px]">{product.title}</span>
                <Badge variant="outline" className="bg-white/5">
                  {product.votes} votes
                </Badge>
              </div>
            ))}
            
            {currentWeek.products.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No products submitted yet
              </div>
            )}
          </div>
          
          <div className="col-span-2">
            <div className="flex flex-col space-y-2">
              <div className="bg-white/5 p-3 rounded-md mb-4">
                <h4 className="text-sm font-medium mb-2">Battle Readiness</h4>
                {currentWeek.products.length === 2 ? (
                  <div className="flex items-center">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-sixty40-blue to-sixty40-purple h-2 rounded-full"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <span className="ml-2 text-xs text-green-500">Ready</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: '50%' }}
                      />
                    </div>
                    <span className="ml-2 text-xs text-yellow-500">Missing products</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline"
                  className="border-white/20 hover:bg-white/10"
                >
                  <Archive size={16} className="mr-2" />
                  View Past Battles
                </Button>
                <Button 
                  variant="outline"
                  className="border-white/20 hover:bg-white/10"
                  onClick={onEmailSubscribers}
                >
                  <Mail size={16} className="mr-2" />
                  Email All Subscribers
                </Button>
                <Button 
                  className="bg-sixty40-purple hover:bg-sixty40-purple/90"
                  onClick={onPublishBattle}
                  disabled={currentWeek.products.length < 2}
                >
                  <ExternalLink size={16} className="mr-2" />
                  Publish This Battle
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
