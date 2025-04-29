export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  builder: string;
  builderAvatar?: string;
  isWinner?: boolean;
  votes?: number;
  githubUrl?: string;
  demoUrl?: string;
}

export interface Week {
  id: string;
  number: number;
  startDate: string;
  endDate: string;
  theme?: string;
  status: 'upcoming' | 'active' | 'completed';
}

export interface PastBattleModalProps {
  week: Week;
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
} 