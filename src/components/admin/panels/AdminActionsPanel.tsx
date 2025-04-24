
import React, { useState } from 'react';
import { Week } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWeekManagement } from '@/hooks/use-week-management';
import { useToast } from '@/hooks/use-toast';
import { Plus, Play, StopCircle, Trophy, ArrowRight } from 'lucide-react';

interface AdminActionsPanelProps {
  currentWeek: Week;
  onCreateNewBattleWeek: () => void;
  onEmailSubscribers: () => void;
  onPublishBattle: () => void;
}

const statusConfig = {
  draft: {
    badge: { variant: "secondary" as const, label: "🟡 Draft" },
    actions: ['voting', 'active']
  },
  voting: {
    badge: { variant: "default" as const, label: "🟢 Voting Open" },
    actions: ['active', 'completed']
  },
  active: {
    badge: { variant: "outline" as const, label: "🔵 Active" },
    actions: ['completed']
  },
  completed: {
    badge: { variant: "destructive" as const, label: "⚫ Completed" },
    actions: []
  }
} as const;

export const AdminActionsPanel = ({
  currentWeek,
  onCreateNewBattleWeek,
  onEmailSubscribers,
  onPublishBattle
}: AdminActionsPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createOrUpdateWeek } = useWeekManagement(currentWeek);
  const { toast } = useToast();

  const updateWeekStatus = async (status: Week['status']) => {
    setIsLoading(true);
    try {
      await createOrUpdateWeek({
        id: currentWeek.id,
        status
      });
      
      toast({
        title: "Status Updated",
        description: `Battle week is now in ${status} status.`
      });
      
      if (status === 'active') {
        onPublishBattle();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update status to ${status}. Please try again.`,
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
        winnerId: builderId,
        status: 'completed'
      });
      
      toast({
        title: "Winner Selected",
        description: "The battle winner has been updated and battle marked as completed."
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

  const renderActionButtons = () => {
    const config = statusConfig[currentWeek.status];
    
    switch (currentWeek.status) {
      case 'draft':
        return (
          <>
            <Button
              onClick={() => updateWeekStatus('voting')}
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              <Play size={16} className="mr-2" />
              Start Voting
            </Button>
            <Button
              onClick={() => updateWeekStatus('active')}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              <ArrowRight size={16} className="mr-2" />
              Publish Battle
            </Button>
          </>
        );
      case 'voting':
      case 'active':
        return (
          <>
            <Button
              onClick={() => updateWeekStatus('completed')}
              variant="outline"
              className="border-white/10"
              disabled={isLoading}
            >
              <StopCircle size={16} className="mr-2" />
              End Voting
            </Button>
            <Button
              onClick={() => handleSelectWinner('builder_1')} 
              className="bg-sixty40-purple hover:bg-sixty40-purple/90"
              disabled={isLoading}
            >
              <Trophy size={16} className="mr-2" />
              Select Winner
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-background/50 backdrop-blur-lg p-6 rounded-lg border border-white/10">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">Admin Actions</h2>
        <Badge {...statusConfig[currentWeek.status].badge} />
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
        
        {renderActionButtons()}
        
        {currentWeek.status !== 'draft' && (
          <Button
            onClick={onEmailSubscribers}
            variant="outline"
            className="border-white/10"
            disabled={isLoading}
          >
            Email Subscribers
          </Button>
        )}
      </div>
    </div>
  );
};
