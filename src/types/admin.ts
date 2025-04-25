
import { Tables } from "@/integrations/supabase/types";

export type WeekStatus = "draft" | "active" | "voting" | "completed";

export interface Week {
  id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: WeekStatus;
  products: Product[];
  theme?: string;
  totalVotes?: number;
  winnerId?: string | null;
  created_at?: string | null;
}

export interface Product {
  id: string;
  name: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  builderName: string;
  builder_id?: string | null;
  week_id?: string | null;
  pricing?: string;
  demoLink?: string;
  builderNotes?: string;
  additionalImages?: string[];
  votes: number;
  builders?: {
    name: string;
    slug?: string;
    avatar_url?: string | null;
  } | null;
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

export interface WeekData extends Week {}

export function mapSupabaseProduct(p: any): Product {
  return {
    id: p.id,
    name: p.name,
    title: p.name,
    shortDescription: p.short_desc || '',
    description: p.long_desc || '',
    image: p.image_url || '',
    techStack: p.tech_stack || [],
    features: p.features || [],
    builderName: p.builders?.name || '',
    builder_id: p.builder_id,
    week_id: p.week_id,
    pricing: p.pricing,
    demoLink: p.demo_url,
    builderNotes: p.builder_notes,
    votes: 0,
    builders: p.builders
  };
}
