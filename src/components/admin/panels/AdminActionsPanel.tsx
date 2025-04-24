import React, { useState } from 'react';
import { Week } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useWeekManagement } from '@/hooks/use-week-management';
import { useToast } from '@/hooks/use-toast';
import { Plus, CheckCircle, Hourglass, StopCircle } from 'lucide-react';

interface AdminActionsPanelProps {
  currentWeek: Week;
  onCreateNewBattleWeek: () => void;
  onEmailSubscribers: () => void;
  onPublishBattle: () => void;
}

export const AdminActionsPanel = ({
  currentWeek,
  onCreateNewBattleWeek,
  onEmailSubscribers,
  onPublishBattle
}: AdminActionsPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createOrUpdateWeek } = useWeekManagement(currentWeek);
  const { toast } = useToast();

  const handleStatusUpdate = async (status: Week['status']) => {
    setIsLoading(true);
    try {
      await createOrUpdateWeek({ id: currentWeek.id, status });
      toast({
        title: `Status Updated`,
        description: `Week status changed to '${status}'.`
      });
      if (status === 'active') onPublishBattle();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectWinner = async (builderId: string) => {
    setIsLoading(true);
    try {
      await createOrUpdateWeek({ id: currentWeek.id, winnerId: builderId });
      toast({
        title: "Winner Selected",
        description: "The battle winner has been updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to select winner. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statusToVariant = {
    draft: "secondary",
    active: "default",
    voting: "outline",
    completed: "destructive"
  } as const;

  return (
    <Card className="bg-background/50 backdrop-blur-lg border-white/10">
      <div className="p-6 flex flex-col lg:flex-row items-start justify-between gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight">Admin Actions</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge variant={statusToVariant[currentWeek.status]} className="capitalize">
              {currentWeek.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-auto-fit gap-3 w-full lg:w-auto min-w-[200px]">
          <Button
            onClick={onCreateNewBattleWeek}
            className="bg-sixty40-purple hover:bg-sixty40-purple/90 transition-colors"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Battle
          </Button>

          <Button
            onClick={onEmailSubscribers}
            variant="outline"
            className="border-white/10 hover:bg-white/5 transition-colors"
            disabled={isLoading}
          >
            Email Subscribers
          </Button>

          {currentWeek.status === 'draft' && (
            <Button
              onClick={() => handleStatusUpdate('active')}
              className="bg-emerald-600 hover:bg-emerald-700 transition-colors"
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Publish Battle
            </Button>
          )}

          {currentWeek.status === 'active' && (
            <Button
              onClick={() => handleStatusUpdate('voting')}
              className="bg-sixty40-blue hover:bg-sixty40-blue/90 transition-colors"
              disabled={isLoading}
            >
              <Hourglass className="h-4 w-4 mr-2" />
              Start Voting
            </Button>
          )}

          {currentWeek.status === 'voting' && (
            <Button
              onClick={() => handleStatusUpdate('completed')}
              variant="outline"
              className="border-white/10 hover:bg-white/5 transition-colors"
              disabled={isLoading}
            >
              <StopCircle className="h-4 w-4 mr-2" />
              End Voting
            </Button>
          )}

          {currentWeek.status === 'completed' && (
            <Button
              onClick={() => handleSelectWinner('builder_1')}
              variant="outline"
              className="border-white/10 hover:bg-white/5 transition-colors"
              disabled={isLoading}
            >
              Select Winner
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
