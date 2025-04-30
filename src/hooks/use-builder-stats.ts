import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BuilderStatsProps } from "@/components/sections/builders/BuilderCard";

export function useBuilderStats<T = BuilderStatsProps[]>() {
  return useQuery<T>({
    queryKey: ["builder-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builder_stats")
        .select(`
          *,
          builder:builders(
            name,
            avatar_url,
            tagline,
            slug
          )
        `);

      if (error) throw error;
      return data as T;
    },
  });
}

