import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  User,
  Calendar,
  Image,
  Play,
  Check,
  Gift,
  Star,
  Heart,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useVideoOrder } from "../hooks/useVideoOrder";
import AppLayout from "@/components/layout/AppLayout";

const Personalise = () => {
  const { isAuthenticated } = useAuth();
  const { createOrder, loading } = useVideoOrder();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    frontDoorPhoto: null as File | null,
  });
  const [fileName, setFileName] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        frontDoorPhoto: file,
      }));
      setFileName(file.name);
    }
  };

  const handleContinueToCheckout = async () => {
    if (!formData.childName || !formData.childAge) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const order = await createOrder({
        childName: formData.childName,
        childAge: formData.childAge,
        frontDoorImage: formData.frontDoorPhoto,
      });

      // Navigate to checkout with order data
      navigate("/checkout", { state: { order } });
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const videoFeatures = [
    {
      icon: <User className="text-gone" size={20} />,
      text: "Personalised greeting with your child's name",
    },
    {
      icon: <Calendar className="text-gtwo" size={20} />,
      text: "Reference to your child's age",
    },
    {
      icon: <Image className="text-blue-400" size={20} />,
      text: "Santa showing your front door in the video (if photo provided)",
    },
    {
      icon: <Gift className="text-yellow-400" size={20} />,
      text: "Magical Christmas message from Santa",
    },
  ];

  if (isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout>
      <div className="py-10 bg-background text-foreground relative overflow-hidden">
        {/* Subtle Background Animation */}
        <div className="absolute inset-0">
          {/* Gentle floating elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg opacity-10"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
                y:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 1000),
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 30 - 15, 0],
                rotate: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            >
              {["⭐", "❄️", "✨", "🎄"][Math.floor(Math.random() * 4)]}
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
              <span className="text-foreground/90">
                Fill in the details below to create a
              </span>
              <br />
              <span className="bg-gradient bg-clip-text text-transparent drop-shadow-lg">
                magical personalised video
              </span>
              <br />
              <span className="text-foreground/90">
                from Santa for your child.
              </span>
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
              <div className="bg-foreground/5 backdrop-blur-lg rounded-3xl p-8 border border-foreground/10 shadow-2xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold mb-2"
                >
                  <span className="bg-gradient bg-clip-text text-transparent">
                    Child's Information
                  </span>
                </motion.h2>
                <p className="text-foreground/70 mb-6">
                  This information will be used by Santa in the personalised
                  video.
                </p>

                <div className="space-y-6">
                  {/* Child's Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-foreground font-semibold mb-3 text-lg">
                      Child's Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40"
                        size={20}
                      />
                      <input
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleInputChange}
                        className="w-full bg-foreground/10 border border-background/70 rounded-2xl py-4 pl-12 pr-4 text-background placeholder-foreground/50 focus:outline-none focus:border-blue-400 focus:bg-foreground/15 transition-all duration-300"
                        placeholder="Enter your child's name"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Child's Age */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-foreground font-semibold mb-3 text-lg">
                      Child's Age *
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40"
                        size={20}
                      />
                      <select
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        className="w-full bg-foreground/10 border border-foreground/70 rounded-2xl py-4 pl-12 pr-4 text-background focus:outline-none focus:border-blue-400 focus:bg-foreground/15 transition-all duration-300 appearance-none cursor-pointer"
                        required
                      >
                        <option
                          value=""
                          className="bg-background text-foreground"
                        >
                          Select age
                        </option>
                        {[...Array(13)].map((_, i) => (
                          <option
                            key={i + 3}
                            value={i + 3}
                            className="bg-background text-foreground"
                          >
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
                    <label className="block text-foreground font-semibold mb-3 text-lg">
                      Front Door Photo
                      <span className="text-foreground/60 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <p className="text-foreground/60 text-sm mb-4">
                      Upload a photo of your front door for Santa to include in
                      the video.
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
                        className="bg-foreground/10 border-2 border-dashed border-foreground/30 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-foreground/15 transition-all duration-300 cursor-pointer"
                      >
                        <Upload
                          className="mx-auto mb-4 text-foreground/60"
                          size={32}
                        />
                        <p className="text-foreground font-medium mb-2">
                          Choose File
                        </p>
                        <p className="text-foreground/60 text-sm">
                          {fileName || "No file chosen"}
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
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinueToCheckout}
                  disabled={
                    loading || !formData.childName || !formData.childAge
                  }
                  className="flex-1 bg-gradient text-foreground font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Continue to Checkout 🛒"}
                </motion.button>

                <motion.button
                  onClick={togglePreview}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 hover:bg-foreground/20 text-background border border-4 border-gone font-semibold py-4 px-8 rounded-2xl transition-all duration-300 backdrop-blur-sm"
                >
                  <Play className="inline mr-2 stroke-gtwo" size={20} />
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
              <div className="bg-foreground/5 backdrop-blur-lg rounded-3xl p-8 border border-foreground/10 shadow-2xl">
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
                      className="flex items-start space-x-4 p-4 bg-foreground/5 rounded-xl border border-foreground/10"
                    >
                      <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                      <p className="text-foreground/90 leading-relaxed">
                        {feature.text}
                      </p>
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
                    className="bg-foreground/5 backdrop-blur-lg rounded-3xl p-8 border border-foreground/10 shadow-2xl"
                  >
                    <h4 className="text-xl font-bold text-foreground mb-4">
                      Video Preview
                    </h4>
                    <div className="aspect-video bg-gradient-to-br from-red-600 to-green-700 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl"
                      >
                        🎅
                      </motion.div>
                      <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-foreground/20 backdrop-blur-sm rounded-full p-4 cursor-pointer"
                        >
                          <Play className="text-foreground" size={32} />
                        </motion.div>
                      </div>
                    </div>
                    {formData.childName && (
                      <div className="mt-4 p-4 bg-foreground/10 rounded-lg">
                        <p className="text-foreground font-medium">
                          Preview: "Ho ho ho! Hello {formData.childName}! I hear
                          you're {formData.childAge} years old..."
                        </p>
                      </div>
                    )}
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
                    <h4 className="text-amber-600 font-semibold mb-2">
                      Delivery Info:
                    </h4>
                    <p className="text-amber-500/90 text-sm leading-relaxed">
                      Your personalized Santa video will be delivered to your
                      email within 24 hours after payment confirmation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Personalise;
