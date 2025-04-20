
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useBuilderStats() {
  return useQuery({
    queryKey: ["builder-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builder_stats")
        .select(`
          *,
          builder:builders(
            name,
            avatar_url,
            tagline
          )
        `);

      if (error) throw error;
      return data;
    },
  });
}

