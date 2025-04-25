
import React from 'react';
import { Week } from "@/types/admin";
import { CircleDot, CheckCircle, Clock, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatusTimelineProps {
  currentStatus: Week['status'];
}

const steps = [
  { status: 'draft', label: 'Draft', Icon: CircleDot },
  { status: 'active', label: 'Active', Icon: Clock },
  { status: 'voting', label: 'Voting', Icon: Flag },
  { status: 'completed', label: 'Completed', Icon: CheckCircle },
] as const;

export const StatusTimeline = ({ currentStatus }: StatusTimelineProps) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();
  const progressWidth = `${(currentStepIndex / (steps.length - 1)) * 100}%`;

  return (
    <div className="relative py-8">
      {/* Progress bar background */}
      <div className="absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-white/5" />
      
      {/* Animated progress fill */}
      <motion.div 
        className="absolute top-[28px] left-[10%] h-0.5 bg-gradient-to-r from-sixty40-purple to-sixty40-blue"
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
            <div
              key={step.status}
              className="flex flex-col items-center"
            >
              <motion.div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                  isCurrent && "bg-sixty40-blue shadow-glow animate-pulse-slow",
                  isCompleted && "bg-sixty40-purple",
                  !isCompleted && !isCurrent && "bg-white/5"
                )}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <step.Icon 
                  className={cn(
                    "h-6 w-6 transition-colors",
                    (isCompleted || isCurrent) && "text-white",
                    !isCompleted && !isCurrent && "text-white/40"
                  )}
                />
              </motion.div>
              
              <span
                className={cn(
                  "mt-3 text-sm font-medium transition-colors",
                  isCurrent && "text-sixty40-blue font-semibold",
                  isCompleted && "text-sixty40-purple",
                  !isCompleted && !isCurrent && "text-white/40"
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

