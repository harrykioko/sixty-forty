
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Week } from "@/types/admin";

interface StatusSelectProps {
  value: Week['status'];
  onChange: (value: string) => void;
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <div className="grid gap-2">
      <Label>Status</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="voting">Voting</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
