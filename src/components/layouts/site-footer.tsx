import { Link } from "react-router-dom";

export const SiteFooter = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">
              <span className="text-white">Sixty</span>
              <span className="text-sixty40-purple">40</span>
            </h2>
            <p className="text-muted-foreground">
              60/40 - sounds marginal, but what if someone rips a unicorn one week?
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h3 className="font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-white">
                    Home
                  </Link>
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
                  <Link to="/" className="text-muted-foreground hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://x.com/sixty40dev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-white"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/sixty40dev/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-white"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-white">
                    Discord
                  </Link>
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
  );
};
