
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/admin";
import { useProductForm } from "@/hooks/use-product-form";
import BasicInfo from "./sections/BasicInfo";
import Descriptions from "./sections/Descriptions";
import OptionalFields from "./sections/OptionalFields";
import { FormActions } from "./sections/FormActions";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const {
    form: { register, handleSubmit, formState: { errors } },
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
    onSubmit
  } = useProductForm(product, onClose);

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

        <FormActions onClose={onClose} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default ProductForm;
