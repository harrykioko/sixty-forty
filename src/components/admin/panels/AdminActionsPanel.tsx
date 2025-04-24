
import React, { useState } from 'react';
import { Week } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWeekManagement } from '@/hooks/use-week-management';
import { useToast } from '@/hooks/use-toast';
import { Plus, Play, Stop, Trophy, ArrowRight } from 'lucide-react';

interface AdminActionsPanelProps {
  currentWeek: Week;
  onCreateNewBattleWeek: () => void;
  onEmailSubscribers: () => void;
  onPublishBattle: () => void;
}

const getStatusBadgeProps = (status: string) => {
  switch (status) {
    case 'draft':
      return { variant: 'secondary', children: '🟡 Draft' };
    case 'voting':
      return { variant: 'default', className: 'bg-green-600', children: '🟢 Voting Open' };
    case 'active':
      return { variant: 'default', className: 'bg-blue-600', children: '🔵 Active' };
    case 'completed':
      return { variant: 'default', className: 'bg-gray-600', children: '⚫ Completed' };
    default:
      return { variant: 'secondary', children: status };
  }
};

export const AdminActionsPanel = ({
  currentWeek,
  onCreateNewBattleWeek,
  onEmailSubscribers,
  onPublishBattle
}: AdminActionsPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createOrUpdateWeek } = useWeekManagement(currentWeek);
  const { toast } = useToast();

  const updateWeekStatus = async (status: string) => {
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
              <Stop size={16} className="mr-2" />
              End Voting
            </Button>
            <Button
              onClick={() => handleSelectWinner('builder_1')} // Simplified for demo
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
        <Badge {...getStatusBadgeProps(currentWeek.status)} />
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
