// components/Presale.js
import React, { useState, useEffect, useRef } from 'react';
import coinImage from '../assets/last-chance-coin.jpeg';
import qrImage from '../assets/frame.png';

const Presale = () => {
  const [presaleProgress] = useState(67);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [coinRotation, setCoinRotation] = useState(0);
  const [qrHovered, setQrHovered] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate progress bar
          setTimeout(() => {
            setAnimatedProgress(presaleProgress);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [presaleProgress]);

  // Continuous coin rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoinRotation(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Floating coin component for background
  const FloatingPresaleCoin = ({ delay, size = 'w-12 h-12' }) => (
    <div 
      className="absolute opacity-10 animate-bounce"
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '4s'
      }}
    >
      <img 
        src={coinImage}
        alt="Last Chance Coin" 
        className={`${size} animate-spin`}
        style={{ animationDuration: '15s' }}
      />
    </div>
  );

  return (
    <section ref={sectionRef} className="max-w-4xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Background floating coins */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10">
          <FloatingPresaleCoin delay={0} />
        </div>
        <div className="absolute bottom-20 left-5">
          <FloatingPresaleCoin delay={1} size="w-8 h-8" />
        </div>
        <div className="absolute top-1/2 left-10">
          <FloatingPresaleCoin delay={2} size="w-10 h-10" />
        </div>
        <div className="absolute bottom-10 right-20">
          <FloatingPresaleCoin delay={0.5} size="w-14 h-14" />
        </div>
      </div>

      {/* Enhanced Title */}
      <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent relative">
          PRESALE
          {/* Glowing effect */}
          <div className="absolute inset-0 text-5xl font-bold text-amber-400/20 blur-sm animate-pulse">
            PRESALE
          </div>
        </h2>
      </div>

      <div className={`relative bg-gradient-to-br from-amber-900/30 to-black rounded-2xl border border-amber-600/30 overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Animated border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 animate-pulse"></div>
        
        {/* Enhanced Blurred Content */}
        <div className="blur-md p-8 relative">
          {/* Background floating coins in content */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img 
              src={coinImage}
              alt="Coin" 
              className="absolute top-4 right-4 w-16 h-16 opacity-20 animate-spin"
              style={{ 
                animationDuration: '10s',
                transform: `rotate(${coinRotation}deg)`
              }}
            />
            <img 
              src={coinImage}
              alt="Coin" 
              className="absolute bottom-4 left-4 w-12 h-12 opacity-15 animate-bounce"
              style={{ animationDelay: '1s' }}
            />
            <img 
              src={coinImage}
              alt="Coin" 
              className="absolute top-1/2 left-1/3 w-20 h-20 opacity-10 animate-pulse"
              style={{ animationDelay: '2s' }}
            />
          </div>

          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-amber-400 mb-2 animate-pulse">Phase 2 Active</div>
            <div className="text-amber-200">1 LAST = $0.005 USD</div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-amber-300 mb-2">
              <span>Progress: {presaleProgress}%</span>
              <span>$2.8M / $4.2M</span>
            </div>
            <div className="bg-black rounded-full h-4 overflow-hidden relative border border-amber-600/20">
              <div className="absolute inset-0 bg-amber-400/10 animate-pulse"></div>
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
                style={{ width: `${animatedProgress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Purchase Form with enhanced styling */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">Purchase LAST Tokens</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-amber-200 text-sm mb-2">Pay with</label>
                  <select className="w-full bg-black border border-amber-600/50 rounded-lg px-4 py-3 text-amber-200 focus:border-amber-400 focus:outline-none transition-all hover:border-amber-500">
                    <option>ETH</option>
                    <option>USDT</option>
                    <option>USDC</option>
                    <option>BNB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-amber-200 text-sm mb-2">Amount</label>
                  <input 
                    type="number" 
                    placeholder="0.1"
                    className="w-full bg-black border border-amber-600/50 rounded-lg px-4 py-3 text-amber-200 focus:border-amber-400 focus:outline-none transition-all hover:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-amber-200 text-sm mb-2">You will receive</label>
                  <input 
                    type="text" 
                    placeholder="20,000 LAST"
                    className="w-full bg-amber-900/20 border border-amber-600/50 rounded-lg px-4 py-3 text-amber-200 cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-4">Presale Benefits</h3>
              <div className="space-y-3">
                {[
                  "Early Bird Pricing",
                  "Instant Token Delivery", 
                  "Referral Bonuses",
                  "VIP Community Access",
                  "Future Airdrop Eligibility"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 hover:transform hover:translate-x-2 transition-transform duration-300">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}></div>
                    <span className="text-amber-200">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-900/40 to-amber-800/40 rounded-lg border border-amber-600/30 hover:border-amber-400 transition-all duration-300">
                <div className="text-sm text-amber-300">
                  <p className="font-semibold mb-2 animate-pulse">Phase 3 Price Increase</p>
                  <p>Next phase: 1 LAST = $0.008 (+60%)</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 bg-gradient-to-r from-amber-600 to-amber-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-amber-500 hover:to-amber-400 transition-all transform hover:scale-105 shadow-lg relative overflow-hidden group">
            <span className="relative z-10">Buy LAST Tokens Now</span>
            <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>

          <div className="text-center mt-4">
            <p className="text-amber-300/80 text-sm">
              Minimum purchase: 0.01 ETH • Maximum purchase: 10 ETH
            </p>
          </div>
        </div>

        {/* Enhanced Coming Soon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
            
            {/* Large rotating coin behind text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
              <img 
                src={coinImage}
                alt="Last Chance Coin" 
                className="w-64 h-64 opacity-20 animate-spin"
                style={{ animationDuration: '20s' }}
              />
            </div>

            <div className="relative z-10">
              <div className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent mb-4 animate-pulse">
                COMING SOON
              </div>
              <p className="text-xl text-amber-200 mb-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
                Join our Telegram for presale updates
              </p>
              
              {/* Enhanced QR Code Section */}
              <div className="mb-8">
                <div 
                  className={`w-48 h-48 mx-auto bg-black rounded-lg flex items-center justify-center border-4 p-4 relative overflow-hidden group transition-all duration-300 cursor-pointer ${
                    qrHovered ? 'border-amber-300 shadow-lg shadow-amber-400/30' : 'border-amber-400'
                  }`}
                  onMouseEnter={() => setQrHovered(true)}
                  onMouseLeave={() => setQrHovered(false)}
                >
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0 group-hover:animate-pulse"></div>
                  
                  {/* QR Code with hover effect */}
                  <img 
                    src={qrImage}
                    alt="Telegram QR Code" 
                    className={`w-full h-full object-contain relative z-10 transition-transform duration-300 ${
                      qrHovered ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  
                  {/* Scan line animation */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-amber-400 transition-transform duration-2000 opacity-60 ${
                    qrHovered ? 'transform translate-y-full' : 'transform translate-y-0'
                  }`}></div>
                  
                  {/* Corner indicators */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-amber-400 opacity-60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-amber-400 opacity-60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-amber-400 opacity-60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-amber-400 opacity-60"></div>
                </div>
                
                <p className="text-amber-300 text-sm mt-4 animate-pulse">
                  Scan to join our Telegram channel
                </p>
              </div>
              
              {/* Enhanced Button */}
              <div className="space-y-4">
                <button className="group bg-gradient-to-r from-amber-600 to-amber-500 text-black px-8 py-3 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-400 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-400/50 relative overflow-hidden">
                  <span className="relative z-10">Join Telegram Channel</span>
                  <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute top-1/4 left-5 w-16 h-16 bg-amber-400/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-5 w-12 h-12 bg-amber-400/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Presale;