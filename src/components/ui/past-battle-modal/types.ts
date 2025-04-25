
export interface WeekData {
  id?: string; // Added id field
  number: number;
  startDate: string;
  endDate: string;
  theme?: string;
  totalVotes?: number; // Added for consistency
  winnerName?: string; // Added for consistency
}

export interface PastProductData {
  id?: string; // Added id field
  name: string;
  builder: string;
  isWinner: boolean;
  imageUrl: string;
  longDesc: string;
  features: string[];
  techStack: string[];
  pricing?: string;
  demoUrl?: string;
  builderNotes?: string;
}

export interface PastBattleModalProps {
  week: WeekData;
  products: PastProductData[];
  isOpen: boolean;
  onClose: () => void;
}

export interface PastProductColumnProps {
  product: PastProductData;
  className?: string;
}
