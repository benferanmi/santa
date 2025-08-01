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
  Bell,
  Shield,
  Lock,
  RainbowIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useVideoOrder } from "../hooks/useVideoOrder";
import AppLayout from "@/components/layout/AppLayout";
import UserAccount from "./UserAccount";
import UserSettings from "./UserSettings";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { orders, loading } = useVideoOrder();
  const [activeTab, setActiveTab] = useState("orders");
  const { user, isAuthenticated, signOut } = useAuth();
  // const [activeSection, setActiveSection] = useState("account");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "processing":
        return "text-warning";
      case "pending":
        return "text-info";
      case "failed":
        return "text-error";
      default:
        return "text-base-content/60";
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

  const settingSections = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "theme", label: "Select Theme", icon: RainbowIcon },
  ];

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

  if (!isAuthenticated) {
    return (
      <AppLayout>
        <div className="space-y-6 flex items-center justify-center w-full py-[50px] lg:py-[100px] ">
          <div className="bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
            <div className="bg-error/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-error" />
            </div>

            <h1 className="text-2xl font-bold text-base-content mb-4">
              Authentication Required
            </h1>

            <p className="text-base-content/60 mb-8">
              You have to be authenticated before you can view this page
            </p>

            <Link
              to={"/register"}
              className="w-full bg-background hover:bg-base-content hover:text-background text-foreground font-base-content py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-info focus:ring-offset-2 outline-none"
            >
              Go to Registration
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background text-foreground py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="bg-base-100 rounded-2xl shadow-xl p-6 mb-8 border-2 border-error/20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-between">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div>
                  <div className="w-16 h-16 bg-gradient-to-r from-[var(--from-color)] via-[var(--via-color)] to-[var(--to-color)] rounded-full flex items-center justify-center text-base-100 text-2xl font-bold">
                    <img src={user?.avatar} alt="" />
                  </div>
                  <p className="text-accent text-center">
                    {user?.firstName?.[0]}
                  </p>
                </div>
                <div>
                  <h1
                    className="text-3xl font-bold text-error"
                    style={{ fontFamily: "cursive" }}
                  >
                    🎅 Ho Ho Ho, {user?.firstName}!
                  </h1>
                  <p className="text-success">
                    Welcome to your Christmas Dashboard
                  </p>
                </div>
              </motion.div>
              <motion.button
                variants={itemVariants}
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 bg-error/20 text-error rounded-lg hover:bg-error/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </motion.button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              className="bg-base-100 rounded-2xl shadow-xl p-6 border-2 border-success/20 h-fit"
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
                      ? "bg-error/20 text-error"
                      : "hover:bg-secondary text-base-content/60"
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
                      ? "bg-success/20 text-success"
                      : "hover:bg-secondary text-base-content/60"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </motion.button>

                <div>
                  <motion.button
                    variants={itemVariants}
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "settings"
                        ? "bg-error/20 text-error"
                        : "hover:bg-secondary text-base-content/60"
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    Settings
                  </motion.button>
                  {settingSections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveTab(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === section.id
                            ? "bg-error/20 text-error"
                            : "hover:bg-secondary text-base-content/60"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        {section.label}
                      </button>
                    );
                  })}
                </div>
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
                    className="text-2xl font-bold text-error"
                    style={{ fontFamily: "cursive" }}
                  >
                    🎁 Your Christmas Video Orders
                  </motion.h2>

                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-error border-t-transparent rounded-full mx-auto"></div>
                      <p className="mt-2 text-base-content/60">
                        Loading your magical orders...
                      </p>
                    </div>
                  ) : orders.length === 0 ? (
                    <motion.div
                      variants={itemVariants}
                      className="bg-base-100 rounded-2xl p-8 text-center border-2 border-error/20"
                    >
                      <Gift className="w-16 h-16 text-error/30 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-base-content mb-2">
                        No orders yet!
                      </h3>
                      <p className="text-base-content/60 mb-6">
                        Create your first magical Santa video for your child.
                      </p>
                      <button className="bg-primary text-base-100 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
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
                          className="bg-base-100 rounded-2xl shadow-lg p-6 border-2 border-success/20"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] rounded-full flex items-center justify-center text-base-100 font-bold">
                                {order.childName[0]}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-error">
                                  Video for {order.childName}
                                </h3>
                                <p className="text-success">
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
                            <div className="flex items-center gap-2 text-base-content/60">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Ordered: {formatDate(order.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-base-content/60">
                              <CreditCard className="w-4 h-4" />
                              <span
                                className={
                                  order.paymentStatus === "paid"
                                    ? "text-success"
                                    : "text-warning"
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
                              className="w-full bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-base-100 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
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
                <div>
                  <UserAccount />
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <motion.h2
                      variants={itemVariants}
                      className="text-2xl font-bold text-error"
                      style={{ fontFamily: "cursive" }}
                    >
                      ⚙️ Account Settings
                    </motion.h2>

                    <motion.div
                      variants={itemVariants}
                      className="bg-primary text-base-100 rounded-2xl shadow-lg p-6 border-2 border-success/20"
                    >
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-success mb-4">
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
                          <h3 className="text-lg font-semibold text-error mb-4">
                            Account Actions
                          </h3>
                          <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 bg-warning/20 text-warning rounded-lg border border-warning/30 hover:bg-warning/30 transition-colors">
                              Change Password
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-error/20 text-error rounded-lg border border-error/30 hover:bg-error/30 transition-colors">
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}
              <UserSettings activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
