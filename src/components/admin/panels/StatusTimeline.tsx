
import React from 'react';
import { Week } from "@/types/admin";
import { CircleDot, CheckCircle, Clock, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface StatusTimelineProps {
  currentStatus: Week['status'];
  onStatusChange?: (status: Week['status']) => void;
  isEditable?: boolean;
}

const steps = [
  { status: 'draft', label: 'Draft', Icon: CircleDot },
  { status: 'active', label: 'Active', Icon: Clock },
  { status: 'voting', label: 'Voting', Icon: Flag },
  { status: 'completed', label: 'Completed', Icon: CheckCircle },
] as const;

export const StatusTimeline = ({ 
  currentStatus, 
  onStatusChange,
  isEditable = false 
}: StatusTimelineProps) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="space-y-4">
      {/* Visual timeline */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 py-2">
        <div className="absolute top-5 left-3 right-3 hidden sm:block">
          <div className="h-[2px] w-full bg-muted/20" />
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div
              key={step.status}
              className={cn(
                "flex items-center gap-3 relative z-10",
                isCurrent && "animate-pulse-slow"
              )}
            >
              <div className="flex items-center gap-2">
                <step.Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isCompleted && "text-sixty40-purple",
                    isCurrent && "text-sixty40-blue",
                    !isCompleted && !isCurrent && "text-muted-foreground/40"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isCompleted && "text-sixty40-purple",
                    isCurrent && "text-sixty40-blue font-semibold",
                    !isCompleted && !isCurrent && "text-muted-foreground/60"
                  )}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status selector */}
      {isEditable && onStatusChange && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Change status:</span>
          <Select 
            value={currentStatus} 
            onValueChange={(value) => onStatusChange(value as Week['status'])}
          >
            <SelectTrigger className="w-[180px] h-8 text-sm">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {steps.map((step) => (
                <SelectItem key={step.status} value={step.status}>{step.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
