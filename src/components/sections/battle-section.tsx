import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ui/product-card';
import ProductModal from '@/components/ui/product-modal';
import VotingResults from '@/components/ui/voting-results';
import SocialShare from '@/components/ui/social-share';
import { useToast } from '@/components/ui/use-toast';
import { useCurrentBattle } from '@/hooks/use-current-battle';
import { ProductData } from '@/data/mock-data';

export const BattleSection = () => {
  const { toast } = useToast();
  const { data: battleData, isLoading, error } = useCurrentBattle();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [showVoteResults, setShowVoteResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votedForId, setVotedForId] = useState<string | null>(null);
  const [productVotes, setProductVotes] = useState<{ [key: string]: number }>({});

  const openProductModal = (product: ProductData) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleVote = (productId: string) => {
    if (votedForId) {
      toast({
        title: "Already voted",
        description: "You have already cast your vote for this week.",
        variant: "destructive",
      });
      return;
    }

    setTimeout(() => {
      setProductVotes({
        ...productVotes,
        [productId]: (productVotes[productId] || 0) + 1,
      });

      localStorage.setItem("sixty40_voted_for", productId);
      setVotedForId(productId);
      setShowVoteResults(true);
      setIsModalOpen(false);

      toast({
        title: "Vote recorded!",
        description: "Your vote has been submitted successfully.",
      });
    }, 1000);
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
              title={product.name}
              builderName={product.builders?.name || ''}
              shortDescription={product.short_desc || ''}
              image={product.image_url || ''}
              techStack={product.tech_stack || []}
              onClick={() => openProductModal(product as unknown as ProductData)}
            />
          ))}
        </div>

        {showVoteResults && battleData.products.length >= 2 && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full">
              <VotingResults
                productA={{
                  id: battleData.products[0].id,
                  title: battleData.products[0].name,
                  votes: productVotes[battleData.products[0].id] || 0,
                  builderName: battleData.products[0].builders?.name || '',
                }}
                productB={{
                  id: battleData.products[1].id,
                  title: battleData.products[1].name,
                  votes: productVotes[battleData.products[1].id] || 0,
                  builderName: battleData.products[1].builders?.name || '',
                }}
                hasVoted={!!votedForId}
                votedForId={votedForId || undefined}
              />
              
              {votedForId && (
                <div className="mt-8">
                  <SocialShare
                    title="I just voted in this week's micro-SaaS battle on Sixty40!"
                    text={`I voted for ${
                      battleData.products.find(p => p.id === votedForId)?.name
                    } in this week's battle. Check it out and cast your vote too!`}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          {...selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
          onVote={handleVote}
        />
      )}
    </section>
  );
};
