import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Week } from "@/types/admin";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const battleSchema = z.object({
  number: z.number().min(1),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["planning", "building", "voting", "complete"]),
  winnerId: z.string().optional()
});

type BattleFormValues = z.infer<typeof battleSchema>;

interface EditBattleModalProps {
  week: Week;
  onClose: () => void;
  onSave: (data: BattleFormValues) => void;
}

export const EditBattleModal = ({ week, onClose, onSave }: EditBattleModalProps) => {
  const form = useForm<BattleFormValues>({
    resolver: zodResolver(battleSchema),
    defaultValues: {
      number: week.number,
      startDate: week.startDate,
      endDate: week.endDate,
      status: week.status,
      winnerId: week.winnerId
    }
  });

  const onSubmit = (data: BattleFormValues) => {
    onSave(data);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-corner-transparent !scrollbar-w-1.5 !scrollbar-thumb-rounded-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Edit Battle
                </h2>
                <p className="text-white/60 mt-1">
                  Week {week.number} • {format(week.startDate, 'MMM d')} – {format(week.endDate, 'MMM d, yyyy')}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="space-y-6">
                {/* Week Number */}
                <div className="space-y-2">
                  <Label htmlFor="number">Week Number</Label>
                  <Input
                    id="number"
                    type="number"
                    {...form.register("number", { valueAsNumber: true })}
                    className="bg-white/5 border-white/10"
                  />
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...form.register("startDate", { valueAsDate: true })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      {...form.register("endDate", { valueAsDate: true })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    defaultValue={week.status}
                    onValueChange={(value) => form.setValue("status", value as any)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="building">Building</SelectItem>
                      <SelectItem value="voting">Voting</SelectItem>
                      <SelectItem value="complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Winner */}
                <div className="space-y-2">
                  <Label htmlFor="winnerId">Winner</Label>
                  <Select
                    defaultValue={week.winnerId}
                    onValueChange={(value) => form.setValue("winnerId", value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select winner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Winner</SelectItem>
                      {week.products?.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.title} ({product.builderName})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-6">
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
                className="bg-sixty40-blue hover:bg-sixty40-blue/90"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 