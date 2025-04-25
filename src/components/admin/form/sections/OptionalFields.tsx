
import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GalleryUpload from "../GalleryUpload";
import { ProductFormValues } from "@/hooks/use-product-form";

interface OptionalFieldsProps {
  register: UseFormRegister<ProductFormValues>;
  galleryImages: string[];
  onGalleryImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGalleryImageRemove: (index: number) => void;
}

const OptionalFields = ({
  register,
  galleryImages,
  onGalleryImageUpload,
  onGalleryImageRemove,
}: OptionalFieldsProps) => {
  return (
    <div className="space-y-6">
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
        onImageUpload={onGalleryImageUpload}
        onImageRemove={onGalleryImageRemove}
      />
    </div>
  );
};

export default OptionalFields;
