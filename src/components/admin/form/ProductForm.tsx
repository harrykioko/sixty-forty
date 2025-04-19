
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ProductData, BUILDERS } from "@/data/mock-data";
import BasicInfo from "./sections/BasicInfo";
import Descriptions from "./sections/Descriptions";
import OptionalFields from "./sections/OptionalFields";

interface ProductFormProps {
  product?: ProductData | null;
  onClose: () => void;
}

export interface FormValues {
  title: string;
  builderName: string;
  shortDescription: string;
  description: string;
  pricing?: string;
  demoLink?: string;
  builderNotes?: string;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(product?.image || null);
  const [galleryImages, setGalleryImages] = useState<string[]>(product?.additionalImages || []);
  const [techStack, setTechStack] = useState<string[]>(product?.techStack || []);
  const [features, setFeatures] = useState<string[]>(product?.features || []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: product ? {
      title: product.title,
      builderName: product.builderName,
      shortDescription: product.shortDescription,
      description: product.description,
      pricing: product.pricing,
      demoLink: product.demoLink,
      builderNotes: product.builderNotes,
    } : {
      builderName: BUILDERS[0].name
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

  const onSubmit = (data: FormValues) => {
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

    // Prepare the product data
    const productData = {
      id: product?.id || `product-${Date.now()}`,
      image: mainImage,
      additionalImages: galleryImages,
      techStack,
      features,
      votes: product?.votes || 0,
      ...data
    };

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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="hover:bg-white/10"
        >
          <X size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="glass-card border-white/10">
          <CardContent className="p-6 space-y-6">
            <BasicInfo
              register={register}
              errors={errors}
              mainImage={mainImage}
              onMainImageUpload={handleMainImageUpload}
              onMainImageRemove={() => setMainImage(null)}
            />

            <Descriptions
              register={register}
              errors={errors}
              techStack={techStack}
              features={features}
              onAddTech={(tech) => setTechStack([...techStack, tech])}
              onRemoveTech={(tech) => setTechStack(techStack.filter(t => t !== tech))}
              onAddFeature={(feature) => setFeatures([...features, feature])}
              onRemoveFeature={(feature) => setFeatures(features.filter(f => f !== feature))}
            />

            <OptionalFields
              register={register}
              galleryImages={galleryImages}
              onGalleryImageUpload={handleGalleryImageUpload}
              onGalleryImageRemove={(index) => setGalleryImages(galleryImages.filter((_, i) => i !== index))}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-white/20 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-sixty40-purple hover:bg-sixty40-purple/90 min-w-[100px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              'Save Product'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
