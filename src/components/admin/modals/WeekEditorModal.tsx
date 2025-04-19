
import { useState } from "react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils"; // Add this import
import { Week } from "@/types/admin";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WeekEditorModalProps {
  weekData?: Week;
  onSave: (data: Partial<Week>) => void;
  onClose: () => void;
  open: boolean;
}

export function WeekEditorModal({ weekData, onSave, onClose, open }: WeekEditorModalProps) {
  const isEditing = Boolean(weekData);
  const [weekNumber, setWeekNumber] = useState(weekData?.id.split('-')[1] || '');
  const [theme, setTheme] = useState(weekData?.theme || '');
  const [startDate, setStartDate] = useState<Date | undefined>(weekData?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(weekData?.endDate);
  const [status, setStatus] = useState(weekData?.status || 'draft');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!weekNumber) newErrors.weekNumber = "Week number is required";
    if (!theme) newErrors.theme = "Theme is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSave({
      id: `week-${weekNumber}`,
      theme,
      startDate: startDate as Date,
      endDate: endDate as Date,
      status,
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
            <div className="grid gap-2">
              <Label htmlFor="weekNumber">Week Number</Label>
              <Input
                id="weekNumber"
                type="number"
                value={weekNumber}
                onChange={(e) => setWeekNumber(e.target.value)}
                className={errors.weekNumber ? "border-red-500" : ""}
              />
              {errors.weekNumber && (
                <span className="text-sm text-red-500">{errors.weekNumber}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="theme">Week Theme</Label>
              <Input
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={errors.theme ? "border-red-500" : ""}
              />
              {errors.theme && (
                <span className="text-sm text-red-500">{errors.theme}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !startDate && "text-muted-foreground",
                      errors.startDate && "border-red-500"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && (
                <span className="text-sm text-red-500">{errors.startDate}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !endDate && "text-muted-foreground",
                      errors.endDate && "border-red-500"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <span className="text-sm text-red-500">{errors.endDate}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
