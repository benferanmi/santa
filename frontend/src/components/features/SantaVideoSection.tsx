import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const SantaVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative py-10 overflow-hidden bg-effect bg-image1">
      {/* Animated Christmas Background */}
      <div className="absolute inset-0 ">
        {/* Snowflakes */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
            }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Christmas Trees */}
        <div className="absolute bottom-0 left-0 w-full h-32  opacity-60" />

        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col justify-center items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 bg-gthree px-10 py-6 rounded-sm"
        >
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg">
            <span className="">See Santa</span>
          </h2>
          <h2 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
            <span className="">in Action</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-red-500 to-green-500 mx-auto mt-6 rounded-full max-w-md"
          />
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-4xl"
        >
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group">
              {!isPlaying ? (
                // Video Preview with Play Button
                <div className="relative w-full h-full bg-gradient-to-br from-red-600 to-green-700 flex items-center justify-center">
                  {/* Video Thumbnail Overlay */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Santa Silhouette */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-10 bottom-10 text-6xl opacity-30"
                  >
                    🎅
                  </motion.div>

                  {/* Reindeer */}
                  <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-10 text-4xl opacity-40"
                  >
                    🦌
                  </motion.div>

                  {/* Play Button */}
                  <motion.button
                    onClick={handlePlayClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 bg-gthree hover:bg-gone text-white rounded-full p-6 shadow-2xl transition-all duration-300 group"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play size={64} className="ml-2" />
                    </motion.div>

                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 group-hover:animate-ping" />
                  </motion.button>

                  {/* Play Text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold drop-shadow-lg"
                  >
                    Watch Santa's Magic ✨
                  </motion.p>
                </div>
              ) : (
                // Actual Video Player
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Santa in Action"
                    className="w-full h-full rounded-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              )}
            </div>

            {/* Video Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between mt-4 text-white/80"
            >
              <div className="flex items-center space-x-4">
                <span className="text-sm">🎬 Santa's Workshop Live</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">HD Quality</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 text-4xl"
          >
            ❄️
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-4 -left-4 text-4xl"
          >
            🎁
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-xl text-white/90 mb-6 max-w-2xl bg-black/50 p-2.5 bg-opacity-70">
            Experience the magic of Christmas as Santa brings joy to children
            around the world! Watch exclusive behind-the-scenes footage from the
            North Pole.
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(239, 68, 68, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gthree text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🎅 More Santa Videos
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SantaVideoSection;
