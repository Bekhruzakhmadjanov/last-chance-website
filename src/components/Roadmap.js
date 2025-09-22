// components/Roadmap.js
import React, { useState, useEffect, useRef } from 'react';
import coinImage from '../assets/last-chance-coin.jpeg';

// Move roadmap data outside component to avoid dependency issues
const ROADMAP_PHASES = [
  {
    phase: 'Phase 1: Launch',
    status: 'completed',
    items: ['Website Launch', 'Smart Contract Deployment', 'Community Building', 'Initial Marketing'],
    progress: 100
  },
  {
    phase: 'Phase 2: Presale',
    status: 'active',
    items: ['Presale Launch', 'KOL Partnerships', 'Giveaway Campaigns', 'Audit Completion'],
    progress: 75
  },
  {
    phase: 'Phase 3: Exchange',
    status: 'upcoming',
    items: ['DEX Listing', 'CEX Applications', 'Staking Platform', 'Mobile App Beta'],
    progress: 0
  },
  {
    phase: 'Phase 4: Expansion',
    status: 'upcoming',
    items: ['Major Exchange Listings', 'NFT Collection', 'DeFi Integrations', 'Global Marketing'],
    progress: 0
  }
];

const Roadmap = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState({});
  const [visiblePhases, setVisiblePhases] = useState({});
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate phases with staggered delays
          ROADMAP_PHASES.forEach((phase, index) => {
            setTimeout(() => {
              setVisiblePhases(prev => ({
                ...prev,
                [index]: true
              }));
              // Animate progress bars
              setTimeout(() => {
                setAnimatedProgress(prev => ({
                  ...prev,
                  [index]: phase.progress
                }));
              }, 300);
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating coin component
  const FloatingRoadmapCoin = ({ delay, size = 'w-10 h-10' }) => (
    <div 
      className="absolute opacity-10 animate-bounce"
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '5s'
      }}
    >
      <img 
        src={coinImage}
        alt="Last Chance Coin" 
        className={`${size} animate-spin`}
        style={{ animationDuration: '20s' }}
      />
    </div>
  );

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Background floating coins */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10">
          <FloatingRoadmapCoin delay={0} />
        </div>
        <div className="absolute bottom-40 left-5">
          <FloatingRoadmapCoin delay={1} size="w-8 h-8" />
        </div>
        <div className="absolute top-1/2 right-20">
          <FloatingRoadmapCoin delay={2} size="w-12 h-12" />
        </div>
        <div className="absolute bottom-20 left-20">
          <FloatingRoadmapCoin delay={0.5} size="w-6 h-6" />
        </div>
      </div>

      {/* Enhanced Title */}
      <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent relative">
          Roadmap
          {/* Glowing effect */}
          <div className="absolute inset-0 text-5xl font-bold text-amber-400/20 blur-sm animate-pulse">
            Roadmap
          </div>
        </h2>
      </div>

      {/* Timeline connector */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-amber-500 to-gray-600 hidden md:block"></div>
        
        <div className="space-y-8">
          {ROADMAP_PHASES.map((phase, index) => (
            <div 
              key={index} 
              className={`relative transition-all duration-1000 ${
                visiblePhases[index] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-5 h-5 rounded-full border-4 border-amber-400 bg-black z-10 hidden md:block">
                <div className={`w-full h-full rounded-full ${
                  phase.status === 'completed' ? 'bg-green-400 animate-pulse' :
                  phase.status === 'active' ? 'bg-amber-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
              </div>

              <div 
                className={`group ml-0 md:ml-16 p-8 rounded-xl border transition-all duration-500 hover:transform hover:scale-105 cursor-pointer ${
                  phase.status === 'completed' 
                    ? 'bg-gradient-to-r from-green-900/40 to-green-800/20 border-green-600 hover:border-green-400 hover:shadow-xl hover:shadow-green-400/20'
                    : phase.status === 'active'
                    ? 'bg-gradient-to-r from-amber-900/60 to-amber-700/30 border-amber-400 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 animate-pulse'
                    : 'bg-gradient-to-r from-gray-900/40 to-black border-gray-600/30 hover:border-amber-600/50 hover:shadow-xl hover:shadow-amber-400/10'
                }`}
              >
                {/* Phase header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                    phase.status === 'completed' ? 'text-green-200 group-hover:text-green-100' :
                    phase.status === 'active' ? 'text-amber-200 group-hover:text-amber-100' :
                    'text-gray-300 group-hover:text-amber-200'
                  }`}>
                    {phase.phase}
                  </h3>
                  
                  <div className="flex items-center space-x-3">
                    {/* Progress percentage */}
                    {phase.status === 'active' && (
                      <span className="text-amber-400 font-bold text-lg">
                        {phase.progress}%
                      </span>
                    )}
                    
                    {/* Status badge */}
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      phase.status === 'completed'
                        ? 'bg-green-600 text-white group-hover:bg-green-500'
                        : phase.status === 'active'
                        ? 'bg-amber-600 text-black group-hover:bg-amber-500 animate-pulse'
                        : 'bg-gray-600 text-gray-300 group-hover:bg-gray-500'
                    }`}>
                      {phase.status === 'completed' ? 'Completed' : 
                       phase.status === 'active' ? 'Active' : 'Upcoming'}
                    </div>
                  </div>
                </div>

                {/* Progress bar for active phase */}
                {phase.status === 'active' && (
                  <div className="mb-6">
                    <div className="bg-black rounded-full h-3 overflow-hidden border border-amber-600/30">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
                        style={{ width: `${animatedProgress[index] || 0}%` }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Items grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {phase.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className={`group/item p-4 rounded-lg border transition-all duration-300 hover:transform hover:scale-105 ${
                        phase.status === 'completed'
                          ? 'bg-green-900/30 border-green-600/50 text-green-200 hover:border-green-400 hover:bg-green-900/50'
                          : phase.status === 'active'
                          ? 'bg-amber-800/30 border-amber-400/50 text-amber-100 hover:border-amber-300 hover:bg-amber-800/50'
                          : 'bg-gray-800/30 border-gray-600/30 text-gray-300 hover:border-amber-600/50 hover:bg-gray-800/50'
                      }`}
                      style={{ animationDelay: `${itemIndex * 100 + 500}ms` }}
                    >
                      <div className="flex items-center space-x-2">
                        {/* Item status indicator */}
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          phase.status === 'completed' ? 'bg-green-400 animate-pulse' :
                          phase.status === 'active' ? 'bg-amber-400 animate-pulse' : 'bg-gray-400'
                        }`}></div>
                        <div className="text-sm font-medium group-hover/item:font-semibold transition-all">
                          {item}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active phase indicator */}
                {phase.status === 'active' && (
                  <div className="absolute -top-2 -right-2">
                    <div className="relative">
                      <div className="w-4 h-4 bg-amber-400 rounded-full animate-ping"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}

                {/* Completion checkmark */}
                {phase.status === 'completed' && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall progress summary */}
      <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-amber-900/30 to-black p-6 rounded-xl border border-amber-600/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-amber-200 text-sm">1 Phase Complete</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-amber-200 text-sm">1 Phase Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-amber-200 text-sm">2 Phases Upcoming</span>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute top-1/4 left-5 w-20 h-20 bg-amber-400/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-5 w-16 h-16 bg-amber-400/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Roadmap;