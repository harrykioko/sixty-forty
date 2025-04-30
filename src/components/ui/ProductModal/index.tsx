import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProductHeader } from "./ProductHeader";
import { ImageGallery } from "./ImageGallery";
import { ProductSidebar } from "./ProductSidebar";
import { ProductModalProps } from "./Types";

export const ProductModal = ({
  id,
  title,
  builderName,
  description,
  image,
  techStack,
  features,
  pricing,
  demoLink,
  builderNotes,
  additionalImages = [],
  isOpen,
  onClose,
  onVote,
}: ProductModalProps) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = () => {
    setIsSubmitting(true);
    onVote(id);
  };

  const allImages = [image, ...additionalImages];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-sixty40-dark rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <ProductHeader
                title={title}
                builderName={builderName}
                onClose={onClose}
              />

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="relative h-[400px] mb-6 rounded-lg overflow-hidden">
                    <img
                      src={selectedImage}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <ImageGallery
                    images={allImages}
                    selectedImage={selectedImage}
                    onSelectImage={setSelectedImage}
                  />

                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{description}</p>
                    </div>

                    {features.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Features</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {builderNotes && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Builder Notes</h3>
                        <p className="text-muted-foreground">{builderNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-1">
                  <ProductSidebar
                    techStack={techStack}
                    pricing={pricing}
                    demoLink={demoLink}
                    onVote={handleVote}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export type { ProductModalProps };
export default ProductModal;
