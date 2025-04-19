
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

const CountdownTimer = ({ targetDate, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) onComplete();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {isComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Voting has ended!</h3>
          <p className="text-muted-foreground">
            Check back soon for the results
          </p>
        </motion.div>
      ) : (
        <>
          <p className="mb-2 text-muted-foreground">Voting ends in:</p>
          <div className="flex space-x-4">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="glass-card flex items-center justify-center w-16 h-16 mb-1 text-2xl font-bold"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.div>
                <span className="text-xs text-muted-foreground">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
