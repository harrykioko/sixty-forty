import React, { useState } from 'react';
import { Week } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { useWeekManagement } from '@/hooks/use-week-management';
import { useToast } from '@/hooks/use-toast';
import { Plus, CheckCircle, Hourglass, StopCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

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
    active: "outline",
    voting: "default",
    completed: "destructive"
  } as const;

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-background/50 backdrop-blur-lg p-6 rounded-lg border border-white/10">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Admin Actions</h2>
        <Badge variant={statusToVariant[currentWeek.status]}>
          Status: {currentWeek.status}
        </Badge>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={onCreateNewBattleWeek}
          className="mt-4 md:mt-0 bg-sixty40-purple hover:bg-sixty40-purple/90"
          disabled={isLoading}
        >
          <Plus size={16} className="mr-2" />
          Create New Battle
        </Button>

        <Button
          onClick={onEmailSubscribers}
          variant="outline"
          className="border-white/10"
          disabled={isLoading}
        >
          Email Subscribers
        </Button>

        {currentWeek.status === 'draft' && (
          <Button
            onClick={() => handleStatusUpdate('active')}
            className="bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            <CheckCircle size={16} className="mr-2" />
            Publish Battle
          </Button>
        )}

        {currentWeek.status === 'active' && (
          <Button
            onClick={() => handleStatusUpdate('voting')}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            <Hourglass size={16} className="mr-2" />
            Start Voting
          </Button>
        )}

        {currentWeek.status === 'voting' && (
          <Button
            onClick={() => handleStatusUpdate('completed')}
            variant="outline"
            className="border-white/10"
            disabled={isLoading}
          >
            <StopCircle size={16} className="mr-2" />
            End Voting
          </Button>
        )}

        {currentWeek.status === 'completed' && (
          <Button
            onClick={() => handleSelectWinner('builder_1')}
            variant="outline"
            className="border-white/10"
            disabled={isLoading}
          >
            Select Winner
          </Button>
        )}
      </div>
    </div>
  );
};
