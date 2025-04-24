import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Week } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { useWeekManagement } from "@/hooks/use-week-management";

interface WeekEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentWeek: Week;
  onSave: (weekData: Week) => void;
}

export const WeekEditorModal = ({
  open,
  onOpenChange,
  currentWeek,
  onSave
}: WeekEditorModalProps) => {
  const [weekNumber, setWeekNumber] = useState<number>(currentWeek?.number || 1);
  const [startDate, setStartDate] = useState<Date | undefined>(currentWeek?.startDate || undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(currentWeek?.endDate || undefined);
  const { toast } = useToast();
  const { createOrUpdateWeek } = useWeekManagement(currentWeek);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentWeek) {
      setWeekNumber(currentWeek.number);
      setStartDate(currentWeek.startDate);
      setEndDate(currentWeek.endDate);
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
        id: currentWeek.id,
        number: weekNumber,
        startDate: startDate,
        endDate: endDate,
        status: currentWeek.status
      };

      await createOrUpdateWeek(weekData);

      toast({
        title: "Success",
        description: "Week details saved successfully."
      });

      onSave({
        ...currentWeek,
        number: weekNumber,
        startDate: startDate,
        endDate: endDate
      });
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Week Details</DialogTitle>
          <DialogDescription>
            Make changes to the current battle week details here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weekNumber" className="text-right">
              Week Number
            </Label>
            <Input
              type="number"
              id="weekNumber"
              value={weekNumber}
              onChange={(e) => setWeekNumber(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 pl-3 text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date('2024-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 pl-3 text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) =>
                    date < (startDate || new Date())
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
