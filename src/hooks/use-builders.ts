
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useBuilders() {
  return useQuery({
    queryKey: ["builders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builders")
        .select("*")
        .order("name");

      if (error) throw error;
      return data || [];
    },
  });
}
