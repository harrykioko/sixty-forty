
export interface WeekData {
  number: number;
  startDate: string;
  endDate: string;
  theme?: string;
}

export interface PastProductData {
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
