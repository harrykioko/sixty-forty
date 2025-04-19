
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface TechStackInputProps {
  techStack: string[];
  onAddTech: (tech: string) => void;
  onRemoveTech: (tech: string) => void;
}

const TechStackInput = ({ techStack, onAddTech, onRemoveTech }: TechStackInputProps) => {
  const [newTech, setNewTech] = useState("");

  const handleAddTech = () => {
    if (newTech && !techStack.includes(newTech)) {
      onAddTech(newTech);
      setNewTech("");
    }
  };

  return (
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
              onClick={() => onRemoveTech(tech)}
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
              handleAddTech();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleAddTech}
          disabled={!newTech}
        >
          <Plus size={16} className="mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default TechStackInput;
