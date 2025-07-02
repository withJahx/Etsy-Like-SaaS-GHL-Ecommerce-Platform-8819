import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

const { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiHeart, FiBell, FiDownload, FiZap } = FiIcons;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg"
            >
              <SafeIcon icon={FiZap} className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              ArtSpace
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI art, fonts, prompts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <SafeIcon icon={FiSearch} className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="text-gray-700 hover:text-primary-600 transition-colors">
              Browse
            </Link>
            
            {user ? (
              <>
                <Link to="/downloads" className="relative">
                  <SafeIcon icon={FiDownload} className="h-6 w-6 text-gray-700 hover:text-primary-600 transition-colors" />
                </Link>
                <Link to="/cart" className="relative">
                  <SafeIcon icon={FiShoppingCart} className="h-6 w-6 text-gray-700 hover:text-primary-600 transition-colors" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <Link to="/profile">
                  <SafeIcon icon={FiHeart} className="h-6 w-6 text-gray-700 hover:text-primary-600 transition-colors" />
                </Link>
                <Link to="/profile">
                  <SafeIcon icon={FiBell} className="h-6 w-6 text-gray-700 hover:text-primary-600 transition-colors" />
                </Link>

                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                    <SafeIcon icon={FiUser} className="h-6 w-6" />
                    <span className="hidden lg:block">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      {user.role === 'seller' && (
                        <Link to="/seller-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Creator Dashboard
                        </Link>
                      )}
                      <Link to="/buyer-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Downloads
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/auth" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t"
          >
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <SafeIcon icon={FiSearch} className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            <div className="space-y-2">
              <Link to="/marketplace" className="block py-2 text-gray-700">Browse Assets</Link>
              {user ? (
                <>
                  <Link to="/downloads" className="block py-2 text-gray-700">My Downloads</Link>
                  <Link to="/cart" className="flex items-center justify-between py-2 text-gray-700">
                    <span>Cart</span>
                    {getTotalItems() > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                  <Link to="/profile" className="block py-2 text-gray-700">Profile</Link>
                  {user.role === 'seller' && (
                    <Link to="/seller-dashboard" className="block py-2 text-gray-700">Creator Dashboard</Link>
                  )}
                  <Link to="/buyer-dashboard" className="block py-2 text-gray-700">My Downloads</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" className="block py-2 text-primary-600 font-medium">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;