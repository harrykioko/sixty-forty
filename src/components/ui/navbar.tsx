import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToHero = () => {
    document.querySelector('#hero-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Archive", path: "/#archive" },
    { name: "About Builders", path: "/#builders" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md">
      <div className="bg-background/30 hover:bg-background/50 transition-colors border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div onClick={scrollToHero} className="cursor-pointer">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl font-bold">
                  <span className="text-white">Sixty</span>
                  <span className="text-sixty40-purple">40</span>
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.path}
                    className="relative font-medium text-muted-foreground hover:text-white transition-colors before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-sixty40-purple before:to-sixty40-blue before:scale-x-0 before:origin-right before:transition-transform hover:before:scale-x-100 hover:before:origin-left"
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  variant="outline" 
                  className="relative px-6 border-sixty40-purple text-sixty40-purple transition-all duration-300 hover:bg-transparent hover:border-transparent hover:text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-sixty40-purple before:to-sixty40-blue before:opacity-0 hover:before:opacity-100 before:transition-opacity before:rounded-md before:-z-10"
                >
                  <a href="/admin" className="relative z-10">Admin</a>
                </Button>
              </motion.div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 backdrop-blur-md bg-background/80 overflow-y-auto pt-20"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/10 pb-4"
                >
                  <a
                    href={item.path}
                    className="text-xl font-medium text-white"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full border-sixty40-purple text-sixty40-purple"
                  onClick={toggleMenu}
                >
                  <a href="/admin">Admin</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
