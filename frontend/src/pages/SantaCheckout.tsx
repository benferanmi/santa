import React, { useState } from "react";
import { motion } from "framer-motion";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Lock,
  CreditCard,
  User,
  Mail,
  MapPin,
  Gift,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { OrderData, usePayment } from "@/context/PaymentContext";

interface Props {
  clientSecret: string;
  orderData: OrderData;
}

const SantaCheckout: React.FC<Props> = ({ clientSecret, orderData }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "succeeded" | "failed"
  >("idle");
  const { generateVideo } = usePayment();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe is not ready. Please try again.");
      return;
    }

    setLoading(true);
    setPaymentStatus("processing");
    setMessage("");

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setMessage("Card element not found. Please refresh the page.");
      setLoading(false);
      setPaymentStatus("failed");
      return;
    }

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              address: {
                line1: formData.address,
                city: formData.city,
                postal_code: formData.zipCode,
              },
            },
          },
        }
      );

      if (error) {
        setMessage(error.message || "Payment failed. Please try again.");
        setPaymentStatus("failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("🎄 Ho ho ho! Your Christmas order is confirmed! 🎁");
        setPaymentStatus("succeeded");

        const videoData = {
          ...orderData,
          paymentIntentId: paymentIntent.id,
        };
        const result = await generateVideo(videoData);
        setMessage(`Ho ho ho! ${result.message}`);

        // Redirect to success page after a short delay
        setTimeout(() => {
          navigate("/order-success", {
            state: {
              paymentIntent,
              customerInfo: formData,
            },
          });
        }, 2000);
      }
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
      setPaymentStatus("failed");
      console.error("Payment error:", err);
    }

    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Custom styles for Stripe CardElement
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#374151",
        fontFamily: "system-ui, sans-serif",
        "::placeholder": {
          color: "#9CA3AF",
        },
        padding: "12px",
      },
      invalid: {
        color: "#EF4444",
        iconColor: "#EF4444",
      },
    },
    hidePostalCode: true, // We collect this separately
  };

  return (
    <AppLayout>
      <div className="py-20">
        <motion.div
          className="bg-gradient-to-br from-red-50 to-green-50 p-6 rounded-2xl shadow-xl border border-red-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="text-red-500 w-8 h-8" />
              <h1
                className="text-4xl font-bold text-red-700"
                style={{ fontFamily: "cursive" }}
              >
                Secure Checkout
              </h1>
              <Gift className="text-green-500 w-8 h-8" />
            </div>
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">
                Secured by Stripe & Santa's Magic
              </span>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit}>
            {/* Two Row Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Row 1: Shipping Information */}
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-100"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <User className="text-red-500 w-6 h-6" />
                  <h2
                    className="text-2xl font-bold text-red-700"
                    style={{ fontFamily: "cursive" }}
                  >
                    Delivery Details
                  </h2>
                </div>

                <div className="space-y-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-green-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                      placeholder="your.email@northpole.com"
                      required
                    />
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-green-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                        placeholder="Ho Ho"
                        required
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-green-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                        placeholder="Claus"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-green-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                      placeholder="123 Christmas Lane"
                      required
                    />
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-green-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                        placeholder="North Pole"
                        required
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-green-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                        placeholder="12345"
                        required
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Row 2: Payment Information */}
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="text-green-500 w-6 h-6" />
                  <h2
                    className="text-2xl font-bold text-green-700"
                    style={{ fontFamily: "cursive" }}
                  >
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-red-700 mb-2">
                      Card Details
                    </label>
                    <div className="border-2 border-green-200 rounded-lg p-3 bg-green-50/30 focus-within:border-green-500 transition-colors">
                      <CardElement options={cardElementOptions} />
                    </div>
                  </motion.div>

                  {/* Security Features */}
                  <motion.div
                    className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-lg border border-red-200"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <Lock className="w-4 h-4" />
                      <span className="font-semibold">
                        Your payment is secured by Stripe & Santa's magic
                        encryption
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Message Display */}
            {message && (
              <motion.div
                className={`mt-6 p-4 rounded-lg flex items-center gap-2 ${
                  paymentStatus === "succeeded"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : paymentStatus === "failed"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {paymentStatus === "succeeded" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : paymentStatus === "failed" ? (
                  <AlertCircle className="w-5 h-5" />
                ) : null}
                <span className="font-medium">{message}</span>
              </motion.div>
            )}

            {/* Complete Order Button */}
            <motion.div className="mt-8 text-center" variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={!stripe || loading || paymentStatus === "succeeded"}
                className={`px-12 py-4 rounded-full text-xl font-bold shadow-lg transition-all ${
                  loading || paymentStatus === "succeeded"
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-green-500 text-white hover:shadow-2xl"
                }`}
                style={{ fontFamily: "cursive" }}
                whileHover={
                  loading || paymentStatus === "succeeded"
                    ? {}
                    : {
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)",
                      }
                }
                whileTap={
                  loading || paymentStatus === "succeeded"
                    ? {}
                    : { scale: 0.95 }
                }
                transition={{ type: "spring", stiffness: 300 }}
              >
                {loading ? (
                  <>
                    🎅 Processing Christmas Magic...
                    <span className="ml-2 animate-spin">🎁</span>
                  </>
                ) : paymentStatus === "succeeded" ? (
                  "🎄 Order Confirmed! Redirecting... ✨"
                ) : (
                  "🎅 Complete Christmas Order 🎁"
                )}
              </motion.button>

              {paymentStatus === "idle" && (
                <motion.p
                  className="text-sm text-green-600 mt-3 font-medium"
                  variants={itemVariants}
                >
                  Ho ho ho! Your order will be delivered by Christmas Eve ✨
                </motion.p>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default SantaCheckout;
