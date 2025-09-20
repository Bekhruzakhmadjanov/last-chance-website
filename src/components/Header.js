// components/Header.js
import React, { useState, useEffect } from 'react';
import { Star, Target, Zap, TrendingUp, Bell } from 'lucide-react';

const Header = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home', icon: Star },
    { id: 'tokenomics', label: 'Tokenomics', icon: Target },
    { id: 'presale', label: 'Presale', icon: Zap },
    { id: 'roadmap', label: 'Roadmap', icon: TrendingUp },
    { id: 'announcements', label: 'News', icon: Bell }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-gradient-to-r from-black via-amber-900/20 to-black border-b border-amber-600/30 sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
      isScrolled ? 'bg-black/90 shadow-lg shadow-amber-400/10' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo Section */}
          <div 
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={() => setActiveSection('home')}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            {/* Logo Container */}
            <div className="relative">
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-amber-400/20 rounded-full blur-md transition-all duration-300 ${
                logoHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
              }`}></div>
              
              {/* Logo Image */}
              <div className={`w-12 h-12 relative transition-all duration-300 ${
                logoHovered ? 'scale-110' : 'scale-100'
              }`}>
                <img 
                  src="/last-chance-coin.jpeg" 
                  alt="Last Chance Token Logo" 
                  className={`w-full h-full object-contain rounded-full transition-all duration-300 ${
                    logoHovered ? 'rotate-12' : 'rotate-0'
                  }`}
                />
                {/* Subtle border */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 group-hover:border-amber-400/60 transition-all duration-300"></div>
              </div>
            </div>
            
            {/* Brand Text */}
            <div className="group-hover:transform group-hover:translate-x-1 transition-all duration-300">
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent transition-all duration-300 ${
                logoHovered ? 'from-amber-300 to-amber-100' : 'from-amber-400 to-amber-200'
              }`}>
                LAST CHANCE
              </h1>
              <p className={`text-sm transition-all duration-300 ${
                logoHovered ? 'text-amber-300' : 'text-amber-400/80'
              }`}>
                Your Final Opportunity
              </p>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden ${
                    activeSection === item.id
                      ? 'bg-amber-600 text-black shadow-lg shadow-amber-600/30'
                      : 'text-amber-200 hover:bg-amber-600/20 hover:text-amber-400'
                  }`}
                >
                  {/* Background animation for active state */}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500">
                      <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </div>
                  )}
                  
                  {/* Icon and text */}
                  <Icon 
                    size={18} 
                    className={`relative z-10 transition-transform duration-300 ${
                      activeSection === item.id ? 'group-hover:scale-110' : 'group-hover:scale-105'
                    }`} 
                  />
                  <span className="relative z-10 font-medium">{item.label}</span>
                  
                  {/* Hover indicator */}
                  {activeSection !== item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button (placeholder for future mobile nav) */}
          <button className="md:hidden p-2 text-amber-400 hover:text-amber-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Animated border bottom */}
      <div className={`h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-50'
      }`}></div>
    </header>
  );
};

export default Header;