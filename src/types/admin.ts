import { Tables } from "@/integrations/supabase/types";

export interface Week {
  id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: string;
  products: Product[];
  winnerId?: string | null;
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
  products: Product[];
  onEdit: (product: Product) => void;
  onAdd: (builderName: string) => void;
}

export interface AdminActionsProps {
  currentWeek: Week;
  onEmailSubscribers: () => void;
  onPublishBattle: () => void;
}

export interface WeekData {
  id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: string;
  products: Product[];
  theme?: string;
  totalVotes?: number;
  winnerName?: string;
  winnerName?: string | null;
  startDate: Date;
  endDate: Date;
  created_at?: string | null;
}
