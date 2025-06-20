import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  User,
  Calendar,
  Play,
  Check,
  Clock,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useVideoOrder } from "../hooks/useVideoOrder";
import AppLayout from "@/components/layout/AppLayout";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { orders, loading } = useVideoOrder();
  const [activeTab, setActiveTab] = useState("orders");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "processing":
        return "text-yellow-500";
      case "pending":
        return "text-blue-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5" />;
      case "processing":
        return <Clock className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const formatDate = (date: string | Date) => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-red-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-between">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <div>
                  <h1
                    className="text-3xl font-bold text-red-700"
                    style={{ fontFamily: "cursive" }}
                  >
                    🎅 Ho Ho Ho, {user?.firstName}!
                  </h1>
                  <p className="text-green-600">
                    Welcome to your Christmas Dashboard
                  </p>
                </div>
              </motion.div>
              <motion.button
                variants={itemVariants}
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </motion.button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100 h-fit"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <nav className="space-y-2">
                <motion.button
                  variants={itemVariants}
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "orders"
                      ? "bg-red-100 text-red-700"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <Gift className="w-5 h-5" />
                  My Orders
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "profile"
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "settings"
                      ? "bg-red-100 text-red-700"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </motion.button>
              </nav>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "orders" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold text-red-700"
                    style={{ fontFamily: "cursive" }}
                  >
                    🎁 Your Christmas Video Orders
                  </motion.h2>

                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto"></div>
                      <p className="mt-2 text-gray-600">
                        Loading your magical orders...
                      </p>
                    </div>
                  ) : orders.length === 0 ? (
                    <motion.div
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-8 text-center border-2 border-red-100"
                    >
                      <Gift className="w-16 h-16 text-red-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No orders yet!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Create your first magical Santa video for your child.
                      </p>
                      <button className="bg-gradient-to-r from-red-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                        Create First Video
                      </button>
                    </motion.div>
                  ) : (
                    <div className="grid gap-6">
                      {orders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          variants={itemVariants}
                          custom={index}
                          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                                {order.childName[0]}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-red-700">
                                  Video for {order.childName}
                                </h3>
                                <p className="text-green-600">
                                  Age: {order.childAge} years old
                                </p>
                              </div>
                            </div>
                            <div
                              className={`flex items-center gap-2 ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              <span className="font-semibold capitalize">
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Ordered: {formatDate(order.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <CreditCard className="w-4 h-4" />
                              <span
                                className={
                                  order.paymentStatus === "paid"
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }
                              >
                                Payment: {order.paymentStatus}
                              </span>
                            </div>
                          </div>

                          {order.status === "completed" && order.videoUrl && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-gradient-to-r from-red-500 to-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                            >
                              <Play className="w-5 h-5" />
                              Watch Video
                            </motion.button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold text-green-700"
                    style={{ fontFamily: "cursive" }}
                  >
                    👤 Your Profile
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-100"
                  >
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-red-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={user?.firstName || ""}
                            className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-green-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={user?.lastName || ""}
                            className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-green-50/30"
                            readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-red-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                          readOnly
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-red-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold"
                      >
                        Edit Profile
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold text-red-700"
                    style={{ fontFamily: "cursive" }}
                  >
                    ⚙️ Account Settings
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100"
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-4">
                          Email Notifications
                        </h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="rounded"
                            />
                            <span>Order status updates</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="rounded"
                            />
                            <span>Video ready notifications</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span>Special offers and promotions</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-red-700 mb-4">
                          Account Actions
                        </h3>
                        <div className="space-y-3">
                          <button className="w-full text-left px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
                            Change Password
                          </button>
                          <button className="w-full text-left px-4 py-3 bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
