
import React from 'react';
import { Week } from "@/types/admin";
import { CircleDot, CheckCircle, Clock, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatusTimelineProps {
  currentStatus: Week['status'];
  startDate?: Date;
  endDate?: Date;
}

const steps = [
  { status: 'draft', label: 'Draft', Icon: CircleDot },
  { status: 'active', label: 'Active', Icon: Clock },
  { status: 'voting', label: 'Voting', Icon: Flag },
  { status: 'completed', label: 'Completed', Icon: CheckCircle },
] as const;

export const StatusTimeline = ({ currentStatus, startDate, endDate }: StatusTimelineProps) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();
  const progressWidth = `${(currentStepIndex / (steps.length - 1)) * 100}%`;

  return (
    <div className="relative py-3">
      {/* Progress bar background */}
      <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2 bg-white/5 rounded-full" />
      
      {/* Animated progress fill */}
      <motion.div 
        className="absolute top-1/2 left-[10%] h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-sixty40-purple via-sixty40-blue to-sixty40-purple"
        initial={{ width: "0%" }}
        animate={{ width: progressWidth }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Status steps */}
      <div className="relative flex justify-between px-[10%]">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <TooltipProvider key={step.status}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div 
                    className="flex flex-col items-center"
                    whileHover={{ scale: isCurrent ? 1 : 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                        isCurrent && "bg-gradient-to-r from-sixty40-purple to-sixty40-blue ring-2 ring-sixty40-purple/50 ring-offset-2 ring-offset-background scale-105",
                        isCompleted && "bg-sixty40-purple",
                        !isCompleted && !isCurrent && "bg-white/10 hover:bg-white/20"
                      )}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: isCurrent ? 1 : 0.7 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <step.Icon className={cn(
                        "h-4 w-4 transition-colors",
                        (isCompleted || isCurrent) && "text-white",
                        !isCompleted && !isCurrent && "text-white/60"
                      )} />
                    </motion.div>
                    
                    <span className={cn(
                      "mt-2 text-xs font-medium transition-colors",
                      isCurrent && "text-white font-semibold",
                      isCompleted && "text-sixty40-purple",
                      !isCompleted && !isCurrent && "text-white/60"
                    )}>
                      {step.label}
                    </span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 border-white/10">
                  <p>{step.label} {isCurrent && '(Current)'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {startDate && endDate && (
        <div className="mt-3 text-center text-xs text-white/60">
          {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
        </div>
      )}
    </div>
  );
};
