import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';

const { FiHeart, FiDownload, FiStar, FiEye, FiShoppingCart } = FiIcons;

const ProductCard = ({ product, viewMode, index }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success('Added to cart!');
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(product.isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
      >
        <Link to={`/product/${product.id}`} className="flex">
          <div className="relative w-48 h-48 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isOnSale && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Sale
              </div>
            )}
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
              {product.type}
            </div>
          </div>
          
          <div className="flex-1 p-6 flex justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">by {product.seller}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiDownload} className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{product.downloads} downloads</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-end justify-between ml-6">
              <div className="text-right mb-4">
                <div className="text-2xl font-bold text-primary-600">${product.price}</div>
                {product.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">${product.originalPrice}</div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full transition-colors ${
                    product.isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
                  }`}
                >
                  <SafeIcon icon={FiHeart} className="h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiShoppingCart} className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Sale
            </div>
          )}
          
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            {product.type}
          </div>
          
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full shadow-lg transition-colors ${
                product.isFavorite ? 'bg-red-100 text-red-500' : 'bg-white text-gray-600 hover:bg-red-100 hover:text-red-500'
              }`}
            >
              <SafeIcon icon={FiHeart} className="h-4 w-4" />
            </motion.button>
            
            <Link to={`/product/${product.id}`} className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiEye} className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-3">by {product.seller}</p>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiDownload} className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{product.downloads}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xl font-bold text-primary-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
              )}
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiDownload} className="h-4 w-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;