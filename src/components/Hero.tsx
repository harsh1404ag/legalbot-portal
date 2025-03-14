
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen hero-gradient overflow-hidden flex flex-col items-center justify-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-0"></div>
      
      {/* Floating particles or subtle elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container px-4 sm:px-6 mx-auto z-10 flex flex-col items-center">
        <h2 
          className={cn(
            "text-xs sm:text-sm uppercase tracking-widest text-gray-400 mb-5 opacity-0",
            loaded && "animate-fade-in"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          [ OUR LEGAL INTELLIGENCE PLATFORM ]
        </h2>
        
        <h1 
          className={cn(
            "text-6xl md:text-8xl lg:text-9xl font-bold metallic-text tracking-tight mb-6 opacity-0 transition-all", 
            loaded && "animate-fade-in"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          LEXIA
        </h1>
        
        <p 
          className={cn(
            "text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-8 opacity-0",
            loaded && "animate-fade-in"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          We're running the world's most sophisticated legal AI assistant, Lexia. Built to outpace human research by analyzing decades of case law in seconds, providing unparalleled legal insights.
        </p>
        
        <div 
          className={cn(
            "flex flex-col sm:flex-row gap-4 opacity-0",
            loaded && "animate-fade-in"
          )}
          style={{ animationDelay: "0.7s" }}
        >
          <Link to="/signin">
            <Button className="glass-morphism text-white hover:bg-white/10 px-8 py-6 text-lg">
              Try Lexia Now
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-8 opacity-0",
          loaded && "animate-fade-in"
        )}
        style={{ animationDelay: "1s" }}
      >
        <ChevronDown className="h-8 w-8 text-gray-400 animate-bounce" />
      </div>
    </div>
  );
}
