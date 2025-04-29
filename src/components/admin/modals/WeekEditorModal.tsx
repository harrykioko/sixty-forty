import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/Modal";
import { WeekDatePicker } from "@/components/admin/modals/components/WeekDatePicker";
import { WeekNumberInput } from "@/components/admin/modals/components/WeekNumberInput";
import { StatusSelect } from "@/components/admin/modals/components/StatusSelect";
import { Button } from "@/components/ui/button";
import { Week } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { useWeekManagement } from "@/hooks/use-week-management";

interface WeekEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentWeek?: Week;
  onSave: (weekData: Partial<Week>) => void;
  onEndVoting: () => void;
}

export const WeekEditorModal = ({
  open,
  onOpenChange,
  currentWeek,
  onSave,
  onEndVoting
}: WeekEditorModalProps) => {
  const [weekNumber, setWeekNumber] = useState<number>(currentWeek?.number || 1);
  const [startDate, setStartDate] = useState<Date | undefined>(currentWeek?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(currentWeek?.endDate);
  const [status, setStatus] = useState<Week['status']>(currentWeek?.status || 'draft');
  const { toast } = useToast();
  const { createOrUpdateWeek } = useWeekManagement(currentWeek || {} as Week);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentWeek) {
      setWeekNumber(currentWeek.number);
      setStartDate(currentWeek.startDate);
      setEndDate(currentWeek.endDate);
      setStatus(currentWeek.status);
    }
  }, [currentWeek]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (!startDate || !endDate) {
        toast({
          title: "Error",
          description: "Please select both start and end dates.",
          variant: "destructive"
        });
        return;
      }

      const weekData = {
        id: currentWeek?.id,
        number: weekNumber,
        startDate,
        endDate,
        status
      };

      await createOrUpdateWeek(weekData);
      onSave(weekData);
      onOpenChange(false);
      
      toast({
        title: "Success",
        description: "Week details saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save week details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (newStatus: Week['status']) => {
    setStatus(newStatus);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="glass border border-white/10 shadow-xl backdrop-blur-lg sm:max-w-[425px] animate-in fade-in-0 zoom-in-95">
        <ModalHeader>
          <ModalTitle className="gradient-text text-2xl">
            Edit Week Details
          </ModalTitle>
          <ModalDescription className="text-muted-foreground">
            Make changes to the current battle week details here.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-6 py-4">
          <WeekNumberInput 
            value={weekNumber.toString()} 
            onChange={(value) => setWeekNumber(Number(value))}
          />

          <WeekDatePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          <StatusSelect
            value={status}
            onChange={handleStatusChange}
          />
        </div>

        <ModalFooter className="flex justify-between items-center border-t border-white/10 pt-4 mt-4">
          {status === 'voting' && (
            <Button
              onClick={onEndVoting}
              variant="outline"
              className="glass-button-destructive"
            >
              <X className="w-4 h-4 mr-2" />
              End Voting Early
            </Button>
          )}
          <div className="flex gap-3 ml-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="glass-button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="gradient-button"
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
