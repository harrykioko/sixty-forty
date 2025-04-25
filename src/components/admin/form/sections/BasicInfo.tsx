import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBuilders } from "@/hooks/use-builders";
import ImageUpload from "../ImageUpload";
import { FormValues } from "../ProductForm";

interface BasicInfoProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  mainImage: string | null;
  onMainImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMainImageRemove: () => void;
}

const BasicInfo = ({ register, errors, mainImage, onMainImageUpload, onMainImageRemove }: BasicInfoProps) => {
  const { data: builders = [], isLoading: buildersLoading } = useBuilders();

  return (
    <div className="space-y-6">
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
        onImageUpload={onMainImageUpload}
        onImageRemove={onMainImageRemove}
        label="Hero Image"
      />
    </div>
  );
};

export default BasicInfo;
