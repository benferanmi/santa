import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SantaMagicCTASection = () => {
  return (
    <div className="py-12 md:py-20 lg:py-25 bg-cover bg-center bg-[url('https://res.cloudinary.com/dtcbirvxc/image/upload/v1754079528/me_sov9xv.jpg')] relative overflow-hidden flex items-center justify-center">
      {/* Light overlay to slightly enhance text readability without blocking the image */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
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
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Ready to Create{" "}
              <span className="text-yellow-300 drop-shadow-2xl">
                Santa Magic
              </span>
              <span className="ml-4">🪄</span>?
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
            <p className="text-xl lg:text-2xl text-white leading-relaxed max-w-3xl mx-auto px-6 py-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
              Give your child a Christmas memory they'll never forget with a
              personalised video message from{" "}
              <span className="text-red-300 font-semibold">Santa Claus</span>
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
              stiffness: 200,
            }}
            className="relative"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-6 rounded-full font-bold text-xl lg:text-2xl shadow-2xl transition-all duration-300 border-2 border-white/30 backdrop-blur-sm"
            >
              <Link to="/personalise" className="flex items-center gap-4">
                Create Your Video Now
                <span className="text-2xl">🎬</span>
              </Link>
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
            <p className="text-white w-fit block mx-auto text-lg italic px-6 py-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
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
