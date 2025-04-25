
import { Tables } from "@/integrations/supabase/types";

export type WeekStatus = "draft" | "active" | "voting" | "completed";

export interface Week {
  id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'voting' | 'completed';
  winnerId?: string | null;
  winnerName?: string | null; // TEMPORARY: will remove when backend fully aligns
  products?: Product[];
  theme?: string;
  totalVotes?: number;
  created_at?: string;
}

export interface Product {
  id: string;
  title: string;
  builderName: string;
  image: string; // Supabase 'image_url'
  shortDescription: string; // Supabase 'short_desc'
  description: string; // Supabase 'long_desc'
  techStack: string[];
  features: string[];
  votes: number;
  pricing?: string;
  demoLink?: string;
  builderNotes?: string;
  additionalImages?: string[];
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
