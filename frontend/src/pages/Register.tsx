import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Gift, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/layout/AppLayout";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignIn) {
        await signIn(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        await signUp(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName
        );
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

  return (
    <AppLayout>
      <div className="py-20">
        <motion.div
          className="max-w-md mx-auto bg-gradient-to-br from-red-50 to-green-50 p-8 rounded-2xl shadow-xl border border-red-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="text-red-500 w-8 h-8" />
              <h1
                className="text-3xl font-bold text-red-700"
                style={{ fontFamily: "cursive" }}
              >
                {isSignIn ? "Welcome Back!" : "Join Santa's Workshop"}
              </h1>
            </div>
            <p className="text-green-700">
              {isSignIn
                ? "Sign in to create magical videos"
                : "Create an account to get started"}
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isSignIn && (
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-green-700 mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                    placeholder="Ho"
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
            )}

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

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-green-700 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {!isSignIn && (
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-green-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-green-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg disabled:opacity-50"
              style={{ fontFamily: "cursive" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              {loading
                ? "Please wait..."
                : isSignIn
                ? "🎅 Sign In"
                : "🎁 Create Account"}
            </motion.button>
          </form>

          {/* Toggle between Sign In/Sign Up */}
          <motion.div className="text-center mt-6" variants={itemVariants}>
            <p className="text-green-700">
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-red-600 font-bold hover:text-red-800 underline"
              >
                {isSignIn ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.div className="text-center mt-4" variants={itemVariants}>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Register;
