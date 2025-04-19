
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Week } from "@/types/admin";

export const useWeekManager = (currentWeek: Week) => {
  const [isEditingWeek, setIsEditingWeek] = useState(false);
  const { toast } = useToast();
  
  const handleEndVoting = () => {
    toast({
      title: "Voting ended",
      description: "Voting has been ended for the current week."
    });
  };
  
  const handleCreateNewWeek = () => {
    toast({
      title: "New week created",
      description: "A new week has been created. Please edit the details."
    });
    setIsEditingWeek(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return {
    isEditingWeek,
    setIsEditingWeek,
    handleEndVoting,
    handleCreateNewWeek,
    formatDate
  };
};
