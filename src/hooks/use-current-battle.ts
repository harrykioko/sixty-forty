
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseProduct, mapSupabaseWeek } from '@/utils/mapSupabase';

const fetchCurrentBattle = async () => {
  const { data: currentWeek, error: weekError } = await supabase
    .from('weeks')
    .select(`
      *,
      products!fk_products_week_id (
        *,
        builders (
          name,
          slug,
          avatar_url
        )
      )
    `)
    .in('status', ['draft', 'active'])
    .order('created_at', { ascending: false })
    .limit(1);

  if (weekError) {
    console.error('Error fetching current battle:', weekError);
    throw weekError;
  }

  if (!currentWeek?.[0]) {
    return { 
      currentWeek: null, 
      products: [],
      isBuildingPhase: false 
    };
  }

  const mappedWeek = mapSupabaseWeek(currentWeek[0]);
  const products = Array.isArray(currentWeek[0].products) 
    ? currentWeek[0].products.map(mapSupabaseProduct) 
    : [];

  return {
    currentWeek: mappedWeek,
    products,
    isBuildingPhase: mappedWeek.status === 'draft'
  };
};

export const useCurrentBattle = () => {
  return useQuery({
    queryKey: ['currentBattle'],
    queryFn: fetchCurrentBattle
  });
};
