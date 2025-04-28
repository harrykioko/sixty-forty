import { UseFormReturn, FieldErrors } from "react-hook-form";
import BasicInfo from "./BasicInfo";
import Descriptions from "./Descriptions";
import OptionalFields from "./OptionalFields";
import { ProductFormValues } from "@/hooks/use-product-form";

interface ProductFormFieldsProps {
  form: UseFormReturn<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  mainImage: string | null;
  galleryImages: string[];
  techStack: string[];
  features: string[];
  onMainImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMainImageRemove: () => void;
  onGalleryImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGalleryImageRemove: (index: number) => void;
  onAddTech: (tech: string) => void;
  onRemoveTech: (tech: string) => void;
  onAddFeature: (feature: string) => void;
  onRemoveFeature: (feature: string) => void;
  mode: "create" | "edit";
}

/**
 * Shared field groups for both Create and Edit Product forms.
 * Handles all product info, descriptions, images, tech stack, and features.
 */
const ProductFormFields = ({
  form,
  errors,
  mainImage,
  galleryImages,
  techStack,
  features,
  onMainImageUpload,
  onMainImageRemove,
  onGalleryImageUpload,
  onGalleryImageRemove,
  onAddTech,
  onRemoveTech,
  onAddFeature,
  onRemoveFeature,
  mode,
}: ProductFormFieldsProps) => {
  return (
    <>
      <BasicInfo
        register={form.register}
        errors={errors}
        mainImage={mainImage}
        onMainImageUpload={onMainImageUpload}
        onMainImageRemove={onMainImageRemove}
      />
      <Descriptions
        register={form.register}
        errors={errors}
        techStack={techStack}
        features={features}
        onAddTech={onAddTech}
        onRemoveTech={onRemoveTech}
        onAddFeature={onAddFeature}
        onRemoveFeature={onRemoveFeature}
      />
      <OptionalFields
        register={form.register}
        galleryImages={galleryImages}
        onGalleryImageUpload={onGalleryImageUpload}
        onGalleryImageRemove={onGalleryImageRemove}
      />
    </>
  );
};

export default ProductFormFields; 