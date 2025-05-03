import React from 'react';
import { Facebook, Instagram, Send } from 'lucide-react';

const FooterSocial: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <a 
        href="https://www.facebook.com/ron.phearom/" 
        className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
        aria-label="Facebook"
      >
        <Facebook className="h-5 w-5" />
      </a>
      <a 
        href="#" 
        className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a 
        href="https://t.me/ronphearom" 
        className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
        aria-label="Telegram"
      >
        <Send className="h-5 w-5" />
      </a>
    </div>
  );
};

export default FooterSocial;