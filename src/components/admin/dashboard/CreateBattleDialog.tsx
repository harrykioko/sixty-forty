import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Week } from '@/types/admin';
import { useWeekManagement } from "@/hooks/use-week-management";

export interface CreateBattleDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (week: Week) => void;
}

export const CreateBattleDialog = ({ open, onClose, onCreate }: CreateBattleDialogProps) => {
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));

  const emptyWeek = {
    id: '',
    number: 1,
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    status: 'draft' as const,
    products: []
  };

  const { createOrUpdateWeek } = useWeekManagement(emptyWeek);

  const handleCreate = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const newWeekData: Partial<Week> = {
      number: weekNumber,
      startDate: startDate,
      endDate: endDate,
      status: 'draft',
    };

    try {
      const createdWeek = await createOrUpdateWeek(newWeekData);
      if (createdWeek) {
        if (onCreate) {
          onCreate({
            id: createdWeek.id,
            number: createdWeek.number,
            startDate: new Date(createdWeek.start_date),
            endDate: new Date(createdWeek.end_date),
            status: createdWeek.status as 'draft' | 'active' | 'voting' | 'completed',
            products: [],
          });
        }
        onClose();
      } else {
        alert('Failed to create week.');
      }
    } catch (error) {
      console.error("Error creating week:", error);
      alert('Failed to create week.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Battle Week</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the details for the new battle week.
          </AlertDialogDescription>
        </AlertDialogHeader>
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
                    "w-[240px] pl-3 text-left font-normal",
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
                    date > (endDate || new Date())
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
                    "w-[240px] pl-3 text-left font-normal",
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
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreate}>Create</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateBattleDialog;
