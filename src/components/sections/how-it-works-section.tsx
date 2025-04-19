
import { motion } from "framer-motion";
import { Clock, Trophy, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const HowItWorksSection = () => {
  return (
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
              description: "Each Monday, Harry and Marcos start building their products. They have until Friday to design, build, and ship their MVPs.",
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
  );
};
