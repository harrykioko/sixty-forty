import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";
import { ImageGallery } from "./ImageGallery";
import type { ProductModalProps } from "./Types";

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
  const [selectedImage, setSelectedImage] = useState<string>(image);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleVote = async () => {
    try {
      setIsSubmitting(true);
      await onVote(id);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const allImages = [image, ...additionalImages];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl bg-black/40 backdrop-blur-md"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            {/* Full-width Hero Header */}
            <div className="relative w-full h-[240px]">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/10 backdrop-blur-md border-0 text-white px-3 py-1.5">
                  Built by {builderName}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white/60 hover:text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content Container */}
            <div className="px-8 py-6">
              {/* Product Title */}
              <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

              {/* Two Column Layout */}
              <div className="grid grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="col-span-2 space-y-6">
                  {/* About this Product */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About this Product</h3>
                    <p className="text-white/80 leading-relaxed">{description}</p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-white/80">
                          <span className="w-1 h-1 rounded-full bg-purple-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Builder Notes */}
                  {builderNotes && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Builder Notes</h3>
                      <p className="text-white/80 leading-relaxed">{builderNotes}</p>
                    </div>
                  )}

                  {/* Image Gallery */}
                  {allImages.length > 1 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Gallery</h3>
                      <ImageGallery
                        images={allImages}
                        selectedImage={selectedImage}
                        onSelectImage={setSelectedImage}
                      />
                    </div>
                  )}
                </div>

                {/* Right Column - Metadata */}
                <div className="col-span-1 space-y-6">
                  {/* Tech Stack */}
                  <div className="rounded-lg bg-white/5 p-4">
                    <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, index) => (
                        <Badge
                          key={index}
                          className="bg-black/40 hover:bg-black/50 text-white border-0"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  {pricing && (
                    <div className="rounded-lg bg-white/5 p-4">
                      <h3 className="text-lg font-semibold mb-3">Pricing</h3>
                      <p className="text-white/80">{pricing}</p>
                    </div>
                  )}

                  {/* Live Demo */}
                  {demoLink && (
                    <div className="rounded-lg bg-white/5 p-4">
                      <h3 className="text-lg font-semibold mb-3">Live Demo</h3>
                      <a
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline inline-flex items-center gap-2"
                      >
                        Visit Demo
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                  {/* Vote Button */}
                  <Button
                    onClick={handleVote}
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#7C5CFF] hover:bg-[#7C5CFF]/90 text-white font-medium rounded-lg shadow-[0_0_20px_rgba(124,92,255,0.3)] transition-all duration-200"
                  >
                    {isSubmitting ? "Voting..." : "Vote for this Product"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
