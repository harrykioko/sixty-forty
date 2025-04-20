
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
  // First try to fetch a 'live' week
  const { data: currentWeek, error: weekError } = await supabase
    .from('weeks')
    .select('*')
    .eq('status', 'live')
    .maybeSingle();

  if (weekError && weekError.code !== 'PGRST116') {
    throw weekError;
  }

  // If no live week found, try to find a 'building' week as fallback
  if (!currentWeek) {
    const { data: buildingWeek, error: buildingWeekError } = await supabase
      .from('weeks')
      .select('*')
      .eq('status', 'building')
      .maybeSingle();
      
    if (buildingWeekError && buildingWeekError.code !== 'PGRST116') {
      throw buildingWeekError;
    }
    
    if (buildingWeek) {
      // Fetch builders for a building week
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
        .eq('week_id', buildingWeek.id);
  
      if (productsError) throw productsError;
  
      return {
        currentWeek: buildingWeek,
        products: products || [],
        isBuildingPhase: true
      };
    }
    
    // If no week found at all
    return { 
      currentWeek: null, 
      products: [],
      isBuildingPhase: false 
    };
  }

  // Fetch products for live week
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
    products: products || [],
    isBuildingPhase: false
  };
};

export const useCurrentBattle = () => {
  return useQuery({
    queryKey: ['currentBattle'],
    queryFn: fetchCurrentBattle
  });
};
