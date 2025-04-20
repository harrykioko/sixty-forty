
import { ProductData } from "@/data/mock-data";

export interface Week {
  id: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  status: string;
  products: ProductData[];
}

export interface Product {
  id: string;
  name: string;
  short_desc?: string | null;
  image_url?: string | null;
  tech_stack?: string[] | null;
  builder_id?: string | null;
  builders?: {
    name: string;
    slug?: string;
    avatar_url?: string | null;
  } | null;
  // Add additional fields that match what comes from Supabase
  title?: string; // For backward compatibility
  builderName?: string; // For backward compatibility
  shortDescription?: string; // For backward compatibility
  image?: string; // For backward compatibility
}

export interface SubmissionStatus {
  isCreated: boolean;
  hasGallery: boolean;
  hasNotes: boolean;
}

export interface WeekManagerProps {
  currentWeek: Week;
  onEndVoting: () => void;
  onCreateNewWeek: () => void;
  formatDate: (date: Date) => string;
}

export interface BuilderSubmissionsProps {
  products: ProductData[];
  onEdit: (product: ProductData) => void;
  onAdd: (builderName: string) => void;
}

export interface AdminActionsProps {
  currentWeek: Week;
  onEmailSubscribers: () => void;
  onPublishBattle: () => void;
}
