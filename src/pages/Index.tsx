
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Star, Users, Clock } from "lucide-react";

import Navbar from "@/components/ui/navbar";
import CountdownTimer from "@/components/ui/countdown-timer";
import ProductCard from "@/components/ui/product-card";
import ProductModal from "@/components/ui/product-modal";
import EmailCapture from "@/components/ui/email-capture";
import SocialShare from "@/components/ui/social-share";
import VotingResults from "@/components/ui/voting-results";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

import { CURRENT_WEEK, PREVIOUS_WEEKS, BUILDERS, ProductData } from "@/data/mock-data";

const Index = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [showVoteResults, setShowVoteResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votedForId, setVotedForId] = useState<string | null>(null);
  const [productVotes, setProductVotes] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    // Initialize votes
    const initialVotes: { [key: string]: number } = {};
    CURRENT_WEEK.products.forEach((product) => {
      initialVotes[product.id] = product.votes;
    });
    setProductVotes(initialVotes);

    // Check if user has already voted using localStorage
    const savedVote = localStorage.getItem("sixty40_voted_for");
    if (savedVote) {
      setVotedForId(savedVote);
      setShowVoteResults(true);
    }
  }, []);

  const openProductModal = (product: ProductData) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // Wait for animation to complete
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

    // In a real app, this would be an API call to Supabase
    setTimeout(() => {
      // Update local votes count
      setProductVotes({
        ...productVotes,
        [productId]: (productVotes[productId] || 0) + 1,
      });

      // Save vote to localStorage
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-screen-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-sixty40-purple text-white px-3 py-1 text-sm">
                  This Week's Battle
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span>Weekly Micro-SaaS</span>{" "}
                  <span className="gradient-text">Competition</span>
                </h1>
                <p className="text-xl mb-6 text-muted-foreground max-w-lg">
                  Every week, Harry and Marcos build competing MVPs and release them into the wild. Vote for your favorite and help crown this week's champion!
                </p>
                <div className="mb-8">
                  <CountdownTimer
                    targetDate={CURRENT_WEEK.endDate}
                    onComplete={() => console.log("Voting ended")}
                  />
                </div>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                  <Button
                    size="lg"
                    className="bg-sixty40-purple hover:bg-sixty40-purple/90 w-full sm:w-auto"
                    asChild
                  >
                    <a href="#vote-now">Vote Now</a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-sixty40-purple text-sixty40-purple hover:bg-sixty40-purple/10 w-full sm:w-auto"
                    asChild
                  >
                    <a href="#how-it-works">How It Works</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-first lg:order-last"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-sixty40-purple to-sixty40-blue rounded-lg blur opacity-75"></div>
                  <div className="relative glass-card p-6 md:p-8 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">{CURRENT_WEEK.theme}</h2>
                      <Badge variant="outline" className="bg-sixty40-dark/30">
                        <Clock size={14} className="mr-1" /> Week 15
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {CURRENT_WEEK.products.map((builder, index) => (
                        <div 
                          key={index}
                          className="text-center flex flex-col items-center"
                        >
                          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-white/20">
                            <img
                              src={BUILDERS[index].avatar}
                              alt={builder.builderName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-bold text-xl">{builder.builderName}</h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {BUILDERS[index].wins} Wins • {BUILDERS[index].products} Products
                          </p>
                          <div className="flex gap-2">
                            <Badge className="bg-gray-800/50">{BUILDERS[index].products} Products</Badge>
                            <Badge className="bg-sixty40-purple">{BUILDERS[index].wins} Wins</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* This Week's Battle Section */}
        <section id="vote-now" className="py-16 px-4">
          <div className="container mx-auto max-w-screen-xl">
            <div className="text-center mb-12">
              <Badge className="mb-2 bg-sixty40-purple text-white">
                {CURRENT_WEEK.theme}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                This Week's Battle
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Harry and Marcos have one week to build a solution for {CURRENT_WEEK.theme.toLowerCase()}. Check out their products and cast your vote!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {CURRENT_WEEK.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  builderName={product.builderName}
                  shortDescription={product.shortDescription}
                  image={product.image}
                  techStack={product.techStack}
                  onClick={() => openProductModal(product)}
                />
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                {showVoteResults && (
                  <VotingResults
                    productA={{
                      id: CURRENT_WEEK.products[0].id,
                      title: CURRENT_WEEK.products[0].title,
                      votes: productVotes[CURRENT_WEEK.products[0].id] || 0,
                      builderName: CURRENT_WEEK.products[0].builderName,
                    }}
                    productB={{
                      id: CURRENT_WEEK.products[1].id,
                      title: CURRENT_WEEK.products[1].title,
                      votes: productVotes[CURRENT_WEEK.products[1].id] || 0,
                      builderName: CURRENT_WEEK.products[1].builderName,
                    }}
                    hasVoted={!!votedForId}
                    votedForId={votedForId || undefined}
                  />
                )}
                
                {votedForId && (
                  <div className="mt-8">
                    <SocialShare
                      title="I just voted in this week's micro-SaaS battle on Sixty40!"
                      text={`I voted for ${
                        CURRENT_WEEK.products.find(p => p.id === votedForId)?.title
                      } in this week's ${CURRENT_WEEK.theme} battle. Check it out and cast your vote too!`}
                    />
                  </div>
                )}
              </div>
              
              <div className="md:w-1/3">
                <EmailCapture />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 px-4 bg-black/20">
          <div className="container mx-auto max-w-screen-xl">
            <div className="text-center mb-12">
              <Badge className="mb-2 bg-sixty40-blue text-white">
                The Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How Sixty40 Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every week Harry and Marcos compete to build the best micro-SaaS product. Here's how the process works.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Clock size={32} className="text-sixty40-purple" />,
                  title: "Weekly Challenge",
                  description: "Each Monday, Harry and Marcos are given a theme to build a product around. They have until Friday to design, build, and ship their MVP.",
                },
                {
                  icon: <Trophy size={32} className="text-sixty40-blue" />,
                  title: "Community Votes",
                  description: "From Friday evening until Sunday at 8PM ET, the community (that's you!) votes for their favorite product. Voting is anonymous and limited to one vote per person.",
                },
                {
                  icon: <Star size={32} className="text-sixty40-purple" />,
                  title: "Winner Announced",
                  description: "On Sunday night, votes are tallied and a winner is announced. Winners get bragging rights and the products remain accessible in our archive.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">{step.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground flex-grow">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Battles Section */}
        <section id="archive" className="py-16 px-4">
          <div className="container mx-auto max-w-screen-xl">
            <div className="text-center mb-12">
              <Badge className="mb-2 bg-sixty40-blue text-white">
                Archive
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Previous Battles
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Check out some of the past competitions and see who emerged victorious.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PREVIOUS_WEEKS.map((week, index) => (
                <motion.div
                  key={week.id}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Badge className="mb-2 bg-gray-800/70 text-white">
                    {week.date}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2">{week.theme}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-sixty40-purple flex items-center justify-center rounded-full mr-3">
                        <Trophy size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{week.winner}</p>
                        <p className="text-xs text-muted-foreground">Winner</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full mr-3">
                        <Star size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{week.runnerUp}</p>
                        <p className="text-xs text-muted-foreground">Runner Up</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50"
                  >
                    View Details
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-sixty40-purple text-sixty40-purple hover:bg-sixty40-purple/10"
              >
                View All Past Battles
              </Button>
            </div>
          </div>
        </section>

        {/* Meet the Builders Section */}
        <section id="builders" className="py-16 px-4 bg-black/20">
          <div className="container mx-auto max-w-screen-xl">
            <div className="text-center mb-12">
              <Badge className="mb-2 bg-sixty40-purple text-white">
                The Builders
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet Harry & Marcos
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The masterminds behind this weekly micro-SaaS competition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BUILDERS.map((builder, index) => (
                <motion.div
                  key={builder.name}
                  className="glass-card p-6"
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative w-32 h-32 mx-auto md:w-full md:h-48 overflow-hidden rounded-lg">
                        <img
                          src={builder.avatar}
                          alt={builder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-2">{builder.name}</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                          <Trophy size={16} className="text-sixty40-purple mr-1" />
                          <span className="text-sm">{builder.wins} Wins</span>
                        </div>
                        <div className="flex items-center">
                          <Star size={16} className="text-sixty40-blue mr-1" />
                          <span className="text-sm">{builder.products} Products</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{builder.bio}</p>
                      <div className="flex gap-2">
                        {Object.entries(builder.socialLinks).map(([platform, link]) => (
                          <Button
                            key={platform}
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-white"
                            asChild
                          >
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {platform}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">
                <span className="text-white">Sixty</span>
                <span className="text-sixty40-purple">40</span>
              </h2>
              <p className="text-muted-foreground">
                Weekly micro-SaaS competition platform
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div>
                <h3 className="font-semibold mb-3">Navigation</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-muted-foreground hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#vote-now" className="text-muted-foreground hover:text-white">
                      Vote Now
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="text-muted-foreground hover:text-white">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#archive" className="text-muted-foreground hover:text-white">
                      Archive
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-muted-foreground hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-muted-foreground hover:text-white">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-muted-foreground hover:text-white">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-muted-foreground hover:text-white">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-muted-foreground hover:text-white">
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 text-center md:text-left text-muted-foreground text-sm">
            <p>© 2025 Sixty40. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          {...selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
          onVote={handleVote}
        />
      )}
    </div>
  );
};

export default Index;
