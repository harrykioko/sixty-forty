
import { motion } from "framer-motion";
import { getBuilderGradient } from "../utils";

interface BuilderAvatarProps {
  avatarUrl?: string | null;
  builderName: string;
  isHarry: boolean;
  isBuildPhase: boolean;
}

export const BuilderAvatar = ({ avatarUrl, builderName, isHarry, isBuildPhase }: BuilderAvatarProps) => {
  const gradientClass = getBuilderGradient(isHarry, isBuildPhase);

  return (
    <div className="relative mb-3">
      <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${gradientClass} blur-sm opacity-70`}></div>
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={builderName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-lg font-semibold text-white">
              {builderName?.charAt(0)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
