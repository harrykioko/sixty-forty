
import { Week } from "@/types/admin";

/**
 * Formats a battle object for display in the dashboard
 */
export const formatCurrentBattle = (currentBattle: { currentWeek: any, products: any[] } | null): Week | null => {
  if (!currentBattle?.currentWeek) return null;
  
  return {
    id: currentBattle.currentWeek.id,
    number: currentBattle.currentWeek.number,
    startDate: new Date(currentBattle.currentWeek.startDate),
    endDate: new Date(currentBattle.currentWeek.endDate),
    status: currentBattle.currentWeek.status,
    products: currentBattle.products || [],
    winnerId: currentBattle.currentWeek.winnerId,
    theme: `Week ${currentBattle.currentWeek.number} Battle`,
    totalVotes: 0
  };
};
