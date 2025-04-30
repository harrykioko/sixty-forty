export type WeekStatus = "draft" | "active" | "voting" | "completed";

export interface Product {
  id: string;
  name: string; // ✅ Add this
  builder_id: string; // ✅ Add this
  title: string;
  builderName: string;
  image: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  features: string[];
  votes: number;
  pricing?: string | null;
  demoLink?: string | null;
  builderNotes?: string | null;
  additionalImages?: string[];
  week_id?: string;
}


export interface Week {
  id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: WeekStatus;
  winnerId?: string | null;
  winnerName?: string | null;
  products?: Product[];
  theme?: string;
  totalVotes?: number;
  created_at?: string;
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
