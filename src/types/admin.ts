import { Tables } from "@/integrations/supabase/types";

export type WeekStatus = "draft" | "active" | "voting" | "completed";

export interface Week {
  id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: WeekStatus;
  products: Product[];
  winnerId?: string | null;
}

export interface Product {
  id: string;
  name: string;
  title: string;
  short_desc?: string | null;
  description: string;
  image_url?: string | null;
  image?: string;
  tech_stack?: string[];
  techStack: string[];
  features: string[];
  votes: number;
  builder_id?: string | null;
  builders?: {
    name: string;
    slug?: string;
    avatar_url?: string | null;
  } | null;
  builderName?: string;
  shortDescription?: string;
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
  winnerName?: string | null;
  created_at?: string | null;
}
