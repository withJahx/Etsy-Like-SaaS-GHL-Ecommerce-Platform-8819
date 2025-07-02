import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiStar } = FiIcons;

const FilterSidebar = ({ filters, setFilters, showFilters, setShowFilters }) => {
  const categories = [
    'All Categories',
    'AI Art',
    'Fonts',
    'Prompt Guides',
    'Templates',
    'Icons',
    'Backgrounds'
  ];

  const priceRanges = [
    { label: 'Free', min: 0, max: 0 },
    { label: 'Under $10', min: 0, max: 10 },
    { label: '$10 - $25', min: 10, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: 'Over $50', min: 50, max: 1000 }
  ];

  const ratings = [5, 4, 3, 2, 1];

  const sidebarContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category === 'All Categories' ? '' : category}
                checked={filters.category === (category === 'All Categories' ? '' : category)}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-3 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange[0] === range.min && filters.priceRange[1] === range.max}
                onChange={() => setFilters({ ...filters, priceRange: [range.min, range.max] })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-3 text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Custom Price Range */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Range</h4>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => setFilters({ 
              ...filters, 
              priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({ 
              ...filters, 
              priceRange: [filters.priceRange[0], parseInt(e.target.value) || 100] 
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimum Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) => setFilters({ ...filters, rating: parseInt(e.target.value) })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <div className="ml-3 flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon
                    key={i}
                    icon={FiStar}
                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-gray-700 ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* File Type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">File Type</h3>
        <div className="space-y-2">
          {['PNG', 'JPG', 'SVG', 'PDF', 'AI', 'PSD'].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => setFilters({
          category: '',
          priceRange: [0, 100],
          rating: 0,
          sortBy: 'newest'
        })}
        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowFilters(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="bg-white w-80 h-full p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <SafeIcon icon={FiX} className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FilterSidebar;