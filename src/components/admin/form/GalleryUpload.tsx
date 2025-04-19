
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Trash2 } from "lucide-react";

interface GalleryUploadProps {
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
  maxImages?: number;
}

const GalleryUpload = ({ 
  images, 
  onImageUpload, 
  onImageRemove, 
  maxImages = 3 
}: GalleryUploadProps) => {
  return (
    <div>
      <Label>Image Gallery (Optional, up to {maxImages})</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
        {Array.from({ length: maxImages }).map((_, index) => (
          <div key={index}>
            {images[index] ? (
              <div className="relative h-32 bg-black/20 rounded-md overflow-hidden">
                <img
                  src={images[index]}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => onImageRemove(index)}
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
                  onChange={onImageUpload}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryUpload;
