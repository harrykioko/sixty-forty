import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ui/ProductCard';
import ProductModal from '@/components/ui/ProductModal';
import VotingResults from '@/components/ui/VotingResults';
import SocialShare from '@/components/ui/SocialShare';
import { useToast } from '@/hooks/use-toast';
import { useCurrentBattle } from '@/hooks/use-current-battle';
import { Product } from '@/types/admin';
import { submitVote, subscribeToVotes, getVoteCountsByProduct } from '@/lib/voting';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const BattleSection = () => {
  const { toast } = useToast();
  const { data: battleData, isLoading, error } = useCurrentBattle();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showVoteResults, setShowVoteResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votedForId, setVotedForId] = useState<string | null>(null);
  const [productVotes, setProductVotes] = useState<{ [key: string]: number }>({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteSubscription, setVoteSubscription] = useState<RealtimeChannel | null>(null);

  // Set up real-time vote subscription
  useEffect(() => {
    if (battleData?.currentWeek?.id) {
      const subscription = subscribeToVotes(battleData.currentWeek.id, () => {
        // Refresh vote counts when new votes come in
        refreshVoteCounts();
      });
      setVoteSubscription(subscription);

      // Initial vote count load
      refreshVoteCounts();

      // Check if user has already voted
      const savedVotedFor = localStorage.getItem("sixty40_voted_for");
      if (savedVotedFor) {
        setVotedForId(savedVotedFor);
      }

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [battleData?.currentWeek?.id]);

  const refreshVoteCounts = async () => {
    if (!battleData?.currentWeek?.id) return;

    const response = await getVoteCountsByProduct(battleData.currentWeek.id);
    
    if (response.error) {
      console.error('Error fetching vote counts:', response.error);
      return;
    }

    // Convert array format to object format for existing component compatibility
    const voteCounts = response.data.reduce((acc, vote) => {
      acc[vote.product_id] = vote.vote_count;
      return acc;
    }, {} as { [key: string]: number });

    setProductVotes(voteCounts);
    setTotalVotes(response.totalVotes);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleVote = async (productId: string) => {
    if (!battleData?.currentWeek?.id) {
      toast({
        title: "Error",
        description: "Unable to submit vote. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitVote({
        productId,
        weekId: battleData.currentWeek.id,
        metadata: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      });

      if (!result.success) {
        toast({
          title: "Vote Error",
          description: result.error || "Failed to submit vote. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      setProductVotes(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));

      localStorage.setItem("sixty40_voted_for", productId);
      setVotedForId(productId);
      setShowVoteResults(true);
      setIsModalOpen(false);

      toast({
        title: "✅ Thanks for voting!",
        description: "Your vote has been recorded successfully.",
      });
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section id="vote-now" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center">
            <Badge className="mb-2 bg-sixty40-purple text-white animate-pulse">
              Loading...
            </Badge>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="vote-now" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center">
            <Badge className="mb-2 bg-destructive text-white">
              Error loading battle
            </Badge>
          </div>
        </div>
      </section>
    );
  }

  if (!battleData?.currentWeek || !battleData?.products?.length) {
    return (
      <section id="vote-now" className="py-16 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center">
            <Badge className="mb-2 bg-sixty40-purple text-white">
              No Active Battle
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Tuned!
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The next battle will begin soon. Check back later to see what Harry and Marcos build next!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="vote-now" className="py-16 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <Badge className="mb-2 bg-sixty40-purple text-white">
            Week {battleData.currentWeek.number} Battle
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            This Week's Battle
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Harry and Marcos have created their latest micro-SaaS products. Check them out and cast your vote!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {battleData.products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              builderName={product.builderName}
              shortDescription={product.shortDescription}
              image={product.image || ''}
              techStack={product.techStack || []}
              onClick={() => openProductModal(product)}
            />
          ))}
        </div>

        {(totalVotes > 0 || votedForId) && battleData.products.length >= 2 && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full">
              <VotingResults
                productA={{
                  id: battleData.products[0].id,
                  title: battleData.products[0].title,
                  votes: productVotes[battleData.products[0].id] || 0,
                  builderName: battleData.products[0].builderName,
                }}
                productB={{
                  id: battleData.products[1].id,
                  title: battleData.products[1].title,
                  votes: productVotes[battleData.products[1].id] || 0,
                  builderName: battleData.products[1].builderName,
                }}
                hasVoted={!!votedForId}
                votedForId={votedForId || undefined}
                totalVotes={totalVotes}
              />
              
              {votedForId && (
                <div className="mt-8">
                  <SocialShare
                    title="I just voted in this week's micro-SaaS battle on Sixty40!"
                    text={`I voted for ${
                      battleData.products.find(p => p.id === votedForId)?.title
                    } in this week's battle. Check it out and cast your vote too!`}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {totalVotes === 0 && !votedForId && (
          <div className="text-center text-muted-foreground">
            <p>No votes yet. Be the first to vote!</p>
          </div>
        )}

        {selectedProduct && (
          <ProductModal
            {...selectedProduct}
            isOpen={isModalOpen}
            onClose={closeProductModal}
            onVote={handleVote}
          />
        )}
      </div>
    </section>
  );
};
