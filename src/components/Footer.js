// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-amber-900/20 to-black border-t border-amber-600/30 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://twitter.com/lastchancetoken" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-200 transition-colors">Twitter</a>
            <a href="https://t.me/lastchancetoken" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-200 transition-colors">Telegram</a>
            <a href="https://discord.gg/lastchance" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-200 transition-colors">Discord</a>
            <a href="https://medium.com/@lastchancetoken" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-200 transition-colors">Medium</a>
          </div>
          <p className="text-amber-300/80 mb-4">
            This is your <span className="text-amber-400 font-semibold">LAST CHANCE</span> - Don't let it slip away.
          </p>
          <p className="text-amber-400/60 text-sm">
            © 2025 Last Chance Token. All rights reserved. | Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;