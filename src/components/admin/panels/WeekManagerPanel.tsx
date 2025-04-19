import { useState } from "react";
import { Calendar, Edit, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WeekEditorModal } from "@/components/admin/modals/WeekEditorModal";
import { WeekManagerProps, Week } from "@/types/admin";

export const WeekManagerPanel = ({
  currentWeek,
  onEndVoting,
  onCreateNewWeek,
  formatDate,
}: WeekManagerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWeek, setEditingWeek] = useState<Week | undefined>();

  const handleOpenCreate = () => {
    setEditingWeek(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = () => {
    setEditingWeek(currentWeek);
    setIsModalOpen(true);
  };

  const handleSaveWeek = (weekData: Partial<Week>) => {
    if (editingWeek) {
      // Handle edit
      console.log("Editing week:", weekData);
    } else {
      // Handle create
      onCreateNewWeek();
    }
    setIsModalOpen(false);
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
