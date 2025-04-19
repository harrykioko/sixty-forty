
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ProductData, BUILDERS } from "@/data/mock-data";

interface ProductFormProps {
  product?: ProductData | null;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(product?.image || null);
  const [galleryImages, setGalleryImages] = useState<string[]>(product?.additionalImages || []);
  const [techStack, setTechStack] = useState<string[]>(product?.techStack || []);
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const [newTech, setNewTech] = useState("");
  const [newFeature, setNewFeature] = useState("");

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
      builderName: BUILDERS[0].name
    }
  });

  useEffect(() => {
    // Reset form when product changes
    if (product) {
      reset({
        title: product.title,
        builderName: product.builderName,
        shortDescription: product.shortDescription,
        description: product.description,
        pricing: product.pricing,
        demoLink: product.demoLink,
        builderNotes: product.builderNotes,
      });
      setTechStack(product.techStack || []);
      setFeatures(product.features || []);
      setMainImage(product.image);
      setGalleryImages(product.additionalImages || []);
    } else {
      reset({
        builderName: BUILDERS[0].name
      });
      setTechStack([]);
      setFeatures([]);
      setMainImage(null);
      setGalleryImages([]);
    }
  }, [product, reset]);

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to Supabase Storage
      // For demo, we'll create a data URL
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
      // In a real app, this would upload to Supabase Storage
      const reader = new FileReader();
      reader.onload = () => {
        setGalleryImages([...galleryImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const addTechItem = () => {
    if (newTech && !techStack.includes(newTech)) {
      setTechStack([...techStack, newTech]);
      setNewTech("");
    }
  };

  const removeTechItem = (item: string) => {
    setTechStack(techStack.filter(tech => tech !== item));
  };

  const addFeatureItem = () => {
    if (newFeature && !features.includes(newFeature)) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  const removeFeatureItem = (item: string) => {
    setFeatures(features.filter(feature => feature !== item));
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
                >
                  {BUILDERS.map((builder) => (
                    <option key={builder.name} value={builder.name}>
                      {builder.name}
                    </option>
                  ))}
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
            <div>
              <Label>Hero Image</Label>
              <div className="mt-1">
                {mainImage ? (
                  <div className="relative h-40 overflow-hidden rounded-md">
                    <img
                      src={mainImage}
                      alt="Product hero"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setMainImage(null)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/20 rounded-md cursor-pointer hover:bg-white/5 transition-colors">
                    <Upload className="mb-2 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Click to upload hero image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMainImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>

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
            <div>
              <Label>Tech Stack</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {techStack.map((tech) => (
                  <Badge 
                    key={tech} 
                    className="bg-white/10 hover:bg-white/20 pl-3 pr-2 py-1.5"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechItem(tech)}
                      className="ml-2 hover:text-red-400"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology..."
                  className="bg-black/20 border-white/10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechItem();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTechItem}
                  disabled={!newTech}
                >
                  <Plus size={16} className="mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* Features */}
            <div>
              <Label>Key Features</Label>
              <ul className="space-y-2 mt-2 mb-3">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 bg-white/5 p-2 rounded-md"
                  >
                    <span className="flex-1">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeatureItem(feature)}
                      className="text-muted-foreground hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add feature..."
                  className="bg-black/20 border-white/10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFeatureItem();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeatureItem}
                  disabled={!newFeature}
                >
                  <Plus size={16} className="mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pricing */}
              <div>
                <Label htmlFor="pricing">Pricing (Optional)</Label>
                <Input
                  id="pricing"
                  className="bg-black/20 border-white/10"
                  placeholder="e.g., Free plan, $9/month, etc."
                  {...register("pricing")}
                />
              </div>

              {/* Demo URL */}
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
            <div>
              <Label>Image Gallery (Optional, up to 3)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                {[0, 1, 2].map((index) => (
                  <div key={index}>
                    {galleryImages[index] ? (
                      <div className="relative h-32 bg-black/20 rounded-md overflow-hidden">
                        <img
                          src={galleryImages[index]}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-md cursor-pointer hover:bg-white/5 transition-colors">
                        <Upload className="mb-1 text-muted-foreground" size={20} />
                        <span className="text-xs text-muted-foreground text-center">
                          Gallery image {index + 1}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleGalleryImageUpload}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
