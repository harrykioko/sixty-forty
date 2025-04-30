import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/admin';
import { getVoteCountsByProduct } from '@/lib/voting';

interface WinnerSelectionPanelProps {
  weekId: string;
  products: Product[];
  winnerId: string | null;
  onWinnerSelected: () => void;
}

export const WinnerSelectionPanel = ({
  weekId,
  products,
  winnerId,
  onWinnerSelected
}: WinnerSelectionPanelProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productVotes, setProductVotes] = useState<{ [key: string]: number }>({});

  // Fetch vote counts when component mounts
  useEffect(() => {
    const fetchVoteCounts = async () => {
      const response = await getVoteCountsByProduct(weekId);
      if (!response.error) {
        const voteCounts = response.data.reduce((acc, vote) => {
          acc[vote.product_id] = vote.vote_count;
          return acc;
        }, {} as { [key: string]: number });
        setProductVotes(voteCounts);
      }
    };
    fetchVoteCounts();
  }, [weekId]);

  const handleDeclareWinner = async (productId: string) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('weeks')
        .update({ winner_id: productId })
        .eq('id', weekId);

      if (error) throw error;

      toast({
        title: "✅ Winner declared!",
        description: "The winner has been successfully set.",
      });

      onWinnerSelected();
    } catch (error) {
      console.error('Error declaring winner:', error);
      toast({
        title: "Error",
        description: "Failed to declare winner. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Winner Selection</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="glass-card p-4 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{product.title}</h4>
                <p className="text-sm text-muted-foreground">{product.builderName}</p>
              </div>
              <Badge variant="outline" className="bg-white/5">
                {productVotes[product.id] || 0} votes
              </Badge>
            </div>

            {winnerId === product.id ? (
              <div className="flex items-center justify-center py-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  🏆 Winner
                </Badge>
              </div>
            ) : winnerId ? (
              <Button
                variant="outline"
                className="w-full opacity-50 cursor-not-allowed"
                disabled
              >
                Declare Winner
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleDeclareWinner(product.id)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Declaring...' : 'Declare Winner'}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 