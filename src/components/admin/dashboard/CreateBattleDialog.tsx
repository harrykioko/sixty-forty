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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Week } from '@/types/admin';
// Update the import of useWeekManagement - required parameter
import { useWeekManagement } from "@/hooks/use-week-management";

interface CreateBattleDialogProps {
  onCreate: (week: Week) => void;
}

const CreateBattleDialog = ({ onCreate }: CreateBattleDialogProps) => {
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
  const [open, setOpen] = useState(false);

  // Inside the component, add a mock currentWeek for the initial empty state
  // After the state declarations but before useWeekManagement is called, add:
  const emptyWeek = {
    id: '',
    number: 1,
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    status: 'draft' as const,
    products: []
  };

  // Then update the useWeekManagement hook call to pass the emptyWeek
  // Replace the line:
  // const { createOrUpdateWeek } = useWeekManagement();
  // With:
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
        onCreate({
          id: createdWeek.id,
          number: createdWeek.number,
          startDate: new Date(createdWeek.start_date),
          endDate: new Date(createdWeek.end_date),
          status: createdWeek.status as 'draft' | 'active' | 'voting' | 'completed',
          products: [],
        });
        setOpen(false);
      } else {
        alert('Failed to create week.');
      }
    } catch (error) {
      console.error("Error creating week:", error);
      alert('Failed to create week.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create New Battle</Button>
      </AlertDialogTrigger>
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
