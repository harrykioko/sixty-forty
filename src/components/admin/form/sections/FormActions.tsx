
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
}

export const FormActions = ({ onClose, isSubmitting }: FormActionsProps) => (
  <div className="flex justify-end gap-4">
    <Button
      type="button"
      variant="outline"
      onClick={onClose}
      className="border-white/20 hover:bg-white/10"
    >
      Cancel
    </Button>
    <Button
      type="submit"
      className="bg-sixty40-purple hover:bg-sixty40-purple/90 min-w-[100px]"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="flex items-center">
          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving...
        </span>
      ) : (
        'Save Product'
      )}
    </Button>
  </div>
);
