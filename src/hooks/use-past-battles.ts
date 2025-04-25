
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { WeekStatus } from '@/types/admin';

interface PastBattle {
  id: string;
  number: number;
  start_date: string;
  end_date: string;
  status: WeekStatus;
  winner_id: string | null;
  created_at: string | null;
  products: Array<{
    id: string;
    name: string;
    image_url: string | null;
    builder_id: string | null;
    tech_stack: string[] | null;
    long_desc: string | null;
    builders: {
      name: string;
      avatar_url: string | null;
    } | null;
  }>;
}

const fetchPastBattles = async () => {
  const { data, error } = await supabase
    .from('weeks')
    .select(`
      id,
      number,
      start_date,
      end_date,
      status,
      winner_id,
      created_at,
      products (
        id,
        name,
        image_url,
        builder_id,
        tech_stack,
        long_desc,
        builders (
          name,
          avatar_url
        )
      )
    `)
    .eq('status', 'completed')
    .order('number', { ascending: false });

  if (error) throw error;
  
  const formattedData = data.map((battle: any) => ({
    ...battle,
    products: Array.isArray(battle.products) ? battle.products : []
  }));
  
  return formattedData as PastBattle[];
};

export const usePastBattles = () => {
  return useQuery({
    queryKey: ['pastBattles'],
    queryFn: fetchPastBattles
  });
};
