
import { Week, Product } from "@/types/admin";
import { CreateBattleDialog } from "@/components/admin/dashboard/CreateBattleDialog";
import { BattleDetailsModal } from "@/components/admin/modals/BattleDetailsModal";
import { WeekEditorModal } from "@/components/admin/modals/WeekEditorModal";
import ProductForm from "@/components/admin/form/ProductForm";

interface DashboardModalsProps {
  createBattleDialogOpen: boolean;
  battleDetailsModalOpen: boolean;
  weekEditorModalOpen: boolean;
  productFormOpen: boolean;
  selectedWeek: Week | null;
  selectedProduct: Product | null;
  onCloseCreateBattle: () => void;
  onCloseBattleDetails: () => void;
  onCloseWeekEditor: () => void;
  onCloseProductForm: () => void;
  onEditWeekFromDetails: () => void;
  onAddProductFromDetails: () => void;
  onEditProductFromDetails: (product: Product) => void;
  onSaveWeek: (weekData: Partial<Week>) => void;
  onEndVoting: () => void;
}

export const DashboardModals = ({
  createBattleDialogOpen,
  battleDetailsModalOpen,
  weekEditorModalOpen,
  productFormOpen,
  selectedWeek,
  selectedProduct,
  onCloseCreateBattle,
  onCloseBattleDetails,
  onCloseWeekEditor,
  onCloseProductForm,
  onEditWeekFromDetails,
  onAddProductFromDetails,
  onEditProductFromDetails,
  onSaveWeek,
  onEndVoting,
}: DashboardModalsProps) => {
  return (
    <>
      <CreateBattleDialog
        open={createBattleDialogOpen}
        onClose={onCloseCreateBattle}
      />
      
      {selectedWeek && (
        <BattleDetailsModal
          week={selectedWeek}
          isOpen={battleDetailsModalOpen}
          onClose={onCloseBattleDetails}
          onEditWeek={onEditWeekFromDetails}
          onAddProduct={onAddProductFromDetails}
          onEditProduct={onEditProductFromDetails}
        />
      )}
      
      {selectedWeek && (
        <WeekEditorModal
          open={weekEditorModalOpen}
          onOpenChange={onCloseWeekEditor}
          currentWeek={selectedWeek}
          onSave={onSaveWeek}
          onEndVoting={onEndVoting}
        />
      )}
      
      {productFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={onCloseProductForm}
        />
      )}
    </>
  );
};
