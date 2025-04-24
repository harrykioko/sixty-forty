
import { Week } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AdminActionsProps {
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
}: AdminActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-background/50 backdrop-blur-lg p-6 rounded-lg border border-white/10">
      <h2 className="text-xl font-bold">Admin Actions</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={onCreateNewBattleWeek}
          className="mt-4 md:mt-0 bg-sixty40-purple hover:bg-sixty40-purple/90"
        >
          <Plus size={16} className="mr-2" />
          Create New Battle
        </Button>
        
        <Button
          onClick={onEmailSubscribers}
          variant="outline"
          className="border-white/10"
        >
          Email Subscribers
        </Button>
        
        <Button
          onClick={onPublishBattle}
          className="bg-green-600 hover:bg-green-700"
        >
          Publish Battle
        </Button>
      </div>
    </div>
  );
};
