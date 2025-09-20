// components/Home.js
import React, { useState, useEffect } from 'react';

const TimeCard = ({ value, label }) => (
  <div className="bg-gradient-to-b from-amber-400 to-amber-600 text-black rounded-lg p-4 text-center min-w-[80px] transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-amber-400/50">
    <div className="text-2xl font-bold animate-pulse">{value.toString().padStart(2, '0')}</div>
    <div className="text-xs uppercase tracking-wide">{label}</div>
  </div>
);

const FloatingCoin = ({ delay = 0, duration = 15, direction = 'bottomLeftToTopRight' }) => {
  const getAnimationPath = (dir) => {
    switch(dir) {
      case 'leftToRight':
        return {
          start: 'translateX(-100px) translateY(50vh)',
          middle: 'translateX(50vw) translateY(45vh)',
          end: 'translateX(calc(100vw + 100px)) translateY(40vh)'
        };
      case 'rightToLeft':
        return {
          start: 'translateX(calc(100vw + 100px)) translateY(30vh)',
          middle: 'translateX(50vw) translateY(35vh)',
          end: 'translateX(-100px) translateY(40vh)'
        };
      case 'topToBottom':
        return {
          start: 'translateX(40vw) translateY(-100px)',
          middle: 'translateX(45vw) translateY(50vh)',
          end: 'translateX(50vw) translateY(calc(100vh + 100px))'
        };
      case 'bottomToTop':
        return {
          start: 'translateX(60vw) translateY(calc(100vh + 100px))',
          middle: 'translateX(55vw) translateY(50vh)',
          end: 'translateX(50vw) translateY(-100px)'
        };
      case 'bottomLeftToTopRight':
        return {
          start: 'translateX(-100px) translateY(calc(100vh + 50px))',
          middle: 'translateX(50vw) translateY(50vh)',
          end: 'translateX(calc(100vw + 100px)) translateY(-100px)'
        };
      case 'topLeftToBottomRight':
        return {
          start: 'translateX(-100px) translateY(-100px)',
          middle: 'translateX(50vw) translateY(50vh)',
          end: 'translateX(calc(100vw + 100px)) translateY(calc(100vh + 100px))'
        };
      case 'topRightToBottomLeft':
        return {
          start: 'translateX(calc(100vw + 100px)) translateY(-100px)',
          middle: 'translateX(50vw) translateY(50vh)',
          end: 'translateX(-100px) translateY(calc(100vh + 100px))'
        };
      case 'bottomRightToTopLeft':
        return {
          start: 'translateX(calc(100vw + 100px)) translateY(calc(100vh + 100px))',
          middle: 'translateX(50vw) translateY(50vh)',
          end: 'translateX(-100px) translateY(-100px)'
        };
      default:
        return {
          start: 'translateX(-100px) translateY(calc(100vh + 50px))',
          middle: 'translateX(50vw) translateY(50vh)',
          end: 'translateX(calc(100vw + 100px)) translateY(-100px)'
        };
    }
  };

  const paths = getAnimationPath(direction);
  const animationStyle = {
    animation: `moveAcrossScreen${delay} ${duration}s linear infinite`,
    animationDelay: `${delay}s`,
    transform: paths.start, // Set initial position
    opacity: 0 // Start invisible
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes moveAcrossScreen${delay} {
            0% {
              transform: ${paths.start};
              opacity: 0;
            }
            10% {
              opacity: 0.2;
            }
            50% {
              opacity: 0.3;
              transform: ${paths.middle};
            }
            90% {
              opacity: 0.2;
            }
            100% {
              transform: ${paths.end};
              opacity: 0;
            }
          }
        `
      }} />
      <div 
        className="absolute opacity-20"
        style={animationStyle}
      >
        <img 
          src="/last-chance-coin.jpeg" 
          alt="Last Chance Coin" 
          className="w-16 h-16 animate-spin"
          style={{ animationDuration: '8s' }}
        />
      </div>
    </>
  );
};

// Set your actual presale end date here (outside component to avoid dependency issues)
const PRESALE_END_DATE = new Date('2025-10-05T23:59:59Z'); // October 5, 2025 at 23:59:59 UTC

const Home = ({ setActiveSection }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = PRESALE_END_DATE.getTime() - now;

      if (distance > 0) {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array is now correct

  // Fade in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-amber-900/10"></div>
      
      {/* Floating Coins Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingCoin delay={0} duration={20} direction="leftToRight" />
        <FloatingCoin delay={1} duration={25} direction="rightToLeft" />
        <FloatingCoin delay={2} duration={18} direction="topToBottom" />
        <FloatingCoin delay={3} duration={22} direction="bottomToTop" />
        <FloatingCoin delay={4} duration={16} direction="bottomLeftToTopRight" />
        <FloatingCoin delay={5} duration={24} direction="topLeftToBottomRight" />
        <FloatingCoin delay={6} duration={19} direction="topRightToBottomLeft" />
        <FloatingCoin delay={7} duration={21} direction="bottomRightToTopLeft" />
        <FloatingCoin delay={8} duration={17} direction="leftToRight" />
        <FloatingCoin delay={9} duration={23} direction="rightToLeft" />
        <FloatingCoin delay={10} duration={20} direction="topToBottom" />
        <FloatingCoin delay={11} duration={26} direction="bottomToTop" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Main Logo and Title */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex justify-center items-center">
              <img 
                src="/last-chance-coin.jpeg" 
                alt="Last Chance Coin" 
                className="w-32 h-32 md:w-48 md:h-48 opacity-30 animate-spin"
                style={{ animationDuration: '20s' }}
              />
            </div>
            <h1 className="relative text-6xl md:text-8xl font-bold mb-6 z-10">
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 bg-clip-text text-transparent animate-pulse">
                LAST CHANCE
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-amber-200 mb-8 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            The ultimate memecoin opportunity. When others hesitate, legends seize their 
            <span className="text-amber-400 font-semibold animate-pulse"> LAST CHANCE</span>.
          </p>
          
          {/* Enhanced Countdown Timer */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-amber-400 mb-6">Presale Starts In:</h3>
            <div className="flex justify-center space-x-4 relative">
              <TimeCard value={timeLeft.days} label="Days" />
              <TimeCard value={timeLeft.hours} label="Hours" />
              <TimeCard value={timeLeft.minutes} label="Minutes" />
              <TimeCard value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>

          {/* Enhanced Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => setActiveSection('presale')}
              className="group bg-gradient-to-r from-amber-600 to-amber-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-amber-500 hover:to-amber-400 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-400/50 relative overflow-hidden"
            >
              <span className="relative z-10">Join Presale Now</span>
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
            <button 
              onClick={() => setActiveSection('tokenomics')}
              className="group border-2 border-amber-600 text-amber-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-600 hover:text-black transition-all relative overflow-hidden"
            >
              <span className="relative z-10">View Tokenomics</span>
              <div className="absolute inset-0 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>

        {/* Enhanced Key Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="group text-center p-6 bg-gradient-to-b from-amber-900/30 to-black rounded-xl border border-amber-600/30 hover:border-amber-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-400/20">
            <div className="text-3xl font-bold text-amber-400 mb-2 group-hover:animate-pulse">???</div>
            <div className="text-amber-200">Presale Complete</div>
            <div className="w-full h-1 bg-amber-600/30 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000"></div>
            </div>
          </div>
          
          <div className="group text-center p-6 bg-gradient-to-b from-amber-900/30 to-black rounded-xl border border-amber-600/30 hover:border-amber-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-400/20">
            <div className="text-3xl font-bold text-amber-400 mb-2 group-hover:animate-pulse">???</div>
            <div className="text-amber-200">Holders</div>
            <div className="w-full h-1 bg-amber-600/30 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 delay-200"></div>
            </div>
          </div>
          
          <div className="group text-center p-6 bg-gradient-to-b from-amber-900/30 to-black rounded-xl border border-amber-600/30 hover:border-amber-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-400/20">
            <div className="text-3xl font-bold text-amber-400 mb-2 group-hover:animate-pulse">???</div>
            <div className="text-amber-200">Raised</div>
            <div className="w-full h-1 bg-amber-600/30 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 delay-400"></div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-8 text-amber-300/80">
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Audit Verified</span>
            </div>
            <div className="flex items-center space-x-2 animate-pulse" style={{ animationDelay: '0.5s' }}>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">KYC Completed</span>
            </div>
            <div className="flex items-center space-x-2 animate-pulse" style={{ animationDelay: '1s' }}>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Liquidity Locked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;