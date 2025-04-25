
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
    <div className="relative py-4">
      {/* Progress bar background */}
      <div className="absolute top-[22px] left-[10%] right-[10%] h-1 bg-white/5 rounded-full" />
      
      {/* Animated progress fill */}
      <motion.div 
        className="absolute top-[22px] left-[10%] h-1 rounded-full bg-gradient-to-r from-sixty40-purple via-sixty40-blue to-sixty40-purple"
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
                <TooltipTrigger>
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        isCurrent && "bg-gradient-to-r from-sixty40-purple to-sixty40-blue shadow-glow animate-pulse-slow",
                        isCompleted && "bg-sixty40-purple",
                        !isCompleted && !isCurrent && "bg-white/5"
                      )}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <step.Icon 
                        className={cn(
                          "h-4 w-4 transition-colors",
                          (isCompleted || isCurrent) && "text-white",
                          !isCompleted && !isCurrent && "text-white/40"
                        )}
                      />
                    </motion.div>
                    
                    <span
                      className={cn(
                        "mt-2 text-xs font-medium transition-colors",
                        isCurrent && "text-white font-semibold",
                        isCompleted && "text-sixty40-purple",
                        !isCompleted && !isCurrent && "text-white/40"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 border-white/10">
                  <p>{step.label} {isCurrent && '(Current)'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Date range */}
      {startDate && endDate && (
        <div className="mt-4 text-center text-xs text-white/60">
          {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
        </div>
      )}
    </div>
  );
};
