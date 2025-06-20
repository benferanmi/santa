
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2, Home, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

const OrderSuccess = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300
      }
    }
  };

  return (
    <AppLayout>
      <div className="py-20">
        <motion.div
          className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-red-50 p-8 rounded-2xl shadow-xl border border-green-100 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Success Icon */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block"
            >
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            </motion.div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-green-700 mb-4" style={{ fontFamily: 'cursive' }}>
              🎉 Order Successful! 🎅
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              Ho ho ho! Your magical Christmas video is being prepared!
            </p>
            <p className="text-gray-600">
              Order #CHR-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100 mb-8"
          >
            <h2 className="text-2xl font-bold text-red-700 mb-4" style={{ fontFamily: 'cursive' }}>
              What happens next? 🎁
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Video Production</p>
                  <p className="text-gray-600 text-sm">Santa is personally creating your video in his workshop</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Email Delivery</p>
                  <p className="text-gray-600 text-sm">Your video will be delivered within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Download className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Download & Share</p>
                  <p className="text-gray-600 text-sm">Download your video and share the Christmas magic!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">📧</div>
              <div className="text-left">
                <h3 className="font-bold text-amber-800 mb-2">Check Your Email!</h3>
                <p className="text-amber-700 text-sm">
                  We've sent a confirmation to your email address. Please check your inbox (and spam folder) 
                  for updates on your video production status.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <motion.button
                  className="bg-gradient-to-r from-green-500 to-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg"
                  style={{ fontFamily: 'cursive' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Dashboard 📊
                </motion.button>
              </Link>
              
              <Link to="/personalise">
                <motion.button
                  className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Another Video 🎬
                </motion.button>
              </Link>
            </div>

            <Link to="/">
              <motion.button
                className="flex items-center justify-center space-x-2 text-green-600 hover:text-green-800 font-medium mx-auto"
                whileHover={{ scale: 1.05 }}
              >
                <Home className="w-4 h-4" />
                <span>← Back to Home</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Share Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-8 border-t border-green-200"
          >
            <p className="text-gray-600 mb-4">Spread the Christmas joy!</p>
            <div className="flex justify-center space-x-4">
              <motion.button
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default OrderSuccess;
