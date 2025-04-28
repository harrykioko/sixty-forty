import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProductForm } from "@/hooks/use-product-form";
import ProductFormFields from "./sections/ProductFormFields";
import { FormActions } from "./sections/FormActions";
import { motion, AnimatePresence } from "framer-motion";

interface CreateProductFormProps {
  onClose: () => void;
  selectedWeek?: { id: string } | null;
}

const CreateProductForm = ({ onClose, selectedWeek }: CreateProductFormProps) => {
  const {
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
    onSubmit
  } = useProductForm(null, onClose, selectedWeek);

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Add New Product
                </h2>
                <Badge className="mt-2 bg-sixty40-purple/20 text-sixty40-purple border-sixty40-purple/30">
                  New
                </Badge>
              </div>
            </div>

            <Card className="glass-card border-white/10">
              <CardContent className="p-6 space-y-6">
                <ProductFormFields
                  form={form}
                  errors={form.formState.errors}
                  mainImage={mainImage}
                  galleryImages={galleryImages}
                  techStack={techStack}
                  features={features}
                  onMainImageUpload={handleMainImageUpload}
                  onMainImageRemove={() => setMainImage(null)}
                  onGalleryImageUpload={handleGalleryImageUpload}
                  onGalleryImageRemove={(index) => setGalleryImages(galleryImages.filter((_, i) => i !== index))}
                  onAddTech={(tech) => setTechStack([...techStack, tech])}
                  onRemoveTech={(tech) => setTechStack(techStack.filter(t => t !== tech))}
                  onAddFeature={(feature) => setFeatures([...features, feature])}
                  onRemoveFeature={(feature) => setFeatures(features.filter(f => f !== feature))}
                  mode="create"
                />
              </CardContent>
            </Card>

            <div className="mt-6">
              <FormActions onClose={onClose} isSubmitting={isSubmitting} />
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateProductForm; 