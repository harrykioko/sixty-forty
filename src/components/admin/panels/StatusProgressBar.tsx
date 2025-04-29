import { motion } from "framer-motion";
import { WeekData } from "@/types/admin";
import { format } from "date-fns";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface StatusProgressBarProps {
  week: WeekData;
}

const STATUS_STEPS = [
  { id: "planning", label: "Planning" },
  { id: "building", label: "Building" },
  { id: "voting", label: "Voting" },
  { id: "complete", label: "Complete" }
];

export const StatusProgressBar = ({ week }: StatusProgressBarProps) => {
  const currentStepIndex = STATUS_STEPS.findIndex(step => step.id === week.status);
  const progress = ((currentStepIndex + 1) / STATUS_STEPS.length) * 100;

  return (
    <div className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">Week {week.number}</span>
            <span className="text-sm text-white/40">•</span>
            <span className="text-sm text-white/60">
              {format(week.startDate, 'MMM d')} – {format(week.endDate, 'MMM d')}
            </span>
          </div>
          <span className="text-sm font-medium text-white/80">
            {week.status.charAt(0).toUpperCase() + week.status.slice(1)}
          </span>
        </div>
        
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-sixty40-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between mt-1">
          <TooltipProvider>
            {STATUS_STEPS.map((step, index) => (
              <Tooltip key={step.id}>
                <TooltipTrigger asChild>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStepIndex ? "bg-sixty40-blue" : "bg-white/20"
                    }`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{step.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}; 