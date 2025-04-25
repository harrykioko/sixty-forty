
import { Tables } from "@/integrations/supabase/types";
import { Product } from "@/types/admin";

export type WeekStatus = "draft" | "active" | "voting" | "completed";

export interface WeekData {
  id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: WeekStatus;
  theme?: string;
  totalVotes?: number;
  products: Product[];
  winnerId?: string | null;
  created_at?: string | null;
}

export interface AdminDashboardProps {
  currentBattle: {
    currentWeek: any;
    products: Product[];
  } | null;
  pastBattles: WeekData[];
}

export interface DashboardState {
  createBattleDialogOpen: boolean;
  battleDetailsModalOpen: boolean;
  weekEditorModalOpen: boolean;
  productFormOpen: boolean;
  selectedWeek: WeekData | null;
  selectedProduct: Product | null;
}
