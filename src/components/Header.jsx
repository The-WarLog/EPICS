// Header.jsx
import React from 'react';
import { Leaf } from 'lucide-react';

const Header = ({ currentTexts, language, setLanguage }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Leaf className="h-10 w-10 text-green-200" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{currentTexts.title}</h1>
              <p className="text-blue-100 text-sm md:text-base">{currentTexts.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-blue-800 text-white px-3 py-2 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
