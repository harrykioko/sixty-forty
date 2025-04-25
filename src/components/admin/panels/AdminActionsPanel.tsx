
import React, { useState } from 'react';
import { Week } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useWeekManagement } from '@/hooks/use-week-management';
import { useToast } from '@/hooks/use-toast';
import { Plus, Mail, CheckCircle } from 'lucide-react';
import { StatusTimeline } from './StatusTimeline';

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

  return (
    <Card className="bg-background/50 backdrop-blur-lg border-white/10">
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight">Battle Management</h2>
          <StatusTimeline 
            currentStatus={currentWeek.status} 
            onStatusChange={handleStatusUpdate}
            isEditable={true}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
            <Mail className="h-4 w-4 mr-2" />
            Email Subscribers
          </Button>

          {currentWeek.status === 'completed' && (
            <Button
              onClick={() => handleSelectWinner('builder_1')}
              variant="outline"
              className="border-white/10 hover:bg-white/5 transition-colors"
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Select Winner
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
