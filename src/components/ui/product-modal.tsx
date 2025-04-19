
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface ProductModalProps {
  id: string;
  title: string;
  builderName: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  pricing?: string;
  demoLink?: string;
  builderNotes?: string;
  additionalImages?: string[];
  isOpen: boolean;
  onClose: () => void;
  onVote: (productId: string) => void;
}

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
    // In a real app, we would handle API call here
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
            className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                className="absolute top-4 right-4 z-10 text-white bg-black/30 hover:bg-black/50 p-1.5 rounded-full transition-colors"
                onClick={onClose}
              >
                <X size={20} />
              </button>

              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <img
                  src={selectedImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-6 z-20">
                  <Badge className="mb-2 bg-sixty40-purple text-white">
                    Built by {builderName}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white">{title}</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/3">
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
                      <>
                        <h3 className="text-xl font-bold mb-3">Gallery</h3>
                        <div className="grid grid-cols-4 gap-2 mb-6">
                          {allImages.map((img, index) => (
                            <div
                              key={index}
                              className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                                selectedImage === img
                                  ? "border-sixty40-purple"
                                  : "border-transparent"
                              }`}
                              onClick={() => setSelectedImage(img)}
                            >
                              <img
                                src={img}
                                alt={`Product image ${index + 1}`}
                                className="w-full h-16 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="md:w-1/3">
                    <div className="glass-card p-4 mb-4">
                      <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-sixty40-dark/40"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {pricing && (
                      <div className="glass-card p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                        <p className="text-muted-foreground">{pricing}</p>
                      </div>
                    )}

                    {demoLink && (
                      <div className="glass-card p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Live Demo</h3>
                        <a
                          href={demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sixty40-blue hover:underline text-sm flex items-center gap-1"
                        >
                          Visit Demo
                        </a>
                      </div>
                    )}

                    <Button
                      className="w-full bg-sixty40-purple hover:bg-sixty40-purple/90 text-white"
                      size="lg"
                      onClick={handleVote}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Vote for this Product"
                      )}
                    </Button>
                  </div>
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
