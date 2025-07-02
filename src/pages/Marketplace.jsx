import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import ProductCard from '../components/marketplace/ProductCard';
import FilterSidebar from '../components/marketplace/FilterSidebar';

const { FiGrid, FiList, FiFilter } = FiIcons;

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100],
    rating: 0,
    sortBy: 'newest'
  });

  // Mock products data - AI/Digital focused
  const mockProducts = [
    {
      id: 1,
      name: "AI Portrait Masterpiece Collection",
      price: 24.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
      seller: "DigitalArtist",
      rating: 4.8,
      reviews: 124,
      downloads: 2847,
      category: "AI Art",
      tags: ["portrait", "ai-generated", "high-res"],
      isOnSale: true,
      isFavorite: false,
      type: "AI Art Pack"
    },
    {
      id: 2,
      name: "Modern Typography Bundle",
      price: 18.00,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
      seller: "FontStudio",
      rating: 4.9,
      reviews: 89,
      downloads: 1523,
      category: "Fonts",
      tags: ["typography", "modern", "commercial"],
      isOnSale: false,
      isFavorite: true,
      type: "Font Collection"
    },
    {
      id: 3,
      name: "Midjourney Prompt Mastery Guide",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
      seller: "PromptMaster",
      rating: 4.7,
      reviews: 256,
      downloads: 3921,
      category: "Prompt Guides",
      tags: ["midjourney", "prompts", "guide"],
      isOnSale: false,
      isFavorite: false,
      type: "Digital Guide"
    },
    {
      id: 4,
      name: "Abstract AI Background Pack",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      seller: "AICreatives",
      rating: 5.0,
      reviews: 203,
      downloads: 892,
      category: "AI Art",
      tags: ["abstract", "backgrounds", "4k"],
      isOnSale: false,
      isFavorite: false,
      type: "Background Pack"
    },
    {
      id: 5,
      name: "DALL-E 3 Prompt Templates",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
      seller: "AIPrompts",
      rating: 4.6,
      reviews: 167,
      downloads: 2156,
      category: "Prompt Guides",
      tags: ["dall-e", "templates", "creative"],
      isOnSale: false,
      isFavorite: true,
      type: "Prompt Templates"
    },
    {
      id: 6,
      name: "Futuristic UI Icon Set",
      price: 22.00,
      originalPrice: 35.00,
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop",
      seller: "IconCraft",
      rating: 4.4,
      reviews: 92,
      downloads: 1847,
      category: "Templates",
      tags: ["icons", "ui", "futuristic"],
      isOnSale: true,
      isFavorite: false,
      type: "Icon Pack"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Marketplace</h1>
            <p className="text-gray-600">
              Discover premium AI-generated assets from talented creators
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <SafeIcon icon={FiGrid} className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <SafeIcon icon={FiList} className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2"
            >
              <SafeIcon icon={FiFilter} className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} results
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="downloads">Most Downloaded</option>
              </select>
            </div>

            {/* Products Grid/List */}
            <motion.div
              layout
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
              }
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Load More */}
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all"
              >
                Load More Assets
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;