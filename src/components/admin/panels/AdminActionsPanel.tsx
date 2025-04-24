
import React, { useState } from 'react';
import { Week } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { useWeekManagement } from '@/hooks/use-week-management';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

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

  const handlePublishBattle = async () => {
    setIsLoading(true);
    try {
      await createOrUpdateWeek({
        id: currentWeek.id,
        status: 'active'
      });
      
      toast({
        title: "Battle Published",
        description: "The battle is now live on the site."
      });
      
      onPublishBattle();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish battle. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndVoting = async () => {
    setIsLoading(true);
    try {
      await createOrUpdateWeek({
        id: currentWeek.id,
        status: 'completed'
      });
      
      toast({
        title: "Voting Ended",
        description: "Voting has been closed for this battle."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end voting. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectWinner = async (builderId: string) => {
    setIsLoading(true);
    try {
      await createOrUpdateWeek({
        id: currentWeek.id,
        winnerId: builderId
      });
      
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

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-background/50 backdrop-blur-lg p-6 rounded-lg border border-white/10">
      <h2 className="text-xl font-bold">Admin Actions</h2>
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
        
        <Button
          onClick={handlePublishBattle}
          className="bg-green-600 hover:bg-green-700"
          disabled={isLoading || currentWeek.status === 'active'}
        >
          Publish Battle
        </Button>

        {currentWeek.status === 'active' && (
          <Button
            onClick={handleEndVoting}
            variant="outline"
            className="border-white/10"
            disabled={isLoading}
          >
            End Voting
          </Button>
        )}
      </div>
    </div>
  );
};
