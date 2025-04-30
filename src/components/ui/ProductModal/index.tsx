import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProductHeader } from "./ProductHeader";
import { ImageGallery } from "./ImageGallery";
import { ProductSidebar } from "./ProductSidebar";
import { ProductModalProps } from "./types";

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
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const allImages = [image, ...additionalImages];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-corner-transparent !scrollbar-w-1.5 !scrollbar-thumb-rounded-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {title}
                  </h2>
                  <Badge className="mt-2 bg-sixty40-purple/20 text-sixty40-purple border-sixty40-purple/30">
                    {builderName}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <div className="mb-6">
                    <img 
                      src={selectedImage} 
                      alt={title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-4">About this Product</h3>
                  <p className="text-muted-foreground mb-6">{description}</p>

                  <h3 className="text-xl font-bold mb-3">Key Features</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-1 text-muted-foreground">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  {builderNotes && (
                    <>
                      <h3 className="text-xl font-bold mb-3">Builder Notes</h3>
                      <div className="p-4 bg-sixty40-dark/50 rounded-lg mb-6">
                        <p className="text-muted-foreground">{builderNotes}</p>
                      </div>
                    </>
                  )}

                  {additionalImages.length > 0 && (
                    <ImageGallery
                      images={allImages}
                      selectedImage={selectedImage}
                      onImageSelect={setSelectedImage}
                    />
                  )}
                </div>

                <ProductSidebar
                  techStack={techStack}
                  pricing={pricing}
                  demoLink={demoLink}
                  onVote={handleVote}
                  isSubmitting={isSubmitting}
                />
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
