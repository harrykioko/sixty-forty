
import { useState } from "react";
import { motion } from "framer-motion";
import { Week } from "@/types/admin";
import { useWeekManagement } from "@/hooks/use-week-management";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WeekNumberInput } from "./components/WeekNumberInput";
import { DatePickerField } from "./components/DatePickerField";
import { StatusSelect } from "./components/StatusSelect";
import { useToast } from "@/hooks/use-toast";
import { StopCircle } from "lucide-react";

interface WeekEditorModalProps {
  weekData?: Week;
  onSave: (data: Partial<Week>) => void;
  onClose: () => void;
  open: boolean;
}

export function WeekEditorModal({ weekData, onSave, onClose, open }: WeekEditorModalProps) {
  const { toast } = useToast();
  const { createOrUpdateWeek, isLoading: isSaving } = useWeekManagement();
  const isEditing = Boolean(weekData);
  
  const [weekNumber, setWeekNumber] = useState(weekData?.number?.toString() || '');
  const [startDate, setStartDate] = useState<Date | undefined>(weekData?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(weekData?.endDate);
  const [status, setStatus] = useState<Week['status']>(weekData?.status || 'draft');
  const [isEndingVote, setIsEndingVote] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!weekNumber) newErrors.weekNumber = "Week number is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    
    if (startDate && endDate && startDate >= endDate) {
      newErrors.endDate = "End date must be after start date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const weekDataToSave = {
        id: weekData?.id || `week-${weekNumber}`,
        number: parseInt(weekNumber, 10),
        startDate: startDate as Date,
        endDate: endDate as Date,
        status,
        products: weekData?.products || []
      };

      await createOrUpdateWeek(weekDataToSave);
      
      toast({
        title: `Week ${isEditing ? 'Updated' : 'Created'}`,
        description: `Week ${weekNumber} has been ${isEditing ? 'updated' : 'created'} successfully.`
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleEndVoting = async () => {
    if (!weekData?.id) return;
    
    try {
      setIsEndingVote(true);
      await createOrUpdateWeek({
        ...weekData,
        status: 'completed'
      });
      
      toast({
        title: "Voting Ended",
        description: `Voting for Week ${weekData.number} has been closed.`
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsEndingVote(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px] border border-white/10 bg-background/80 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Week Details" : "Create New Week"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <WeekNumberInput
              value={weekNumber}
              onChange={setWeekNumber}
              error={errors.weekNumber}
            />

            <DatePickerField
              label="Start Date"
              date={startDate}
              onSelect={setStartDate}
              error={errors.startDate}
            />

            <DatePickerField
              label="End Date"
              date={endDate}
              onSelect={setEndDate}
              error={errors.endDate}
            />

            <StatusSelect
              value={status}
              onChange={(value) => setStatus(value as Week['status'])}
            />
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSaving}
                className="bg-sixty40-purple hover:bg-sixty40-purple/90"
              >
                {isSaving ? "Saving..." : "Save Week"}
              </Button>
            </div>
            
            {weekData?.status === 'voting' && (
              <Button
                variant="destructive"
                onClick={handleEndVoting}
                disabled={isEndingVote}
                className="w-full mt-2"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                {isEndingVote ? "Ending Voting..." : "End Voting"}
              </Button>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
