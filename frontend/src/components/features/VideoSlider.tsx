import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Gift, Star, Heart } from 'lucide-react';

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle video as main

  // Sample video data - you can replace with real video URLs
  const videos = [
    {
      id: 1,
      title: "Emma's Christmas Joy",
      thumbnail: "🎄",
      duration: "2:15",
      likes: 1234,
      description: "Watch Emma's priceless reaction to Santa's special message!"
    },
    {
      id: 2,
      title: "Tommy's Big Surprise",
      thumbnail: "🎅",
      duration: "1:45",
      likes: 2156,
      description: "Tommy couldn't believe Santa knew his name!"
    },
    {
      id: 3,
      title: "Sarah's Christmas Wish",
      thumbnail: "🎁",
      duration: "3:02",
      likes: 987,
      description: "The moment Sarah realized her wish came true!"
    },
    {
      id: 4,
      title: "Jake's Holiday Magic",
      thumbnail: "⭐",
      duration: "2:30",
      likes: 1567,
      description: "Pure magic captured in Jake's reaction!"
    },
    {
      id: 5,
      title: "Lily's Christmas Dream",
      thumbnail: "❄️",
      duration: "1:58",
      likes: 1890,
      description: "Lily's dream of meeting Santa came true!"
    }
  ];

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const getVisibleVideos = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + videos.length) % videos.length;
      result.push({ ...videos[index], position: i });
    }
    return result;
  };

  return (
    <div className="relative py-10 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 ">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {/* Floating Christmas Elements */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {['🎄', '🎅', '🎁', '⭐', '❄️', '🦌'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-yellow-300 via-red-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
              Reaction Videos
            </span>
            <br />
            <span className="text-white drop-shadow-lg">
              of Message from Santa
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mx-auto max-w-4xl border border-white/20"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              🎬 Send us your video reaction and win a discount! 🎁
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Share your child's magical moment receiving Santa's personal message and get a chance to win amazing discounts on future Santa videos!
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mx-auto mt-6 rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Video Slider Section */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={prevVideo}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-red-600/80 hover:bg-red-600 text-white p-3 md:p-4 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 shadow-xl"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            onClick={nextVideo}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-red-600/80 hover:bg-red-600 text-white p-3 md:p-4 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 shadow-xl"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Video Slider */}
          <div className="flex items-center justify-center px-16 md:px-24">
            <div className="flex items-center space-x-4 md:space-x-8 w-full max-w-6xl">
              <AnimatePresence mode="wait">
                {getVisibleVideos().map((video, index) => {
                  const isCenter = video.position === 0;
                  const isLeft = video.position === -1;
                  const isRight = video.position === 1;

                  return (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.6,
                        scale: isCenter ? 1 : 0.7,
                        x: video.position * (isCenter ? 0 : 20),
                        zIndex: isCenter ? 10 : 5,
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className={`relative ${isCenter
                          ? 'w-full max-w-2xl'
                          : 'w-64 md:w-80 hidden md:block'
                        }`}
                    >
                      {/* Video Container */}
                      <div className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 ${isCenter ? 'shadow-2xl' : 'shadow-lg'
                        }`}>
                        {/* Video Player */}
                        <div className={`relative bg-gradient-to-br from-red-600 to-green-700 rounded-xl overflow-hidden group ${isCenter ? 'aspect-video' : 'aspect-video'
                          }`}>
                          {/* Video Thumbnail */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className={`text-6xl md:text-8xl ${isCenter ? 'text-8xl md:text-9xl' : ''}`}
                            >
                              {video.thumbnail}
                            </motion.div>
                          </div>

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-red-600/90 text-white p-4 rounded-full shadow-lg"
                            >
                              <Play size={isCenter ? 32 : 24} />
                            </motion.button>
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            {video.duration}
                          </div>
                        </div>

                        {/* Video Info */}
                        <div className="mt-4">
                          <h3 className={`font-semibold text-white mb-2 ${isCenter ? 'text-xl md:text-2xl' : 'text-lg'
                            }`}>
                            {video.title}
                          </h3>
                          <p className={`text-white/80 mb-3 ${isCenter ? 'text-base' : 'text-sm hidden'
                            }`}>
                            {video.description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Heart size={16} className="text-red-400" />
                              <span className="text-white/70 text-sm">{video.likes.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className="text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mx-auto max-w-2xl border border-white/20">
            <Gift className="mx-auto mb-4 text-yellow-400" size={48} />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Share Your Magic? 🎥
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Upload your child's reaction video and join our magical community!
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(239, 68, 68, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 mr-4 mb-4 md:mb-0"
            >
              🎬 Upload Your Video
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm border border-white/30 transition-all duration-300"
            >
              📋 Contest Rules
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoSlider;