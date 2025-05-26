import React from 'react';
import { Facebook, Youtube, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-red-800 to-red-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎄</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">International Elf HQ</h3>
              </div>
            </div>
            <p className="text-red-100 leading-relaxed max-w-sm">
              Creating magical Christmas memories with personalised videos from Santa Claus.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-2">
              <a 
                href="#facebook" 
                className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#youtube" 
                className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#twitter" 
                className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-yellow-200">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#privacy" className="text-red-100 hover:text-yellow-200 transition-colors duration-200 flex items-center">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#guides" className="text-red-100 hover:text-yellow-200 transition-colors duration-200 flex items-center">
                  User Guides
                </a>
              </li>
              <li>
                <a href="#faq" className="text-red-100 hover:text-yellow-200 transition-colors duration-200 flex items-center">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-yellow-200">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#contact" className="text-red-100 hover:text-yellow-200 transition-colors duration-200 flex items-center">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#about" className="text-red-100 hover:text-yellow-200 transition-colors duration-200 flex items-center">
                  About
                </a>
              </li>
              <li>
                <a 
                  href="mailto:santa@santavideowishes.com" 
                  className="text-red-100 hover:text-yellow-200 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>santa@santavideowishes.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-red-700 bg-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-red-200 text-sm">
              © {currentYear} Santa Video Wishes. All rights reserved.
            </p>
            <a 
              href="#terms" 
              className="text-red-200 hover:text-yellow-200 text-sm transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Christmas Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <div className="flex justify-center space-x-8 opacity-10">
          <span className="text-6xl">❄️</span>
          <span className="text-4xl">🎅</span>
          <span className="text-5xl">⭐</span>
          <span className="text-4xl">🦌</span>
          <span className="text-6xl">❄️</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;