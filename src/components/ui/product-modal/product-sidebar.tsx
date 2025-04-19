
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
  isSubmitting,
}: ProductSidebarProps) => {
  return (
    <div className="md:w-1/3">
      <div className="glass-card p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-sixty40-dark/40">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {pricing && (
        <div className="glass-card p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Pricing</h3>
          <p className="text-muted-foreground">{pricing}</p>
        </div>
      )}

      {demoLink && (
        <div className="glass-card p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Live Demo</h3>
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sixty40-blue hover:underline text-sm flex items-center gap-1"
          >
            Visit Demo
          </a>
        </div>
      )}

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
