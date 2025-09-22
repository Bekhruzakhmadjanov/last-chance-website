// components/Announcements.js
import React, { useState, useEffect, useRef } from 'react';
import coinImage from '../assets/last-chance-coin.jpeg';

// Move announcements data outside component to avoid dependency issues
const ANNOUNCEMENTS_DATA = [
  {
    date: 'Sept 18, 2025',
    title: 'Presale Phase 2 Now Live!',
    content: 'The second phase of our presale is officially live. Get your LAST tokens before the price increases!',
    type: 'important',
    priority: 'high'
  },
  {
    date: 'Sept 15, 2025',
    title: '10,000 LAST Giveaway Winners Announced',
    content: 'Congratulations to all winners of our community giveaway! Check your wallets.',
    type: 'giveaway',
    priority: 'medium'
  },
  {
    date: 'Sept 12, 2025',
    title: 'Partnership with CryptoInfluencer',
    content: 'We\'re excited to announce our partnership with top crypto influencers for maximum exposure.',
    type: 'partnership',
    priority: 'medium'
  },
  {
    date: 'Sept 10, 2025',
    title: 'Smart Contract Audit Completed',
    content: 'Our smart contract has passed security audit with flying colors. Safety guaranteed!',
    type: 'security',
    priority: 'high'
  }
];

const Announcements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate cards with staggered delays
          ANNOUNCEMENTS_DATA.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => ({
                ...prev,
                [index]: true
              }));
            }, index * 150);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter announcements
  const filteredAnnouncements = selectedFilter === 'all' 
    ? ANNOUNCEMENTS_DATA 
    : ANNOUNCEMENTS_DATA.filter(announcement => announcement.type === selectedFilter);

  // Get type configurations
  const getTypeConfig = (type) => {
    const configs = {
      important: {
        bgGradient: 'from-amber-900/40 to-amber-800/20',
        border: 'border-amber-600',
        hoverBorder: 'hover:border-amber-400',
        shadow: 'hover:shadow-amber-400/20',
        dotColor: 'bg-amber-400',
        icon: '🚨'
      },
      giveaway: {
        bgGradient: 'from-green-900/40 to-green-800/20',
        border: 'border-green-600',
        hoverBorder: 'hover:border-green-400',
        shadow: 'hover:shadow-green-400/20',
        dotColor: 'bg-green-400',
        icon: '🎁'
      },
      security: {
        bgGradient: 'from-blue-900/40 to-blue-800/20',
        border: 'border-blue-600',
        hoverBorder: 'hover:border-blue-400',
        shadow: 'hover:shadow-blue-400/20',
        dotColor: 'bg-blue-400',
        icon: '🔒'
      },
      partnership: {
        bgGradient: 'from-purple-900/40 to-purple-800/20',
        border: 'border-purple-600',
        hoverBorder: 'hover:border-purple-400',
        shadow: 'hover:shadow-purple-400/20',
        dotColor: 'bg-purple-400',
        icon: '🤝'
      }
    };
    return configs[type] || configs.important;
  };

  // Floating coin component
  const FloatingNewsCoin = ({ delay, size = 'w-8 h-8' }) => (
    <div 
      className="absolute opacity-10 animate-bounce"
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '6s'
      }}
    >
      <img 
        src={coinImage}
        alt="Last Chance Coin" 
        className={`${size} animate-spin`}
        style={{ animationDuration: '25s' }}
      />
    </div>
  );

  return (
    <section ref={sectionRef} className="max-w-4xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Background floating coins */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-5">
          <FloatingNewsCoin delay={0} />
        </div>
        <div className="absolute bottom-20 left-10">
          <FloatingNewsCoin delay={1} size="w-6 h-6" />
        </div>
        <div className="absolute top-1/2 right-20">
          <FloatingNewsCoin delay={2} size="w-10 h-10" />
        </div>
        <div className="absolute bottom-10 left-1/3">
          <FloatingNewsCoin delay={0.5} size="w-4 h-4" />
        </div>
      </div>

      {/* Enhanced Title */}
      <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent relative">
          Latest News
          {/* Glowing effect */}
          <div className="absolute inset-0 text-5xl font-bold text-amber-400/20 blur-sm animate-pulse">
            Latest News
          </div>
        </h2>
      </div>

      {/* Filter tabs */}
      <div className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {['all', 'important', 'giveaway', 'security', 'partnership'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedFilter === filter
                ? 'bg-amber-600 text-black shadow-lg'
                : 'bg-amber-900/20 text-amber-300 hover:bg-amber-800/30 hover:text-amber-200'
            }`}
          >
            {filter === 'all' ? 'All News' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* News feed */}
      <div className="space-y-6">
        {filteredAnnouncements.map((announcement, index) => {
          const config = getTypeConfig(announcement.type);
          const isExpanded = expandedCard === index;
          
          return (
            <div 
              key={index}
              className={`group transition-all duration-500 ${
                visibleCards[index] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div 
                className={`p-6 rounded-xl border transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer bg-gradient-to-r ${config.bgGradient} ${config.border} ${config.hoverBorder} hover:shadow-xl ${config.shadow} relative overflow-hidden`}
                onClick={() => setExpandedCard(isExpanded ? null : index)}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Priority indicator */}
                {announcement.priority === 'high' && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${config.dotColor} animate-pulse`}></div>
                    <div className="text-2xl">{config.icon}</div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-amber-100 transition-colors">
                      {announcement.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-amber-300/80 text-sm group-hover:text-amber-200 transition-colors">
                      {announcement.date}
                    </span>
                    {/* Type badge */}
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      announcement.type === 'important' ? 'bg-amber-600/20 text-amber-300' :
                      announcement.type === 'giveaway' ? 'bg-green-600/20 text-green-300' :
                      announcement.type === 'security' ? 'bg-blue-600/20 text-blue-300' :
                      'bg-purple-600/20 text-purple-300'
                    }`}>
                      {announcement.type.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className={`text-amber-200/90 leading-relaxed group-hover:text-amber-100 transition-colors ${
                    isExpanded ? '' : 'line-clamp-2'
                  }`}>
                    {announcement.content}
                  </p>
                  
                  {/* Expand/collapse indicator */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2 text-amber-400/60 text-xs">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <span>Click to {isExpanded ? 'collapse' : 'expand'}</span>
                    </div>
                    <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-amber-400/30 transition-all duration-300"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced CTA section */}
      <div className={`text-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-gradient-to-r from-amber-900/30 to-black p-8 rounded-xl border border-amber-600/30 hover:border-amber-400 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-400 mb-4">Stay Updated</h3>
          <p className="text-amber-200/80 mb-6 max-w-2xl mx-auto">
            Never miss important updates about Last Chance Token. Join our Telegram channel for real-time announcements and exclusive content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-amber-600 to-amber-500 text-black px-8 py-3 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-400 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-400/50 relative overflow-hidden">
              <span className="relative z-10">Join Our Telegram</span>
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
            
            <button className="group border-2 border-amber-600 text-amber-400 px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-black transition-all relative overflow-hidden">
              <span className="relative z-10">Follow on Twitter</span>
              <div className="absolute inset-0 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute top-1/4 left-5 w-16 h-16 bg-amber-400/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-5 w-12 h-12 bg-amber-400/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Announcements;