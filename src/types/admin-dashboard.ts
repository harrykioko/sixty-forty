
import { Product, Week } from "@/types/admin";

export type WeekStatus = "draft" | "active" | "voting" | "completed";

export interface AdminDashboardProps {
  currentBattle: {
    currentWeek: Week | null;
    products: Product[];
  } | null;
  pastBattles: Week[];
}

export interface DashboardState {
  createBattleDialogOpen: boolean;
  battleDetailsModalOpen: boolean;
  weekEditorModalOpen: boolean;
  productFormOpen: boolean;
  selectedWeek: Week | null;
  selectedProduct: Product | null;
}
