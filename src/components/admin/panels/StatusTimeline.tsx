
import React from "react";
import { Check, Clock, Flag, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Week } from "@/types/admin";

interface StatusTimelineProps {
  currentStatus: Week["status"];
  startDate?: Date;
  endDate?: Date;
}

const steps = [
  { status: "draft", label: "Draft", Icon: Check },
  { status: "active", label: "Active", Icon: Clock },
  { status: "voting", label: "Voting", Icon: Flag },
  { status: "completed", label: "Completed", Icon: CheckCircle },
] as const;

export const StatusTimeline = ({ currentStatus, startDate, endDate }: StatusTimelineProps) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="relative py-8">
      {/* Progress line background */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/5" />
      
      {/* Animated progress gradient */}
      <motion.div 
        className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-sixty40-blue via-sixty40-purple to-sixty40-blue"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCurrent = index === currentStepIndex;
          const isComplete = index < currentStepIndex;
          
          return (
            <div key={step.status} className="flex flex-col items-center">
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2 px-3 py-1 text-xs font-medium bg-sixty40-blue/20 text-sixty40-blue rounded-full"
                >
                  NOW
                </motion.div>
              )}
              <motion.div
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                  isCurrent && "scale-105",
                  isCurrent ? "bg-sixty40-blue/20" : "bg-black/40"
                )}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: isCurrent ? 1.05 : 1, 
                  opacity: 1 
                }}
                transition={{ delay: index * 0.1 }}
              >
                {isCurrent && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-sixty40-blue/20"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                <step.Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isComplete && "text-sixty40-blue",
                    isCurrent && "text-sixty40-blue",
                    !isComplete && !isCurrent && "text-white/40"
                  )}
                />
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-sm transition-colors",
                  isCurrent && "text-white font-medium",
                  !isCurrent && "text-white/60"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
