
export interface ProductModalProps {
  id: string;
  title: string;
  builderName: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  pricing?: string;
  demoLink?: string;
  builderNotes?: string;
  additionalImages?: string[];
  isOpen: boolean;
  onClose: () => void;
  onVote: (productId: string) => void;
}
