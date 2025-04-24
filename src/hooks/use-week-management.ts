
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Week } from "@/types/admin";
import { supabase } from '@/integrations/supabase/client';

export const useWeekManagement = (currentWeek: Week) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const createOrUpdateWeek = async (weekData: Partial<Week>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('weeks')
        .upsert({
          id: weekData.id,
          number: weekData.number,
          start_date: weekData.startDate?.toISOString().split('T')[0],
          end_date: weekData.endDate?.toISOString().split('T')[0],
          status: weekData.status,
          winner_id: weekData.winnerId
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return {
    isLoading,
    createOrUpdateWeek,
    formatDate
  };
};
