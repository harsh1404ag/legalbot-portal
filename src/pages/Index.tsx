
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Scale, Clock, BookOpen, ChevronRight } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Shield className="h-8 w-8 mb-4" />,
    title: "Legal Protection",
    description: "Get instant legal advice and protection for your business or personal matters."
  },
  {
    icon: <Scale className="h-8 w-8 mb-4" />,
    title: "Case Analysis",
    description: "Advanced analysis of case law and precedents to strengthen your legal position."
  },
  {
    icon: <Clock className="h-8 w-8 mb-4" />,
    title: "Time Efficient",
    description: "Reduce research time from hours to seconds with our AI-powered legal assistant."
  },
  {
    icon: <BookOpen className="h-8 w-8 mb-4" />,
    title: "Knowledge Base",
    description: "Access to an extensive database of legal documents, regulations, and precedents."
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
          <SparklesCore
            id="featuresSparkles"
            background="transparent"
            minSize={0.4}
            maxSize={0.8}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.2}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gradient">
            Revolutionizing Legal Assistance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-morphism p-8 rounded-2xl relative hover:bg-white/5 transition-all duration-300"
              >
                <GlowingEffect 
                  spread={40} 
                  glow={true} 
                  disabled={false} 
                  proximity={64} 
                  inactiveZone={0.01} 
                  borderWidth={2}
                />
                <div className="relative z-10">
                  <div className="text-primary">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="ctaSparkles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={60}
            className="w-full h-full"
            particleColor="#3182ce"
            speed={0.4}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Future of Legal Assistance
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of satisfied clients who trust Lexia for their legal needs.
          </p>
          <Link to="/signin">
            <Button className="glass-morphism text-white hover:bg-white/10 px-8 py-6 text-lg relative group overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <SparklesCore
                  id="buttonSparkles2"
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
              <ChevronRight className="ml-2 h-5 w-5 relative z-10" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">LEXIA</h2>
            <p className="text-gray-400 mt-2">© 2023 Lexia AI. All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
