
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Week } from '@/types/admin';
import { mapSupabaseWeek } from '@/utils/mapSupabase';

const fetchPastBattles = async (): Promise<Week[]> => {
  const { data, error } = await supabase
    .from('weeks')
    .select(`
      *,
      products (
        *,
        builders (
          name,
          avatar_url
        )
      )
    `)
    .eq('status', 'completed')
    .order('number', { ascending: false });

  if (error) throw error;
  
  return (data || []).map(mapSupabaseWeek);
};

export const usePastBattles = () => {
  return useQuery({
    queryKey: ['pastBattles'],
    queryFn: fetchPastBattles
  });
};
