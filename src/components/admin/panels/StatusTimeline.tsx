import React from "react";
import { Check, Clock, Flag, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 },
};

export const StatusTimeline = ({ currentStatus, startDate, endDate }: StatusTimelineProps) => {
  const currentStepIndex = steps.findIndex((step) => step.status === currentStatus);

  return (
    <div className="relative py-16">
      {/* Progress Line */}
      <div className="absolute top-[60%] left-0 right-0 h-[2px] bg-white/5" />

      {/* Progress Line Shimmer */}
      <motion.div 
        className="absolute top-[60%] left-0 h-[2px] overflow-hidden rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="h-full w-full bg-gradient-to-r from-sixty40-blue via-sixty40-blue/20 to-sixty40-purple"
          initial={{ backgroundPositionX: "0%" }}
          animate={{ backgroundPositionX: "200%" }}
          transition={{ 
            repeat: Infinity,
            repeatType: "loop",
            duration: 5,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>

      {/* Steps */}
      <motion.div 
        className="relative flex justify-between items-start"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {steps.map((step, index) => {
          const isCurrent = index === currentStepIndex;
          const isComplete = index < currentStepIndex;

          return (
            <motion.div 
              key={step.status} 
              variants={itemVariants}
              className="flex flex-col items-center relative -mt-6"
            >
              {isCurrent && (
                <motion.div
                  className="mb-2 px-3 py-1 text-xs font-semibold bg-sixty40-blue/30 text-sixty40-blue rounded-full backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  NOW
                </motion.div>
              )}

              <motion.div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                  isCurrent ? "bg-sixty40-blue/20 scale-105" : "bg-white/10"
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
                    className="absolute inset-0 rounded-full bg-sixty40-blue/10"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0, 0.4]
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
                    !isComplete && !isCurrent && "text-white/50"
                  )}
                />
              </motion.div>

              <span
                className={cn(
                  "mt-4 text-sm transition-colors text-center",
                  isCurrent ? "text-white font-semibold" : "text-white/60"
                )}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
