import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProductSidebarProps {
  techStack: string[];
  pricing?: string;
  demoLink?: string;
  onVote: () => void;
  isSubmitting: boolean;
}

export const ProductSidebar = ({
  techStack,
  pricing,
  demoLink,
  onVote,
  isSubmitting,
}: ProductSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Tech Stack Section */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <Badge
              key={index}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      {pricing && (
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">Pricing</h3>
          <p className="text-muted-foreground">{pricing}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="glass-card p-6 space-y-4">
        <Button
          onClick={onVote}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-sixty40-purple to-sixty40-blue hover:opacity-90 transition-opacity"
        >
          {isSubmitting ? "Voting..." : "Vote for this Product"}
        </Button>

        {demoLink && (
          <Button
            variant="outline"
            className="w-full border-white/20 hover:bg-white/10"
            onClick={() => window.open(demoLink, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Demo
          </Button>
        )}
      </div>
    </div>
  );
};
