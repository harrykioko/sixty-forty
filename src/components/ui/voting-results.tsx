
import { motion } from "framer-motion";

interface VotingResultsProps {
  productA: {
    id: string;
    title: string;
    votes: number;
    builderName: string;
  };
  productB: {
    id: string;
    title: string;
    votes: number;
    builderName: string;
  };
  hasVoted: boolean;
  votedForId?: string;
}

const VotingResults = ({
  productA,
  productB,
  hasVoted,
  votedForId,
}: VotingResultsProps) => {
  const totalVotes = productA.votes + productB.votes;
  const productAPercentage = totalVotes > 0 ? Math.round((productA.votes / totalVotes) * 100) : 50;
  const productBPercentage = totalVotes > 0 ? Math.round((productB.votes / totalVotes) * 100) : 50;

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold mb-4">Live Results</h3>
      
      {hasVoted ? (
        <div className="mb-2 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Thanks for voting! Here are the current results:
          </p>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{productAPercentage}%</span>
            <span>{totalVotes} votes</span>
            <span>{productBPercentage}%</span>
          </div>
          
          <div className="h-8 bg-gray-800/50 rounded-full overflow-hidden relative mb-4">
            <motion.div
              className="absolute top-0 left-0 h-full bg-sixty40-purple flex items-center justify-start rounded-l-full"
              initial={{ width: "50%" }}
              animate={{ width: `${productAPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {productAPercentage > 15 && (
                <span className="text-white text-xs ml-3 font-medium">
                  {productA.builderName}
                </span>
              )}
            </motion.div>
            
            <motion.div
              className="absolute top-0 right-0 h-full bg-sixty40-blue flex items-center justify-end rounded-r-full"
              initial={{ width: "50%" }}
              animate={{ width: `${productBPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {productBPercentage > 15 && (
                <span className="text-white text-xs mr-3 font-medium">
                  {productB.builderName}
                </span>
              )}
            </motion.div>
          </div>
          
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <h4 className="font-semibold">{productA.title}</h4>
              <p className="text-xs text-muted-foreground">
                {productA.votes} votes
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold">{productB.title}</h4>
              <p className="text-xs text-muted-foreground">
                {productB.votes} votes
              </p>
            </div>
          </div>
          
          {votedForId && (
            <div className="text-sm text-center">
              <span className="text-muted-foreground">You voted for: </span>
              <span className="font-semibold">
                {votedForId === productA.id ? productA.title : productB.title}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Vote to see the current results!
          </p>
        </div>
      )}
    </div>
  );
};

export default VotingResults;
