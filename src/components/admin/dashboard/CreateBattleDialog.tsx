
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useWeekManagement } from "@/hooks/use-week-management";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CreateBattleDialog = () => {
  const { toast } = useToast();
  const { createOrUpdateWeek, isLoading } = useWeekManagement();
  const [open, setOpen] = useState(false);
  const [weekNumber, setWeekNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createOrUpdateWeek({
        number: parseInt(weekNumber),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'draft'
      });

      toast({
        title: "Battle Created",
        description: `Week ${weekNumber} has been created successfully.`,
      });
      
      setOpen(false);
      // Reset form
      setWeekNumber("");
      setStartDate("");
      setEndDate("");
      
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 md:mt-0 bg-sixty40-purple hover:bg-sixty40-purple/90">
          <Plus size={16} className="mr-2" />
          Create New Battle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-white/10">
        <DialogHeader>
          <DialogTitle>New Battle</DialogTitle>
          <DialogDescription>
            Create a new weekly battle. This will be in draft mode until you publish it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weekNumber">Week Number</Label>
            <Input
              id="weekNumber"
              type="number"
              required
              value={weekNumber}
              onChange={(e) => setWeekNumber(e.target.value)}
              placeholder="Enter week number"
              min="1"
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-background"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-sixty40-purple hover:bg-sixty40-purple/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Battle"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
