
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { useBuilders } from "@/hooks/use-builders";

export interface ProductFormValues {
  title: string;
  builderName: string;
  shortDescription: string;
  description: string;
  pricing?: string;
  demoLink?: string;
  builderNotes?: string;
}

export const useProductForm = (product: Product | null | undefined, onClose: () => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(product?.image || null);
  const [galleryImages, setGalleryImages] = useState<string[]>(product?.additionalImages || []);
  const [techStack, setTechStack] = useState<string[]>(product?.techStack || []);
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const { data: builders = [] } = useBuilders();

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

  const onSubmit = (data: ProductFormValues) => {
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: product ? "Product updated" : "Product created",
        description: `${data.title} has been ${product ? "updated" : "added"} successfully`,
      });
      onClose();
    }, 1500);
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
