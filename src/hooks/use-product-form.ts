import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { useBuilders } from "@/hooks/use-builders";
import { useProductSubmission } from "@/hooks/use-product-submission";

export interface ProductFormValues {
  title: string;
  builderName: string;
  shortDescription: string;
  description: string;
  pricing?: string;
  demoLink?: string;
  builderNotes?: string;
}

export const useProductForm = (
  product: Product | null | undefined, 
  onClose: () => void,
  selectedWeek?: { id: string }
) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(product?.image || null);
  const [galleryImages, setGalleryImages] = useState<string[]>(product?.additionalImages || []);
  const [techStack, setTechStack] = useState<string[]>(product?.techStack || []);
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const { data: builders = [] } = useBuilders();
  const { submitProduct } = useProductSubmission();

  const form = useForm<ProductFormValues>({
    defaultValues: product ? {
      title: product.title,
      builderName: product.builderName,
      shortDescription: product.shortDescription,
      description: product.description,
      pricing: product.pricing,
      demoLink: product.demoLink,
      builderNotes: product.builderNotes,
    } : {
      builderName: builders[0]?.name || ''
    }
  });

  // Reset form and state when product changes
  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        builderName: product.builderName,
        shortDescription: product.shortDescription,
        description: product.description,
        pricing: product.pricing,
        demoLink: product.demoLink,
        builderNotes: product.builderNotes,
      });
      setMainImage(product.image || null);
      setGalleryImages(product.additionalImages || []);
      setTechStack(product.techStack || []);
      setFeatures(product.features || []);
    } else {
      form.reset({
        title: '',
        builderName: builders[0]?.name || '',
        shortDescription: '',
        description: '',
        pricing: '',
        demoLink: '',
        builderNotes: '',
      });
      setMainImage(null);
      setGalleryImages([]);
      setTechStack([]);
      setFeatures([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && galleryImages.length < 3) {
      const reader = new FileReader();
      reader.onload = () => {
        setGalleryImages([...galleryImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    if (!mainImage) {
      toast({
        title: "Hero image required",
        description: "Please upload a hero image for the product",
        variant: "destructive",
      });
      return;
    }

    if (techStack.length === 0) {
      toast({
        title: "Tech stack required",
        description: "Please add at least one technology to the tech stack",
        variant: "destructive",
      });
      return;
    }

    if (features.length === 0) {
      toast({
        title: "Features required",
        description: "Please add at least one feature to the product",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const builder = builders.find(b => b.name === data.builderName);
      if (!builder) {
        throw new Error("Builder not found");
      }

      const week_id = product?.week_id || selectedWeek?.id;
      if (!week_id) {
        throw new Error("Week ID is required");
      }

      await submitProduct({
        id: product?.id,
        name: data.title,
        builder_id: builder.id,
        week_id,
        short_desc: data.shortDescription,
        long_desc: data.description,
        image_url: mainImage,
        features,
        tech_stack: techStack,
        pricing: data.pricing,
        demo_url: data.demoLink,
        builder_notes: data.builderNotes
      });

      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    mainImage,
    galleryImages,
    techStack,
    features,
    handleMainImageUpload,
    handleGalleryImageUpload,
    setMainImage,
    setGalleryImages,
    setTechStack,
    setFeatures,
    onSubmit,
    builders
  };
};
