import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  isSubmitting
}: ProductSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Tech Stack */}
      <div>
        <h4 className="text-sm font-medium mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Pricing */}
      {pricing && (
        <div>
          <h4 className="text-sm font-medium mb-2">Pricing</h4>
          <p className="text-sm text-muted-foreground">{pricing}</p>
        </div>
      )}

      {/* Demo Link */}
      {demoLink && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(demoLink, '_blank')}
        >
          View Demo
        </Button>
      )}

      {/* Vote Button */}
      <Button
        className="w-full bg-sixty40-purple hover:bg-sixty40-purple/90 text-white"
        size="lg"
        onClick={onVote}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          "Vote for this Product"
        )}
      </Button>
    </div>
  );
};
