
import { Product, Week } from "@/types/admin";

export type WeekStatus = "draft" | "active" | "voting" | "completed";

export interface WeekData extends Week {
  products: Product[];
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
