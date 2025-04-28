import React from "react";
import { Check, Clock, Flag, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Week } from "@/types/admin";
// Import shadcn/ui Tooltip components
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

/**
 * StatusTimeline visually represents the current status of a battle week.
 * - Icons and labels are accessible and have tooltips.
 * - Progress line is animated and glassmorphic.
 * - Responsive and keyboard accessible.
 *
 * @param currentStatus - The current status of the week (draft, active, voting, completed)
 * @param startDate - Optional start date for the week
 * @param endDate - Optional end date for the week
 */
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
    <TooltipProvider>
      <div className="relative py-16" role="list" aria-label="Battle status timeline">
        {/* Step Icons and Labels Row (Above Progress Line) */}
        <motion.div
          className="relative z-10 flex justify-between items-end px-2 gap-x-8 sm:gap-x-8 md:gap-x-12 lg:gap-x-16"
          // Responsive horizontal spacing: gap-x-8 (mobile), gap-x-12 (md), gap-x-16 (lg)
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
                className="flex flex-col items-center min-w-[72px] sm:min-w-[72px] md:min-w-[88px] lg:min-w-[104px]"
                // min-w ensures steps don't crowd on small screens
                role="listitem"
                aria-current={isCurrent ? "step" : undefined}
              >
                {/* NOW badge above current step */}
                {isCurrent && (
                  <motion.div
                    className="mb-2 px-3 py-1 text-xs font-semibold bg-sixty40-blue/30 text-sixty40-blue rounded-full backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    NOW
                  </motion.div>
                )}
                {/* Step Icon with Tooltip, focus ring, and hover effect */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      type="button"
                      tabIndex={0}
                      aria-label={`${step.label} status`}
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative shadow-2xl backdrop-blur-md outline-none",
                        isCurrent ? "bg-sixty40-blue/20 scale-105" : "bg-white/10",
                        // Focus ring and hover effect
                        "focus-visible:ring-2 focus-visible:ring-sixty40-blue focus-visible:ring-offset-2 hover:bg-sixty40-blue/30"
                      )}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: isCurrent ? 1.05 : 1,
                        opacity: 1,
                      }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Animated glow for current step */}
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-sixty40-blue/10"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
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
                        aria-hidden="true"
                      />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <span className="font-semibold">{step.label}</span>
                    <span className="ml-2 text-xs text-white/70">{step.status.charAt(0).toUpperCase() + step.status.slice(1)}</span>
                  </TooltipContent>
                </Tooltip>
                {/* Step Label */}
                <span
                  className={cn(
                    "mt-3 text-sm transition-colors text-center",
                    isCurrent ? "text-white font-semibold" : "text-white/60"
                  )}
                >
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress Line (Below Step Icons) */}
        <div className="relative mt-10 mb-4"
          // mt-10: more space above line; mb-4: more space below for breathing room
        >
          {/* Progress Line Background (glassmorphic, 6px, soft shadow) */}
          <div
            className="absolute left-0 right-0 top-1/2 h-[6px] bg-white/10 rounded-full shadow-2xl backdrop-blur-md"
            // Glassmorphism: translucent, blurred, soft shadow
          />
          {/* Progress Line Foreground (Animated, 6px, strong gradient) */}
          <motion.div
            className="absolute left-0 top-1/2 h-[6px] rounded-full overflow-hidden"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              className="h-full w-full bg-gradient-to-r from-sixty40-blue via-sixty40-blue/20 to-sixty40-purple shadow-2xl"
              initial={{ backgroundPositionX: "0%" }}
              animate={{ backgroundPositionX: "200%" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 5,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
                backgroundRepeat: "no-repeat",
              }}
              // Animated shimmer: creates a dynamic, modern effect
            />
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
};
