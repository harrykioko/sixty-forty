
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Trash2 } from "lucide-react";

interface ImageUploadProps {
  image: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  label: string;
}

const ImageUpload = ({ image, onImageUpload, onImageRemove, label }: ImageUploadProps) => {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1">
        {image ? (
          <div className="relative h-40 overflow-hidden rounded-md">
            <img
              src={image}
              alt="Product"
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={onImageRemove}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/20 rounded-md cursor-pointer hover:bg-white/5 transition-colors">
            <Upload className="mb-2 text-muted-foreground" />
            <span className="text-muted-foreground">
              Click to upload image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
