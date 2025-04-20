
import { useState } from "react";
import { Calendar, Edit, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WeekEditorModal } from "@/components/admin/modals/WeekEditorModal";
import { WeekManagerProps, Week } from "@/types/admin";
import { useWeekManagement } from "@/hooks/use-week-management";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const WeekManagerPanel = ({
  currentWeek,
  onEndVoting,
  onCreateNewWeek,
  formatDate,
}: WeekManagerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWeek, setEditingWeek] = useState<Week | undefined>();
  const [isUpdating, setIsUpdating] = useState(false);
  const { createOrUpdateWeek } = useWeekManagement();
  const { toast } = useToast();

  const isBattleActive = currentWeek.status === 'active';

  const handleOpenCreate = () => {
    setEditingWeek(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = () => {
    setEditingWeek(currentWeek);
    setIsModalOpen(true);
  };

  const handleSaveWeek = async (weekData: Partial<Week>) => {
    try {
      await createOrUpdateWeek(weekData);
      setIsModalOpen(false);
      onCreateNewWeek();
    } catch (error) {
      console.error('Failed to save week:', error);
    }
  };

  const handleToggleBattleStatus = async () => {
    try {
      setIsUpdating(true);
      const newStatus = isBattleActive ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('weeks')
        .update({ status: newStatus })
        .eq('id', currentWeek.id);

      if (error) throw error;

      toast({
        title: "Battle status updated",
        description: `Battle is now ${newStatus}`,
      });

    } catch (error) {
      console.error('Error updating battle status:', error);
      toast({
        title: "Error",
        description: "Failed to update battle status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Card className="glass-card border-white/10 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Badge className="mb-2 bg-sixty40-purple/20 text-sixty40-purple">
                Week {currentWeek.id.split('-')[1] || '1'}
              </Badge>
              <CardTitle className="text-2xl md:text-3xl">{currentWeek.theme}</CardTitle>
              <CardDescription className="mt-1">
                <span className="inline-flex items-center">
                  <Calendar size={14} className="mr-1 text-muted-foreground" />
                  {formatDate(currentWeek.startDate)} - {formatDate(currentWeek.endDate)}
                </span>
                <Badge className="ml-3 bg-sixty40-blue/20 text-sixty40-blue">
                  {currentWeek.status}
                </Badge>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 mr-4">
                <Switch
                  checked={isBattleActive}
                  onCheckedChange={handleToggleBattleStatus}
                  disabled={isUpdating}
                  className="data-[state=checked]:bg-sixty40-purple"
                />
                <span className="text-sm">
                  {isBattleActive ? 'Battle Active' : 'Battle Inactive'}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/20 hover:bg-white/10"
                onClick={handleOpenEdit}
              >
                <Edit size={14} className="mr-1" />
                Edit Week Details
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/20 hover:bg-white/10"
                onClick={onEndVoting}
              >
                <X size={14} className="mr-1" />
                End Voting
              </Button>
              <Button 
                size="sm"
                className="bg-sixty40-purple hover:bg-sixty40-purple/90"
                onClick={handleOpenCreate}
              >
                <Plus size={14} className="mr-1" />
                Create New Week
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <WeekEditorModal
        weekData={editingWeek}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWeek}
      />
    </>
  );
};
