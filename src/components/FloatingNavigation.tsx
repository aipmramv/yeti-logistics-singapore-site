
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import BookingRequestModal from "./BookingRequestModal";

const FloatingNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero-section-sticky-check');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsFloating(rect.bottom <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Industries", id: "industries" },
    { label: "Why Choose Us", id: "why-choose" },
    { label: "Team", id: "team" },
    { label: "Careers", id: "careers" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav className={`${isFloating ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg animate-fade-in`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center" style={{height: '70px', width: '130px', padding: 0}}>
              <img 
                src="/lovable-uploads/806298c1-9e37-4717-a687-adf03c5cf581.png" 
                alt="Yeti Logistics" 
                style={{height: '70px', width: '130px', objectFit: 'contain', padding: 0}}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                {/* WhatsApp Chat Link */}
                <a
                  href="https://wa.me/6587850107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  title="Chat on WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.93.547 3.77 1.583 5.377L2 22l4.755-1.561A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.64 0-3.232-.443-4.61-1.282l-.33-.197-2.825.929.934-2.74-.215-.336C4.443 15.232 4 13.64 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.293-5.293c-.293-.293-.768-.293-1.061 0l-.646.647c-.293.293-.768.293-1.061 0l-2.293-2.293c-.293-.293-.293-.768 0-1.061l.647-.646c.293-.293.293-.768 0-1.061l-2.293-2.293c-.293-.293-.768-.293-1.061 0l-.646.647c-.293.293-.293.768 0 1.061l2.293 2.293c.293.293.768.293 1.061 0l.646-.647c.293-.293.768-.293 1.061 0l2.293 2.293c.293.293.293.768 0 1.061l-.647.646c-.293.293-.293.768 0 1.061z"/></svg>
                  WhatsApp
                </a>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Admin
                  </Link>
                )}
              </div>
              {/* Book Now Button in Navbar */}
              <Button 
                onClick={() => setIsBookingModalOpen(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-full transition-all duration-300 hover:scale-105 shadow-md"
              >
                Book Now
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm rounded-full"
              >
                Book
                <Calendar className="ml-1 h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Booking Modal */}
      <BookingRequestModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </>
  );
};

export default FloatingNavigation;
