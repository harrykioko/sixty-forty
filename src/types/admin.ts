
import { ProductData } from "@/data/mock-data";

export interface Week {
  id: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  status: string;
  products: ProductData[];
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
