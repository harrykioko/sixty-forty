
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Week } from '@/types/admin';

export const useWeekManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createOrUpdateWeek = async (weekData: Partial<Week>) => {
    setIsLoading(true);
    try {
      // Extract week number 
      const weekNumber = weekData.number || parseInt(weekData.id?.split('-')[1], 10);
      
      if (isNaN(weekNumber)) {
        throw new Error('Invalid week number format');
      }

      const { data, error } = await supabase
        .from('weeks')
        .upsert({
          number: weekNumber,
          start_date: weekData.startDate?.toISOString().split('T')[0],
          end_date: weekData.endDate?.toISOString().split('T')[0],
          status: weekData.status || 'draft'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Week Saved',
        description: `Week ${data.number} has been ${weekData.id ? 'updated' : 'created'}.`
      });

      return data;
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrUpdateWeek, isLoading };
};
