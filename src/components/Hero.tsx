
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SparklesCore } from '@/components/ui/sparkles';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
      {/* Main particles background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#8B5CF6" // Purple color
          speed={0.5}
        />
      </div>
      
      {/* Additional colorful background particles */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticlesred"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#D946EF" // Pink
          speed={0.3}
        />
      </div>
      
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticlesblue"
          background="transparent"
          minSize={0.3}
          maxSize={0.8}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#0EA5E9" // Blue
          speed={0.2}
        />
      </div>
      
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticlesorange"
          background="transparent"
          minSize={0.2}
          maxSize={0.6}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#F97316" // Orange
          speed={0.4}
        />
      </div>
      
      {/* Additional colorful stars */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticlesgreen"
          background="transparent"
          minSize={0.3}
          maxSize={0.7}
          particleDensity={25}
          className="w-full h-full"
          particleColor="#10B981" // Green
          speed={0.35}
        />
      </div>
      
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticlesyellow"
          background="transparent"
          minSize={0.2}
          maxSize={0.5}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#FBBF24" // Yellow
          speed={0.25}
        />
      </div>
      
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticlesred"
          background="transparent"
          minSize={0.25}
          maxSize={0.55}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#EF4444" // Red
          speed={0.3}
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90 opacity-90 z-10"></div>
      
      {/* Main content */}
      <div className="container px-4 sm:px-6 mx-auto z-20 flex flex-col items-center">
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
            <Button className="glass-morphism text-white hover:bg-white/10 px-8 py-6 text-lg relative group overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <SparklesCore
                  id="buttonSparkles"
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={50}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                  speed={0.5}
                />
              </div>
              <span className="relative z-10">Try Lexia Now</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-8 opacity-0 z-20",
          loaded && "animate-fade-in"
        )}
        style={{ animationDelay: "1s" }}
      >
        <ChevronDown className="h-8 w-8 text-gray-400 animate-bounce" />
      </div>
    </div>
  );
}
