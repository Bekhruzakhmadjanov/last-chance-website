// components/Tokenomics.js
import React, { useState, useEffect, useRef } from 'react';
import { Gift, Clock } from 'lucide-react';

// Move tokenomics data outside component to avoid dependency issues
const TOKENOMICS_DATA = [
  { label: 'Total Supply', value: '1,000,000,000 LAST', percentage: 100, color: 'from-amber-600 to-amber-400' },
  { label: 'Presale', value: '400,000,000 LAST', percentage: 40, color: 'from-orange-600 to-orange-400' },
  { label: 'Liquidity Pool', value: '300,000,000 LAST', percentage: 30, color: 'from-yellow-600 to-yellow-400' },
  { label: 'Marketing & Development', value: '150,000,000 LAST', percentage: 15, color: 'from-amber-700 to-amber-500' },
  { label: 'Team & Advisors', value: '100,000,000 LAST', percentage: 10, color: 'from-orange-700 to-orange-500' },
  { label: 'Community Rewards', value: '50,000,000 LAST', percentage: 5, color: 'from-yellow-700 to-yellow-500' }
];

const Tokenomics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentages, setAnimatedPercentages] = useState({});
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate progress bars with staggered delays
          TOKENOMICS_DATA.forEach((item, index) => {
            setTimeout(() => {
              setAnimatedPercentages(prev => ({
                ...prev,
                [index]: item.percentage
              }));
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []); // Empty dependency array is now correct

  // Floating coin animation component
  const FloatingTokenomicsCoin = ({ delay }) => (
    <div 
      className="absolute opacity-10 animate-bounce"
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '4s'
      }}
    >
      <img 
        src="/last-chance-coin.jpeg" 
        alt="Last Chance Coin" 
        className="w-8 h-8 animate-spin"
        style={{ animationDuration: '12s' }}
      />
    </div>
  );

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Background floating coins */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20">
          <FloatingTokenomicsCoin delay={0} />
        </div>
        <div className="absolute bottom-20 left-10">
          <FloatingTokenomicsCoin delay={1} />
        </div>
        <div className="absolute top-1/2 right-10">
          <FloatingTokenomicsCoin delay={2} />
        </div>
        <div className="absolute bottom-10 left-1/3">
          <FloatingTokenomicsCoin delay={0.5} />
        </div>
      </div>

      {/* Enhanced Title with typing effect */}
      <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent relative">
          TOKENOMICS
          {/* Glowing effect */}
          <div className="absolute inset-0 text-5xl font-bold text-amber-400/20 blur-sm animate-pulse">
            TOKENOMICS
          </div>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Enhanced Allocation Chart */}
        <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h3 className="text-2xl font-semibold text-amber-400 mb-6 flex items-center">
            <div className="w-3 h-3 bg-amber-400 rounded-full mr-3 animate-pulse"></div>
            Token Allocation
          </h3>
          {TOKENOMICS_DATA.map((item, index) => (
            <div 
              key={index} 
              className={`group bg-gradient-to-r from-amber-900/20 to-black p-6 rounded-xl border border-amber-600/30 hover:border-amber-400 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-400/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 500}ms` }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-amber-200 font-semibold group-hover:text-amber-100 transition-colors">
                  {item.label}
                </span>
                <span className="text-amber-400 font-bold text-lg group-hover:scale-110 transition-transform">
                  {item.percentage}%
                </span>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="bg-black rounded-full h-4 overflow-hidden relative border border-amber-600/20">
                <div className="absolute inset-0 bg-amber-400/10 animate-pulse"></div>
                <div 
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-2000 ease-out relative overflow-hidden`}
                  style={{ width: `${animatedPercentages[index] || 0}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>
              
              <div className="text-amber-300 text-sm mt-3 group-hover:text-amber-200 transition-colors">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Giveaways & Deadlines */}
        <div className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          
          {/* Enhanced Giveaways Section */}
          <div className="group bg-gradient-to-br from-amber-900/30 to-black p-8 rounded-xl border border-amber-600/30 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/20">
            <div className="flex items-center mb-6">
              <div className="relative">
                <Gift className="text-amber-400 mr-3 group-hover:scale-110 transition-transform duration-300" size={24} />
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-sm animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                Active Giveaways
              </h3>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: "Community Milestone Giveaway",
                  description: "50,000 LAST tokens for 20 winners",
                  endDate: "Ends: Sept 25, 2025"
                },
                {
                  title: "Twitter Engagement Rewards", 
                  description: "Daily 1,000 LAST for top engagers",
                  endDate: "Ongoing"
                },
                {
                  title: "Referral Bonuses",
                  description: "10% bonus for every referral", 
                  endDate: "Presale period only"
                }
              ].map((giveaway, index) => (
                <div 
                  key={index}
                  className="border-l-4 border-amber-400 pl-4 hover:border-amber-300 transition-colors duration-300 hover:transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 200 + 800}ms` }}
                >
                  <h4 className="font-semibold text-amber-200 hover:text-amber-100 transition-colors">
                    {giveaway.title}
                  </h4>
                  <p className="text-amber-300/80 text-sm hover:text-amber-300 transition-colors">
                    {giveaway.description}
                  </p>
                  <p className="text-amber-400 text-xs mt-1 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    {giveaway.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Deadlines Section */}
          <div className="group bg-gradient-to-br from-amber-900/30 to-black p-8 rounded-xl border border-amber-600/30 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/20">
            <div className="flex items-center mb-6">
              <div className="relative">
                <Clock className="text-amber-400 mr-3 group-hover:scale-110 transition-transform duration-300" size={24} />
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-sm animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                Important Deadlines
              </h3>
            </div>
            
            <div className="space-y-3">
              {[
                { event: "Presale End", date: "Oct 5, 2025", urgent: true },
                { event: "DEX Listing", date: "Oct 8, 2025", urgent: false },
                { event: "Staking Launch", date: "Oct 15, 2025", urgent: false },
                { event: "CEX Applications", date: "Nov 1, 2025", urgent: false }
              ].map((deadline, index) => (
                <div 
                  key={index}
                  className={`flex justify-between items-center py-3 px-2 rounded-lg hover:bg-amber-900/20 transition-all duration-300 ${
                    index < 3 ? 'border-b border-amber-600/20' : ''
                  } group/item hover:transform hover:scale-105`}
                >
                  <span className="text-amber-200 group-hover/item:text-amber-100 transition-colors flex items-center">
                    {deadline.urgent && (
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                    )}
                    {deadline.event}
                  </span>
                  <span className={`font-semibold group-hover/item:scale-110 transition-transform ${
                    deadline.urgent ? 'text-red-400 animate-pulse' : 'text-amber-400'
                  }`}>
                    {deadline.date}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Progress indicator for time sensitivity */}
            <div className="mt-6 pt-4 border-t border-amber-600/20">
              <div className="flex items-center text-amber-300/80 text-sm">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
                Time-sensitive milestones ahead
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-amber-400/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-amber-400/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Tokenomics;