import { Week, Product } from "@/types/admin";
import { CreateBattleModal } from "@/components/admin/dashboard/CreateBattleModal";
import { BattleDetailsModal } from "@/components/admin/modals/BattleDetailsModal";
import { WeekEditorModal } from "@/components/admin/modals/WeekEditorModal";
import CreateProductForm from "@/components/admin/form/CreateProductForm";
import EditProductForm from "@/components/admin/form/EditProductForm";

interface DashboardModalsProps {
  createBattleModalOpen: boolean;
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
  createBattleModalOpen,
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
      <CreateBattleModal
        open={createBattleModalOpen}
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
      
      {productFormOpen && selectedProduct ? (
        <EditProductForm
          product={selectedProduct}
          onClose={onCloseProductForm}
          selectedWeek={selectedWeek}
        />
      ) : productFormOpen && (
        <CreateProductForm
          onClose={onCloseProductForm}
          selectedWeek={selectedWeek}
        />
      )}
    </>
  );
};
