import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, User, Calendar, Image, Play, Check, Gift, Star, Heart } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Personalise = () => {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    frontDoorPhoto: null
  });
  const [fileName, setFileName] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isAuthenticated] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        frontDoorPhoto: file
      }));
      setFileName(file.name);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const videoFeatures = [
    {
      icon: <User className="text-red-400" size={20} />,
      text: "Personalised greeting with your child's name"
    },
    {
      icon: <Calendar className="text-green-400" size={20} />,
      text: "Reference to your child's age"
    },
    {
      icon: <Image className="text-blue-400" size={20} />,
      text: "Santa showing your front door in the video (if photo provided)"
    },
    {
      icon: <Gift className="text-yellow-400" size={20} />,
      text: "Magical Christmas message from Santa"
    }
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-10 bg-white text-black relative overflow-hidden">
      {/* Subtle Background Animation */}
      <div className="absolute inset-0">
        {/* Gentle floating elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          >
            {['⭐', '❄️', '✨', '🎄'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-black/90">Fill in the details below to create a</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-yellow-300 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
              magical personalised video
            </span>
            <br />
            <span className="text-black/90">from Santa for your child.</span>
          </motion.h1>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Child's Information Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold mb-2"
              >
                <span className="bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent">
                  Child's Information
                </span>
              </motion.h2>
              <p className="text-black/70 mb-6">
                This information will be used by Santa in the personalised video.
              </p>

              <div className="space-y-6">
                {/* Child's Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-black font-semibold mb-3 text-lg">
                    Child's Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/40" size={20} />
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-black/70 rounded-2xl py-4 pl-12 pr-4 text-black placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                      placeholder="Enter your child's name"
                    />
                  </div>
                </motion.div>

                {/* Child's Age */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-black font-semibold mb-3 text-lg">
                    Child's Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/40" size={20} />
                    <select
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-black/70 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-800">Select age</option>
                      {[...Array(13)].map((_, i) => (
                        <option key={i + 3} value={i + 3} className="bg-slate-800">
                          {i + 3} years old
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>

                {/* Front Door Photo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-black font-semibold mb-3 text-lg">
                    Front Door Photo
                    <span className="text-black/60 font-normal">(Optional)</span>
                  </label>
                  <p className="text-black/60 text-sm mb-4">
                    Upload a photo of your front door for Santa to include in the video.
                  </p>

                  <div className="relative">
                    <input
                      type="file"
                      id="frontDoorPhoto"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-black/10 border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                    >
                      <Upload className="mx-auto mb-4 text-black/60" size={32} />
                      <p className="text-black font-medium mb-2">Choose File</p>
                      <p className="text-black/60 text-sm">
                        {fileName || 'No file chosen'}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-red-800 to-red-700  text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg text-lg"
              >
                Continue to Checkout 🛒
              </motion.button>

              <motion.button
                onClick={togglePreview}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-100  hover:bg-white/20 text-black border border-4 border-red-800 font-semibold py-4 px-8 rounded-2xl border transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="inline mr-2 stroke-red-800" size={20} />
                Preview
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Video Features */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-green-400 to-red-400 bg-clip-text text-transparent">
                  Your Santa Video will include:
                </span>
              </motion.h3>

              <div className="space-y-4">
                {videoFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <p className="text-black/90 leading-relaxed">{feature.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Preview Video Mockup */}
            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-lg rounded-3xl p8 border border-white/10 shadow-2xl"
                >
                  <h4 className="text-xl font-bold text-black mb-4">Video Preview</h4>
                  <div className="aspect-video bg-gradient-to-br from-red-600 to-green-700 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl"
                    >
                      🎅
                    </motion.div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-4 cursor-pointer"
                      >
                        <Play className="text-black" size={32} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Delivery Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-amber-500/10 backdrop-blur-lg rounded-2xl p-6 border border-amber-400/20"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📧
                  </motion.div>
                </div>
                <div>
                  <h4 className="text-amber-600 font-semibold mb-2">Note:</h4>
                  <p className="text-amber-500/90 text-sm leading-relaxed">
                    The final video will be delivered to your email within 24 hours after purchase.
                    Make sure to check your spam folder if you don't see it.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SantaVideoForm;