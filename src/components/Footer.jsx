// Footer.jsx
import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = ({ currentTexts, language }) => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="h-8 w-8 text-green-400 mr-2" />
          <span className="text-xl font-bold">FarmGuard Pro</span>
        </div>
        <p className="text-gray-400 mb-4">
          {language === 'hindi' ? 'आधुनिक तकनीक से किसानों की सेवा में' : 'Serving farmers with modern technology'}
        </p>
        <p className="text-sm text-gray-500">
          © 2024 FarmGuard Pro. {language === 'hindi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Made by <span className="font-semibold text-blue-300">Varun Tiwari</span>
        </p>
        <EasterEgg />
      </div>
  </footer>
  );
};



// Easter Egg: Clickable text that reveals a secret message with Varun Tiwari's name and moto
function EasterEgg() {
  const [show, setShow] = React.useState(false);
  return (
    <div className="mt-4">
      <button
        className="text-xs text-yellow-300 hover:underline focus:outline-none"
        onClick={() => setShow((s) => !s)}
        aria-label="Reveal secret"
      >
        {show
          ? (
            <span>
              � Secret Moto by <span className="font-semibold text-blue-300">Varun Tiwari</span>:<br />
              <span className="italic text-blue-200">"Always be tough from outside, and emotional & soft from inside."</span>
            </span>
          )
          : 'Psst... click me!'}
      </button>
    </div>
  );
}

export default Footer;
