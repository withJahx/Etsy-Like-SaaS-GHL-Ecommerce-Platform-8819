import React from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ArtSpace</h3>
            <p className="text-gray-400">
              The premier marketplace for AI-generated art, digital assets, and creative resources. 
              Empowering creators with cutting-edge AI tools.
            </p>
            <div className="flex space-x-4">
              <SafeIcon icon={FiFacebook} className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <SafeIcon icon={FiTwitter} className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <SafeIcon icon={FiInstagram} className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Browse</h4>
            <div className="space-y-2">
              <Link to="/marketplace" className="block text-gray-400 hover:text-white transition-colors">
                AI Art
              </Link>
              <Link to="/marketplace?category=fonts" className="block text-gray-400 hover:text-white transition-colors">
                Fonts
              </Link>
              <Link to="/marketplace?category=prompts" className="block text-gray-400 hover:text-white transition-colors">
                Prompt Guides
              </Link>
              <Link to="/marketplace?category=templates" className="block text-gray-400 hover:text-white transition-colors">
                Templates
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <div className="space-y-2">
              <Link to="/help" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link to="/licensing" className="block text-gray-400 hover:text-white transition-colors">
                Licensing
              </Link>
              <Link to="/guidelines" className="block text-gray-400 hover:text-white transition-colors">
                Creator Guidelines
              </Link>
              <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">support@artspace.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">1-800-ART-SPACE</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">123 Digital Street, AI City, AC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ArtSpace. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/dmca" className="text-gray-400 hover:text-white text-sm transition-colors">
              DMCA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;