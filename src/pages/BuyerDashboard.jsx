import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPackage, FiHeart, FiClock, FiCheck, FiTruck, FiStar, FiEye, FiMessageCircle } = FiIcons;

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    {
      id: '#1001',
      date: '2024-01-15',
      status: 'delivered',
      total: 89.99,
      items: [
        {
          name: 'Handwoven Ceramic Vase',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
          seller: 'ArtisanCrafts',
          price: 89.99,
          quantity: 1
        }
      ]
    },
    {
      id: '#1002',
      date: '2024-01-12',
      status: 'shipped',
      total: 110.00,
      items: [
        {
          name: 'Vintage Leather Journal',
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop',
          seller: 'LeatherWorks',
          price: 45.00,
          quantity: 1
        },
        {
          name: 'Macrame Wall Hanging',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop',
          seller: 'FiberArt',
          price: 65.00,
          quantity: 1
        }
      ]
    },
    {
      id: '#1003',
      date: '2024-01-10',
      status: 'processing',
      total: 125.00,
      items: [
        {
          name: 'Hand-carved Wooden Bowl',
          image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=100&h=100&fit=crop',
          seller: 'WoodCrafters',
          price: 125.00,
          quantity: 1
        }
      ]
    }
  ];

  const favorites = [
    {
      id: 1,
      name: 'Sterling Silver Earrings',
      price: 78.00,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop',
      seller: 'SilverSmith',
      rating: 4.6,
      inStock: true
    },
    {
      id: 2,
      name: 'Handknit Wool Scarf',
      price: 55.00,
      originalPrice: 75.00,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=200&h=200&fit=crop',
      seller: 'KnitCraft',
      rating: 4.4,
      inStock: true,
      isOnSale: true
    },
    {
      id: 3,
      name: 'Ceramic Coffee Mug Set',
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=200&h=200&fit=crop',
      seller: 'PotteryStudio',
      rating: 4.9,
      inStock: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return FiCheck;
      case 'shipped': return FiTruck;
      case 'processing': return FiClock;
      case 'pending': return FiClock;
      default: return FiClock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your orders and favorites</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['orders', 'favorites', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                      <p className="text-gray-600">Placed on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        <SafeIcon icon={getStatusIcon(order.status)} className="h-4 w-4 mr-1" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <p className="text-lg font-bold text-gray-900 mt-2">${order.total}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-gray-600">by {item.seller}</p>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                      <SafeIcon icon={FiEye} className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    {order.status === 'delivered' && (
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                        <SafeIcon icon={FiStar} className="h-4 w-4" />
                        <span>Write Review</span>
                      </button>
                    )}
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                      <SafeIcon icon={FiMessageCircle} className="h-4 w-4" />
                      <span>Contact Seller</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.isOnSale && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Sale
                    </div>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg text-red-500">
                    <SafeIcon icon={FiHeart} className="h-4 w-4 fill-current" />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {item.seller}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-primary-600">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">${item.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      disabled={!item.inStock}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      <SafeIcon icon={FiPackage} className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <SafeIcon icon={FiEye} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reviews</h3>
              <div className="text-center py-12">
                <SafeIcon icon={FiStar} className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">You haven't written any reviews yet.</p>
                <p className="text-gray-500 text-sm mt-2">Reviews help other buyers make informed decisions.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;