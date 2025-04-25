
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProductSubmissionData {
  id?: string;
  name: string;
  builder_id: string;
  week_id: string;
  short_desc?: string;
  long_desc?: string;
  image_url?: string;
  features?: string[];
  tech_stack?: string[];
  pricing?: string;
  demo_url?: string;
  builder_notes?: string;
}

export const useProductSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitProduct = async (data: ProductSubmissionData) => {
    setIsSubmitting(true);
    
    try {
      const { data: result, error } = await supabase
        .from('products')
        .upsert({
          id: data.id || undefined,
          name: data.name,
          builder_id: data.builder_id,
          week_id: data.week_id,
          short_desc: data.short_desc || null,
          long_desc: data.long_desc || null,
          image_url: data.image_url || null,
          features: data.features || [],
          tech_stack: data.tech_stack || [],
          pricing: data.pricing || null,
          demo_url: data.demo_url || null,
          builder_notes: data.builder_notes || null
        })
        .select();
      
      if (error) throw error;
      
      toast({
        title: data.id ? "Product Updated" : "Product Created",
        description: `${data.name} has been ${data.id ? "updated" : "added"} successfully.`
      });
      
      return result;
    } catch (error) {
      console.error("Error submitting product:", error);
      toast({
        title: "Error",
        description: `Failed to ${data.id ? "update" : "create"} product: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    isSubmitting,
    submitProduct
  };
};
