
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PastBattle {
  id: string;
  number: number;
  start_date: string;
  end_date: string;
  winner_id: string | null;
  products: Array<{
    id: string;
    name: string;
    image_url: string | null;
    builder_id: string | null;
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
      winner_id,
      products (
        id,
        name,
        image_url,
        builder_id,
        builders (
          name,
          avatar_url
        )
      )
    `)
    .eq('status', 'closed')
    .order('number', { ascending: false });

  if (error) throw error;
  
  // Ensure products is always an array for each battle
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

