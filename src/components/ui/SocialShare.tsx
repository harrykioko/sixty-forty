import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Twitter, Linkedin, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SocialShareProps {
  title: string;
  text: string;
  url?: string;
}

const SocialShare = ({ title, text, url = window.location.href }: SocialShareProps) => {
  const [showCopied, setShowCopied] = useState(false);

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0077B5] hover:bg-[#0077B5]/90",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`,
    },
    {
      name: "Discord",
      icon: MessageCircle,
      color: "bg-[#5865F2] hover:bg-[#5865F2]/90",
      url: `https://discord.com/channels/@me?text=${encodeURIComponent(
        `${text} ${url}`
      )}`,
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90",
      url: `https://www.instagram.com/`, // Instagram doesn't support direct sharing links, but we can direct to Instagram
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setShowCopied(true);
    
    toast({
      title: "Link copied!",
      description: "You can now paste it anywhere.",
    });
    
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-muted-foreground mb-4">
        Share your vote with friends!
      </p>
      
      <div className="flex space-x-2 mb-4">
        {shareLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 rounded-full text-white ${link.color}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={`Share on ${link.name}`}
          >
            <link.icon size={20} />
          </motion.a>
        ))}
      </div>

      <div className="relative w-full max-w-xs">
        <Button
          variant="outline"
          className="w-full relative glass-card-hover"
          onClick={copyToClipboard}
        >
          <span className="mr-2">
            <Copy size={16} />
          </span>
          Copy Link
        </Button>
        
        <AnimatePresence>
          {showCopied && (
            <motion.div
              className="absolute -top-8 left-0 right-0 bg-sixty40-purple text-white py-1 px-3 rounded text-sm text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialShare;
