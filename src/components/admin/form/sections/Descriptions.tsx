
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TechStackInput from "../TechStackInput";
import FeaturesList from "../FeaturesList";
import { FormValues } from "../ProductForm";

interface DescriptionsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  techStack: string[];
  features: string[];
  onAddTech: (tech: string) => void;
  onRemoveTech: (tech: string) => void;
  onAddFeature: (feature: string) => void;
  onRemoveFeature: (feature: string) => void;
}

const Descriptions = ({
  register,
  errors,
  techStack,
  features,
  onAddTech,
  onRemoveTech,
  onAddFeature,
  onRemoveFeature,
}: DescriptionsProps) => {
  return (
    <div className="space-y-6">
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
        onAddTech={onAddTech}
        onRemoveTech={onRemoveTech}
      />

      {/* Features */}
      <FeaturesList
        features={features}
        onAddFeature={onAddFeature}
        onRemoveFeature={onRemoveFeature}
      />
    </div>
  );
};

export default Descriptions;
