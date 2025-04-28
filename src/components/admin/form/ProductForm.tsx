import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/admin";
import { useProductForm } from "@/hooks/use-product-form";
import BasicInfo from "./sections/BasicInfo";
import Descriptions from "./sections/Descriptions";
import OptionalFields from "./sections/OptionalFields";
import { FormActions } from "./sections/FormActions";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  selectedWeek?: { id: string } | null;
}

const ProductForm = ({ product, onClose, selectedWeek }: ProductFormProps) => {
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
  } = useProductForm(product, onClose, selectedWeek);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-corner-transparent !scrollbar-w-1.5 !scrollbar-thumb-rounded-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {product ? "Edit Product" : "Add New Product"}
              </h2>
            </div>

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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductForm;
