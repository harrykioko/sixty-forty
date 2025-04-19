
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface FeaturesListProps {
  features: string[];
  onAddFeature: (feature: string) => void;
  onRemoveFeature: (feature: string) => void;
}

const FeaturesList = ({ features, onAddFeature, onRemoveFeature }: FeaturesListProps) => {
  const [newFeature, setNewFeature] = useState("");

  const handleAddFeature = () => {
    if (newFeature && !features.includes(newFeature)) {
      onAddFeature(newFeature);
      setNewFeature("");
    }
  };

  return (
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
              onClick={() => onRemoveFeature(feature)}
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
              handleAddFeature();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleAddFeature}
          disabled={!newFeature}
        >
          <Plus size={16} className="mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default FeaturesList;
