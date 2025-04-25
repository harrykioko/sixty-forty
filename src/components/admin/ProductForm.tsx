
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/admin";
import ImageUpload from "./form/ImageUpload";
import GalleryUpload from "./form/GalleryUpload";
import TechStackInput from "./form/TechStackInput";
import FeaturesList from "./form/FeaturesList";
import { useBuilders } from "@/hooks/use-builders";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

interface FormValues {
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
  const { data: builders = [], isLoading: buildersLoading } = useBuilders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(product?.image || null);
  const [galleryImages, setGalleryImages] = useState<string[]>(product?.additionalImages || []);
  const [techStack, setTechStack] = useState<string[]>(product?.techStack || []);
  const [features, setFeatures] = useState<string[]>(product?.features || []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Builder Selection */}
              <div>
                <Label htmlFor="builderName">Builder</Label>
                <select
                  id="builderName"
                  className="w-full mt-1 px-3 py-2 bg-black/20 border border-white/10 rounded-md text-white"
                  {...register("builderName", { required: "Builder is required" })}
                  disabled={buildersLoading}
                >
                  {buildersLoading ? (
                    <option value="">Loading builders...</option>
                  ) : builders.length > 0 ? (
                    builders.map((builder) => (
                      <option key={builder.id} value={builder.name}>
                        {builder.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No builders available</option>
                  )}
                </select>
                {errors.builderName && (
                  <p className="text-red-500 text-sm mt-1">{errors.builderName.message}</p>
                )}
              </div>

              {/* Product Name */}
              <div>
                <Label htmlFor="title">Product Name</Label>
                <Input
                  id="title"
                  className="bg-black/20 border-white/10"
                  {...register("title", { required: "Product name is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
            </div>

            {/* Hero Image Upload */}
            <ImageUpload
              image={mainImage}
              onImageUpload={handleMainImageUpload}
              onImageRemove={() => setMainImage(null)}
              label="Hero Image"
            />

            {/* Short Description */}
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                className="bg-black/20 border-white/10 resize-none h-20"
                {...register("shortDescription", { 
                  required: "Short description is required",
                  maxLength: {
                    value: 120,
                    message: "Short description must be under 120 characters"
                  }
                })}
              />
              {errors.shortDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
              )}
            </div>

            {/* Long Description */}
            <div>
              <Label htmlFor="description">Long Description</Label>
              <Textarea
                id="description"
                className="bg-black/20 border-white/10 resize-none h-32"
                {...register("description", { required: "Long description is required" })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Tech Stack */}
            <TechStackInput
              techStack={techStack}
              onAddTech={(tech) => setTechStack([...techStack, tech])}
              onRemoveTech={(tech) => setTechStack(techStack.filter(t => t !== tech))}
            />

            {/* Features */}
            <FeaturesList
              features={features}
              onAddFeature={(feature) => setFeatures([...features, feature])}
              onRemoveFeature={(feature) => setFeatures(features.filter(f => f !== feature))}
            />

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pricing">Pricing (Optional)</Label>
                <Input
                  id="pricing"
                  className="bg-black/20 border-white/10"
                  placeholder="e.g., Free plan, $9/month, etc."
                  {...register("pricing")}
                />
              </div>

              <div>
                <Label htmlFor="demoLink">Demo URL (Optional)</Label>
                <Input
                  id="demoLink"
                  className="bg-black/20 border-white/10"
                  placeholder="https://example.com"
                  {...register("demoLink")}
                />
              </div>
            </div>

            {/* Builder Notes */}
            <div>
              <Label htmlFor="builderNotes">Builder Notes (Optional)</Label>
              <Textarea
                id="builderNotes"
                className="bg-black/20 border-white/10 resize-none h-20"
                placeholder="Share your thoughts on why you built this..."
                {...register("builderNotes")}
              />
            </div>

            {/* Gallery Images */}
            <GalleryUpload
              images={galleryImages}
              onImageUpload={handleGalleryImageUpload}
              onImageRemove={(index) => setGalleryImages(galleryImages.filter((_, i) => i !== index))}
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
