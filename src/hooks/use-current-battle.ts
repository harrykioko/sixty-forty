
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Builder {
  name: string;
  slug: string;
  avatar_url: string | null;
}

interface Product {
  id: string;
  name: string;
  short_desc: string | null;
  image_url: string | null;
  tech_stack: string[] | null;
  builder_id: string | null;
  builders: Builder | null;
}

interface Week {
  id: string;
  number: number;
  status: string;
  start_date: string;
  end_date: string;
}

const fetchCurrentBattle = async () => {
  // Fetch current week with status
  const { data: currentWeek, error: weekError } = await supabase
    .from('weeks')
    .select('*')
    .eq('status', 'live')
    .single();

  if (weekError) {
    if (weekError.code === 'PGRST116') {
      return { currentWeek: null, products: [] };
    }
    throw weekError;
  }

  if (!currentWeek) {
    return { currentWeek: null, products: [] };
  }

  // Fetch products associated with the current week
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
    .eq('week_id', currentWeek.id);

  if (productsError) throw productsError;

  return {
    currentWeek,
    products: products || []
  };
};

export const useCurrentBattle = () => {
  return useQuery({
    queryKey: ['currentBattle'],
    queryFn: fetchCurrentBattle
  });
};

