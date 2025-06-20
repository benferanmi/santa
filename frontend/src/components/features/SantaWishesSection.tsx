import React from 'react';
import { motion } from 'framer-motion';

const SantaWishesSection = () => {
  return (
    <div className="py-10 md:py-15 lg:py-20 bg-gradient-to-br from-red-900 via-red-800 to-green-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating snowflakes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white text-2xl opacity-70"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -50,
              rotate: 0 
            }}
            animate={{ 
              y: window.innerHeight + 50,
              rotate: 360,
              x: Math.random() * window.innerWidth
            }}
            transition={{ 
              duration: Math.random() * 3 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            ❄️
          </motion.div>
        ))}
        
        {/* Twinkling stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-300 text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="container w-[80%] mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold text-white leading-tight"
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    "0 0 10px #ff0000",
                    "0 0 20px #ff0000",
                    "0 0 10px #ff0000"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-red-400"
              >
                Santa
              </motion.span>{" "}
              <span className="text-green-400">Is Coming</span>
              <br />
              <span className="text-yellow-300">To Your House</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-lg text-gray-200 leading-relaxed"
            >
              <p>
                At <span className="text-red-400 font-semibold">Santa Wishes</span>, Santa and his elves have found a new way to spread even more magic — personalised video messages for children around the world!
              </p>
              
              <p>
                We believe that every child deserves a moment of pure joy and wonder during the holidays.
              </p>
              
              <p>
                With a sprinkle of Christmas magic and a dash of technology, we're bringing Santa closer to your home than ever before.{" "}
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  🎄
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block ml-2"
                >
                  ✨
                </motion.span>
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-300"
            >
              Create Magic Now 🎅
            </motion.button>
          </motion.div>

          {/* Right Image Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Animated border container */}
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'conic-gradient(from 0deg, #dc2626, #16a34a, #eab308, #dc2626)',
                  padding: '4px'
                }}
              >
                <div className="w-full h-full bg-gray-900 rounded-3xl"></div>
              </motion.div>

              {/* Inner glowing border */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(34, 197, 94, 0.3)",
                    "0 0 60px rgba(34, 197, 94, 0.5), 0 0 90px rgba(220, 38, 38, 0.3)",
                    "0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(34, 197, 94, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 aspect-square flex items-center justify-center border-2 border-white/20"
              >
                {/* Placeholder content */}
                <div className="text-center space-y-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-8xl"
                  >
                    🎅
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Your Magical Moment</h3>
                    <p className="text-gray-300">Personalized video message area</p>
                  </div>

                  {/* Floating decorative elements */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-2xl"
                    >
                      🎁
                    </motion.div>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, -10, 0]
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                      className="text-2xl"
                    >
                      🔔
                    </motion.div>
                  </div>
                </div>

                {/* Corner sparkles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-4 h-4 bg-yellow-400 rounded-full"
                    style={{
                      top: i < 2 ? '10px' : 'auto',
                      bottom: i >= 2 ? '10px' : 'auto',
                      left: i % 2 === 0 ? '10px' : 'auto',
                      right: i % 2 === 1 ? '10px' : 'auto'
                    }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.25
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SantaWishesSection;