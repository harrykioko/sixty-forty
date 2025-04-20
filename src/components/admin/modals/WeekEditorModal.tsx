
import { useState } from "react";
import { motion } from "framer-motion";
import { Week } from "@/types/admin";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WeekNumberInput } from "./components/WeekNumberInput";
import { DatePickerField } from "./components/DatePickerField";
import { StatusSelect } from "./components/StatusSelect";

interface WeekEditorModalProps {
  weekData?: Week;
  onSave: (data: Partial<Week>) => void;
  onClose: () => void;
  open: boolean;
}

export function WeekEditorModal({ weekData, onSave, onClose, open }: WeekEditorModalProps) {
  const isEditing = Boolean(weekData);
  const [weekNumber, setWeekNumber] = useState(weekData?.id?.split('-')[1] || '');
  const [startDate, setStartDate] = useState<Date | undefined>(weekData?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(weekData?.endDate);
  const [status, setStatus] = useState(weekData?.status || 'draft');
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

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSave({
      id: `week-${weekNumber}`,
      startDate: startDate as Date,
      endDate: endDate as Date,
      status,
      theme: '', // Added to maintain existing type compatibility
      products: weekData?.products || []
    });
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
              onChange={setStatus}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Save Week
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
