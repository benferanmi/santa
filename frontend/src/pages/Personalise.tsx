/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  User,
  Calendar,
  Image,
  Check,
  Gift,
  Crown,
  Sparkles,
  Video,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useVideoOrder } from "../hooks/useVideoOrder";
import AppLayout from "@/components/layout/AppLayout";
import { usePayment } from "@/context/PaymentContext";
import SantaCheckout from "./SantaCheckout";

interface Plan {
  created_at: string;
  description: string;
  id: string;
  price: number;
  videos_included: number;
}

const Personalise = () => {
  const { isAuthenticated } = useAuth();
  const { createOrder, loading: orderLoading } = useVideoOrder();
  const { createStripePaymentIntent, getPlans } = usePayment();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string>("");

  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    frontDoorPhoto: null as File | null,
  });
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setPlansLoading(true);
        setPlansError("");
        const result = await getPlans();

        if (result?.success && result.data) {
          setPlans(result.data);
          // If there's only one plan, auto-select it
          if (result.data.length === 1) {
            setSelectedPlanId(result.data[0].id);
          }
        } else {
          setPlansError("Failed to fetch plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        setPlansError("Failed to fetch plans");
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, [getPlans]);

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

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  const getSelectedPlan = () => {
    return plans.find((plan) => plan.id === selectedPlanId);
  };

  const handleContinueToCheckout = async () => {
    if (!formData.childName || !formData.childAge) {
      alert("Please fill in all required fields");
      return;
    }

    if (!selectedPlanId) {
      alert("Please select a plan");
      return;
    }

    try {
      const orderData = {
        childName: formData.childName,
        childAge: formData.childAge,
        pricingId: selectedPlanId,
        frontDoorImage: formData.frontDoorPhoto,
      };

      const res = await createStripePaymentIntent(orderData);

      if (res?.success) {
        setClientSecret(res.client_secret);
      } else {
        alert("Failed to create payment intent. Please try again.");
        return;
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  const videoFeatures = [
    {
      icon: <User className="text-success" size={20} />,
      text: "Personalised greeting with your child's name",
    },
    {
      icon: <Calendar className="text-info" size={20} />,
      text: "Reference to your child's age",
    },
    {
      icon: <Image className="text-accent" size={20} />,
      text: "Santa showing your front door in the video (if photo provided)",
    },
    {
      icon: <Gift className="text-warning" size={20} />,
      text: "Magical Christmas message from Santa",
    },
  ];

  if (clientSecret) {
    const orderData = {
      childName: formData.childName,
      childAge: Number(formData.childAge),
      pricingId: selectedPlanId,
    };
    return <SantaCheckout clientSecret={clientSecret} orderData={orderData} />;
  }

  return (
    <AppLayout>
      <div className="py-10 bg-base-100 text-base-content relative overflow-hidden">
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
              <span className="text-base-content/90">
                Fill in the details below to create a
              </span>
              <br />
              <span className="bg-gradient-to-r from-success to-error bg-clip-text text-transparent drop-shadow-lg">
                magical personalised video
              </span>
              <br />
              <span className="text-base-content/90">
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
              {/* Plans Section */}
              {plansLoading ? (
                <div className="bg-base-content/5 backdrop-blur-lg rounded-3xl p-8 border border-base-content/10 shadow-2xl">
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="text-4xl"
                      >
                        ✨
                      </motion.div>
                      <p className="text-base-content/70">
                        Loading magical plans...
                      </p>
                    </div>
                  </div>
                </div>
              ) : plansError ? (
                <div className="bg-error/10 backdrop-blur-lg rounded-3xl p-8 border border-error/20 shadow-2xl">
                  <p className="text-error text-center">{plansError}</p>
                </div>
              ) : plans.length > 1 ? (
                <div className="bg-base-content/5 backdrop-blur-lg rounded-3xl p-8 border border-base-content/10 shadow-2xl">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl font-bold mb-2"
                  >
                    <span className="bg-gradient-to-r from-success to-error bg-clip-text text-transparent">
                      Choose Your Plan 🎄
                    </span>
                  </motion.h2>
                  <p className="text-base-content/70 mb-6">
                    Select the perfect plan for creating Santa's magical
                    message.
                  </p>

                  <div className="grid gap-4">
                    {plans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className={`relative cursor-pointer rounded-2xl border-2 transition-all duration-300 ${
                          selectedPlanId === plan.id
                            ? "border-success bg-success/10 shadow-lg"
                            : "border-base-content/20 bg-base-content/5 hover:border-success/50 hover:bg-success/5"
                        }`}
                        onClick={() => handlePlanSelect(plan.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-r from-success to-error rounded-full flex items-center justify-center">
                                  {plan.videos_included === 1 ? (
                                    <Video className="text-white" size={24} />
                                  ) : (
                                    <Crown className="text-white" size={24} />
                                  )}
                                </div>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-base-content">
                                  {plan.videos_included === 1
                                    ? "Single Video"
                                    : `${plan.videos_included} Videos`}
                                </h3>
                                <p className="text-base-content/70">
                                  {plan.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-success">
                                £{formatPrice(plan.price)}
                              </div>
                              <div className="text-sm text-base-content/60">
                                {plan.videos_included > 1
                                  ? `£${formatPrice(
                                      plan.price / plan.videos_included
                                    )} per video`
                                  : "One-time payment"}
                              </div>
                            </div>
                          </div>

                          {selectedPlanId === plan.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-4 right-4"
                            >
                              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                                <Check className="text-white" size={16} />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : plans.length === 1 ? (
                <div className="bg-base-content/5 backdrop-blur-lg rounded-3xl p-8 border border-base-content/10 shadow-2xl">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl font-bold mb-2"
                  >
                    <span className="bg-gradient-to-r from-success to-error bg-clip-text text-transparent">
                      Your Santa Video Plan 🎅
                    </span>
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-success/10 to-error/10 rounded-2xl p-6 border border-success/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-success to-error rounded-full flex items-center justify-center">
                          <Gift className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-base-content">
                            {plans[0].description}
                          </h3>
                          <p className="text-base-content/70">
                            {plans[0].videos_included} magical video
                            {plans[0].videos_included > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-success">
                          £{formatPrice(plans[0].price)}
                        </div>
                        <div className="text-sm text-base-content/60">
                          One-time payment
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : null}

              {/* Child's Information Card */}
              <div className="bg-base-content/5 backdrop-blur-lg rounded-3xl p-8 border border-base-content/10 shadow-2xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold mb-2"
                >
                  <span className="bg-gradient-to-r from-success to-info bg-clip-text text-transparent">
                    Child's Information
                  </span>
                </motion.h2>
                <p className="text-base-content/70 mb-6">
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
                    <label className="block text-base-content font-semibold mb-3 text-lg">
                      Child's Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40"
                        size={20}
                      />
                      <input
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleInputChange}
                        className="w-full bg-secondary border border-secondary/70 rounded-2xl py-4 pl-12 pr-4 text-secondary-content placeholder-base-content/50 focus:outline-none focus:border-accent focus:bg-secondary/80 transition-all duration-300"
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
                    <label className="block text-base-content font-semibold mb-3 text-lg">
                      Child's Age *
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40"
                        size={20}
                      />
                      <select
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        className="w-full bg-secondary border border-secondary/70 rounded-2xl py-4 pl-12 pr-4 text-secondary-content focus:outline-none focus:border-accent focus:bg-secondary/80 transition-all duration-300 appearance-none cursor-pointer"
                        required
                      >
                        <option
                          value=""
                          className="bg-base-100 text-base-content"
                        >
                          Select age
                        </option>
                        {[...Array(13)].map((_, i) => (
                          <option
                            key={i + 3}
                            value={i + 3}
                            className="bg-base-100 text-base-content"
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
                    <label className="block text-base-content font-semibold mb-3 text-lg">
                      Front Door Photo
                      <span className="text-base-content/60 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <p className="text-base-content/60 text-sm mb-4">
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
                        className="bg-base-content/10 border-2 border-dashed border-base-content/30 rounded-2xl p-8 text-center hover:border-accent hover:bg-base-content/15 transition-all duration-300 cursor-pointer"
                      >
                        <Upload
                          className="mx-auto mb-4 text-base-content/60"
                          size={32}
                        />
                        <p className="text-base-content font-medium mb-2">
                          Choose File
                        </p>
                        <p className="text-base-content/60 text-sm">
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
                    boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinueToCheckout}
                  disabled={
                    orderLoading ||
                    !formData.childName ||
                    !formData.childAge ||
                    !selectedPlanId ||
                    plansLoading
                  }
                  className="flex-1 bg-gradient-to-r from-success to-info text-base-100 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {orderLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Checkout</span>
                      <span>🛒</span>
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Selected Plan Summary */}
              {selectedPlanId && getSelectedPlan() && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-success/10 backdrop-blur-lg rounded-2xl p-6 border border-success/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="text-success" size={24} />
                      <div>
                        <h4 className="text-success font-semibold">
                          Selected Plan
                        </h4>
                        <p className="text-success/80 text-sm">
                          {getSelectedPlan()?.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-success font-bold text-xl">
                      £{formatPrice(getSelectedPlan()?.price || 0)}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Video Features */}
              <div className="bg-base-content/5 backdrop-blur-lg rounded-3xl p-8 border border-base-content/10 shadow-2xl">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-success to-error bg-clip-text text-transparent">
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
                      className="flex items-start space-x-4 p-4 bg-base-content/5 rounded-xl border border-base-content/10"
                    >
                      <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                      <p className="text-base-content/90 leading-relaxed">
                        {feature.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-warning/10 backdrop-blur-lg rounded-2xl p-6 border border-warning/20"
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
                    <h4 className="text-warning font-semibold mb-2">
                      Delivery Info:
                    </h4>
                    <p className="text-warning/90 text-sm leading-relaxed">
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
