export interface CreateBattleModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateBattleFormData) => void;
}

export const CreateBattleModal = ({ open, onClose, onCreate }: CreateBattleModalProps) => {
  // ... existing code ...
};

export default CreateBattleModal; 