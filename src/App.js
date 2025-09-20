// App.js - Main Application Component
import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Tokenomics from './components/Tokenomics';
import Presale from './components/Presale';
import Roadmap from './components/Roadmap';
import Announcements from './components/Announcements';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home setActiveSection={setActiveSection} />;
      case 'tokenomics':
        return <Tokenomics />;
      case 'presale':
        return <Presale />;
      case 'roadmap':
        return <Roadmap />;
      case 'announcements':
        return <Announcements />;
      default:
        return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        {renderActiveSection()}
      </main>

      <Footer />
      <MobileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
};

export default App;