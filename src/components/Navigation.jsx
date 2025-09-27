// Navigation.jsx
import React from 'react';

const Navigation = ({ activeTab, setActiveTab, currentTexts }) => {
  return (
    <nav className="bg-white shadow-md border-b-2 border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 md:space-x-8 overflow-x-auto py-2">
          {['home', 'detection', 'chatbot', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {currentTexts.tabs[tab]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
