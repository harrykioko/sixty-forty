
export const getBuilderGradient = (isHarry: boolean, isBuildPhase: boolean) => {
  const opacity = isBuildPhase ? '/40' : '';
  return isHarry
    ? `from-sixty40-orange${opacity} via-sixty40-pink${opacity} to-red-500${opacity}`
    : `from-sixty40-blue${opacity} via-sixty40-purple${opacity} to-indigo-500${opacity}`;
};

