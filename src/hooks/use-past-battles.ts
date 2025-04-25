
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Week } from '@/types/admin';
import { mapSupabaseWeek } from '@/utils/mapSupabase';

const fetchPastBattles = async (): Promise<Week[]> => {
  const { data, error } = await supabase
    .from('weeks')
    .select(`
      *,
      products!fk_products_week_id (
        *,
        builders (
          name,
          avatar_url
        )
      )
    `)
    .eq('status', 'completed')
    .order('number', { ascending: false });

  if (error) {
    console.error('Error fetching past battles:', error);
    throw error;
  }
  
  return (data || []).map(mapSupabaseWeek);
};

export const usePastBattles = () => {
  return useQuery({
    queryKey: ['pastBattles'],
    queryFn: fetchPastBattles
  });
};
