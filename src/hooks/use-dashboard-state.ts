import { useState } from 'react';
import { DashboardState } from '@/types/admin-dashboard';
import { Product, Week } from '@/types/admin';

export const useDashboardState = () => {
  const [state, setState] = useState<DashboardState>({
    createBattleDialogOpen: false,
    battleDetailsModalOpen: false,
    weekEditorModalOpen: false,
    productFormOpen: false,
    selectedWeek: null,
    selectedProduct: null,
  });

  const setSelectedWeek = (week: Week | null) => {
    setState(prev => ({ ...prev, selectedWeek: week }));
  };

  return {
    state,
    setCreateBattleDialogOpen: (open: boolean) => setState(prev => ({ ...prev, createBattleDialogOpen: open })),
    setBattleDetailsModalOpen: (open: boolean) => setState(prev => ({ ...prev, battleDetailsModalOpen: open })),
    setWeekEditorModalOpen: (open: boolean) => setState(prev => ({ ...prev, weekEditorModalOpen: open })),
    setProductFormOpen: (open: boolean) => setState(prev => ({ ...prev, productFormOpen: open })),
    setSelectedWeek,
    setSelectedProduct: (product: Product | null) => setState(prev => ({ ...prev, selectedProduct: product })),
  };
};
