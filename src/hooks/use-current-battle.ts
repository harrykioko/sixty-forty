
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const fetchCurrentBattle = async () => {
  // First try to fetch a 'draft' or 'active' week
  const { data: currentWeek, error: weekError } = await supabase
    .from('weeks')
    .select('*')
    .in('status', ['draft', 'active'])
    .order('created_at', { ascending: false })
    .limit(1);

  if (weekError) {
    throw weekError;
  }

  console.log("Fetched current week from Supabase:", currentWeek);

  if (!currentWeek?.[0]) {
    return { 
      currentWeek: null, 
      products: [],
      isBuildingPhase: false 
    };
  }

  // Fetch products for the current week
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      id,
      name,
      short_desc,
      image_url,
      tech_stack,
      builder_id,
      builders (
        name,
        slug,
        avatar_url
      )
    `)
    .eq('week_id', currentWeek[0].id);

  if (productsError) throw productsError;

  return {
    currentWeek: currentWeek[0],
    products: products || [],
    isBuildingPhase: currentWeek[0].status === 'draft'
  };
};

export const useCurrentBattle = () => {
  return useQuery({
    queryKey: ['currentBattle'],
    queryFn: fetchCurrentBattle
  });
};
