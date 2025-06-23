import React from 'react';
import { motion } from 'framer-motion';

const SantaHelpersSection = () => {
  const helpers = [
    {
      name: "Jingle",
      title: "Chief Video Elf",
      traits: [
        "Wraps every message with magic",
        "Loves adding giggles to Santa's videos", 
        "Whistles carols while editing"
      ],
      emoji: "🧝‍♂️",
      color: "from-green-600 to-emerald-700"
    },
    {
      name: "Sparkle", 
      title: "Message Stylist",
      traits: [
        "Adds glitter and joy to every frame",
        "Makes sure every child feels special",
        "Runs on candy canes and smiles"
      ],
      emoji: "🧝‍♀️",
      color: "from-purple-600 to-pink-700"
    }
  ];

  return (
    <div className="py-10 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating magical sparkles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 text-lg opacity-70"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{ 
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Workshop tools floating around */}
        {["🔨", "⚙️", "🎨", "✂️", "🪄"].map((tool, i) => (
          <motion.div
            key={`tool-${i}`}
            className="absolute text-2xl opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              rotate: [0, 360],
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          >
            {tool}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Meet Santa's{" "}
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 10px #10b981",
                  "0 0 20px #10b981",
                  "0 0 10px #10b981"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-emerald-400"
            >
              Helpers
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 italic font-light"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mr-2"
            >
              ✨
            </motion.span>
            These magical elves work hard to make every video extra special!
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="inline-block ml-2"
            >
              ✨
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Helpers Row */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {helpers.map((helper, index) => (
            <motion.div
              key={helper.name}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6 + (index * 0.3),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Magical border animation */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${helper.color.includes('green') ? '#10b981' : '#a855f7'}, transparent)`
                  }}
                />

                <div className="relative z-10">
                  {/* Helper Info and Santa Image Row */}
                  <div className="flex items-start gap-6 mb-6">
                    {/* Helper Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-4xl"
                        >
                          {helper.emoji}
                        </motion.div>
                        <div>
                          <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (index * 0.3) }}
                            className="text-3xl font-bold text-white"
                          >
                            {helper.name}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + (index * 0.3) }}
                            className={`text-lg font-semibold bg-gradient-to-r ${helper.color} bg-clip-text text-transparent`}
                          >
                            {helper.title}
                          </motion.p>
                        </div>
                      </div>
                    </div>

                    {/* Santa Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1 + (index * 0.3),
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                      className="relative"
                    >
                      <div className="w-20 h-20 bg-gradient rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/30">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                          className="text-3xl"
                        >
                          🎅
                        </motion.div>
                      </div>
                      
                      {/* Floating sparkles around Santa */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`santa-sparkle-${i}`}
                          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                          }}
                          animate={{ 
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            y: [0, -10, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5 + index * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Traits List */}
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 + (index * 0.3) }}
                    className="space-y-3"
                  >
                    {helper.traits.map((trait, traitIndex) => (
                      <motion.li
                        key={traitIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 1.2 + (index * 0.3) + (traitIndex * 0.1)
                        }}
                        className="flex items-center gap-3 text-gray-200"
                      >
                        <motion.span
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            delay: traitIndex * 0.5
                          }}
                          className="text-yellow-400"
                        >
                          ⭐
                        </motion.span>
                        <span className="leading-relaxed">{trait}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-4"
          >
            🎪
          </motion.div>
          <p className="text-gray-400 italic">Santa's Workshop - Where Magic Happens!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SantaHelpersSection;