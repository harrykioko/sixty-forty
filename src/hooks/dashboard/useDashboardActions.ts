
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Week, Product } from "@/types/admin";
import { useDashboardState } from "@/hooks/use-dashboard-state";

export const useDashboardActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    state,
    setCreateBattleDialogOpen,
    setBattleDetailsModalOpen,
    setWeekEditorModalOpen,
    setProductFormOpen,
    setSelectedWeek,
    setSelectedProduct,
  } = useDashboardState();

  const handleEditWeek = (week: Week) => {
    setSelectedWeek(week);
    setWeekEditorModalOpen(true);
  };

  const handleViewBattleDetails = (week: Week) => {
    setSelectedWeek(week);
    setBattleDetailsModalOpen(true);
  };

  const handleAddProduct = (week: Week) => {
    setSelectedWeek(week);
    setSelectedProduct(null);
    setProductFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductFormOpen(true);
  };

  const handleEndVoting = () => {
    toast({
      title: "End Voting",
      description: "This would end the voting period and determine a winner."
    });
  };

  const handleSaveWeek = async (weekData: Partial<Week>) => {
    toast({
      title: "Week Saved",
      description: `Week ${weekData.number} has been saved.`
    });
    setWeekEditorModalOpen(false);
  };

  const handleNavigateToAdmin = () => {
    navigate("/admin");
  };

  return {
    state,
    setCreateBattleDialogOpen,
    handleEditWeek,
    handleViewBattleDetails,
    handleAddProduct,
    handleEditProduct,
    handleEndVoting,
    handleSaveWeek,
    handleNavigateToAdmin
  };
};
