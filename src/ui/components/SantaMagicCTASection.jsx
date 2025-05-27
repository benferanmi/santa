import { motion } from 'framer-motion';

const SantaMagicCTASection = () => {
  return (
    <div className="py-12 md:py-20 lg:py-25 bg-[url('https://res.cloudinary.com/dtcbirvxc/image/upload/v1748293561/ka3cdz0a0a3c4zvarte7.jpg')] relative overflow-hidden flex items-center justify-center">


      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-5xl lg:text-7xl font-bold text-black leading-tight">
              Ready to Create{" "}
              <span className="text-yellow-400">Santa Magic</span>
              <span className="ml-4">🪄</span>
              ?
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="text-xl lg:text-2xl text-black-200 leading-relaxed max-w-3xl mx-auto px-3 py-4 bg-white/50 bg-opacity-70">
              Give your child a Christmas memory they'll never forget with a personalised video message from{" "}
              <span className="text-red-400 font-semibold">Santa Claus</span>
              <span className="ml-2">🎅</span>.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 200
            }}
            className="relative"
          >
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-800 text-white px-12 py-6 rounded-full font-bold text-xl lg:text-2xl shadow-2xl transition-all duration-300 border-2 border-white/20"
            >
              <span className="flex items-center gap-4">
                Create Your Video Now
                <span className="text-2xl">🎬</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <p className="text-black-300 w-fit block mx-auto text-lg italic px-3 py-4 bg-white/90 bg-opacity-90">
              <span className="mr-2">🎪</span>
              The magic starts with just one click!
              <span className="ml-2">🎪</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SantaMagicCTASection;