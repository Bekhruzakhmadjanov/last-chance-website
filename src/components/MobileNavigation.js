// components/MobileNavigation.js
import React from 'react';
import { Star, Target, Zap, TrendingUp, Bell } from 'lucide-react';

const MobileNavigation = ({ activeSection, setActiveSection }) => {
  const navigation = [
    { id: 'home', label: 'Home', icon: Star },
    { id: 'tokenomics', label: 'Tokenomics', icon: Target },
    { id: 'presale', label: 'Presale', icon: Zap },
    { id: 'roadmap', label: 'Roadmap', icon: TrendingUp },
    { id: 'announcements', label: 'News', icon: Bell }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-amber-600/30 backdrop-blur-sm">
      <div className="flex justify-around py-2">
        {navigation.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center p-3 ${
                activeSection === item.id ? 'text-amber-400' : 'text-amber-200/60'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;