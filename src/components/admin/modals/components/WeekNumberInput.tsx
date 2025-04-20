
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WeekNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function WeekNumberInput({ value, onChange, error }: WeekNumberInputProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="weekNumber">Week Number</Label>
      <Input
        id="weekNumber"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}
