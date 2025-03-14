
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'LEXIA', path: '/' },
  { name: 'FEATURES', path: '/features' },
  { name: 'COMPANY', path: '/company' },
  { name: 'CAREERS', path: '/careers' },
  { name: 'NEWS', path: '/news' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 py-5 transition-all duration-300 ease-in-out",
        scrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight text-white"
          >
            <span className="text-3xl">L</span>EXIA
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm text-gray-300 hover:text-white tracking-wide transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/signin">
            <Button 
              variant="ghost" 
              className="glass-morphism text-white mr-4 hover:bg-white/10"
            >
              TRY LEXIA <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg py-4 border-t border-gray-800 animate-fade-in">
          <div className="flex flex-col space-y-4 px-8">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm text-gray-300 hover:text-white py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/signin" onClick={() => setMenuOpen(false)}>
              <Button 
                className="w-full mt-4 glass-morphism text-white hover:bg-white/10"
              >
                TRY LEXIA <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
