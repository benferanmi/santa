import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Lock,
  Mail,
  User,
  CreditCard,
  Gift,
  Bell,
  Shield,
  RainbowIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { THEMES } from "@/constants";
import { useThemes } from "@/context/ThemeContext";
import AppLayout from "@/components/layout/AppLayout";

const UserSettings = ({ activeTab }) => {
  const { user } = useAuth();
  const { theme, changeTheme } = useThemes();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotions: false,
    twoFactorAuth: false,
    autoRenewal: true,
  });

  const handleSettingChange = (setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
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

  const handleThemeToggle = async (t: string) => {
    await changeTheme(t);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[--color-primary]/10 to-[--color-secondary]/10 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <div className="block relative gap-8">
            {/* Settings Content */}
            <div className="lg:col-span-3">
              {activeTab === "account" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold text-primary"
                    style={{ fontFamily: "cursive" }}
                  >
                    👤 Account Settings
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="bg-background rounded-2xl shadow-lg p-6 border-2 border-secondary/20"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Basic Information
                    </h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Display Name
                          </label>
                          <input
                            type="text"
                            value={`${user?.firstName} ${user?.lastName}`}
                            className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:border-primary focus:outline-none transition-colors bg-primary/5"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user?.email || ""}
                            className="w-full px-4 py-3 border-2 border-secondary/30 rounded-lg focus:border-secondary focus:outline-none transition-colors bg-secondary/5"
                            readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Time Zone
                        </label>
                        <select className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:border-primary focus:outline-none transition-colors bg-background">
                          <option>North Pole Time (UTC-12)</option>
                          <option>Eastern Time (UTC-5)</option>
                          <option>Pacific Time (UTC-8)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: "cursive" }}
                  >
                    🔔 Notification Settings
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="bg-background rounded-2xl shadow-lg p-6 border-2 border-primary/20"
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">
                          Email Notifications
                        </h3>
                        <div className="space-y-4">
                          {[
                            {
                              key: "emailNotifications",
                              label: "Email notifications",
                              desc: "Receive all notifications via email",
                            },
                            {
                              key: "orderUpdates",
                              label: "Order updates",
                              desc: "Get notified about your video order status",
                            },
                            {
                              key: "promotions",
                              label: "Promotions & offers",
                              desc: "Receive special Christmas deals and offers",
                            },
                          ].map((item) => (
                            <div
                              key={item.key}
                              className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/30"
                            >
                              <div>
                                <div className="font-medium text-primary">
                                  {item.label}
                                </div>
                                <div className="text-sm text-base-content/70">
                                  {item.desc}
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={
                                    settings[
                                      item.key as keyof typeof settings
                                    ] as boolean
                                  }
                                  onChange={() => handleSettingChange(item.key)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-base-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold text-primary"
                    style={{ fontFamily: "cursive" }}
                  >
                    🛡️ Security Settings
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="bg-background rounded-2xl shadow-lg p-6 border-2 border-secondary/20"
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Password & Authentication
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-secondary/30">
                            <div>
                              <div className="font-medium text-foreground">
                                Change Password
                              </div>
                              <div className="text-sm text-base-content/70">
                                Update your account password
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2 bg-secondary text-white rounded-lg hover:brightness-110 transition-colors"
                            >
                              <Lock className="inline w-4 h-4 mr-2" />
                              Change
                            </motion.button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-secondary/30">
                            <div>
                              <div className="font-medium text-foreground">
                                Two-Factor Authentication
                              </div>
                              <div className="text-sm text-base-content/70">
                                Add an extra layer of security
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.twoFactorAuth}
                                onChange={() =>
                                  handleSettingChange("twoFactorAuth")
                                }
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-base-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-error"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "billing" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: "cursive" }}
                  >
                    💳 Billing Settings
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="bg-background rounded-2xl shadow-lg p-6 border-2 border-primary/20"
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">
                          Payment Methods
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/30">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-primary" />
                                <div>
                                  <div className="font-medium text-primary">
                                    •••• •••• •••• 1234
                                  </div>
                                  <div className="text-sm text-base-content/70">
                                    Expires 12/25
                                  </div>
                                </div>
                              </div>
                              <button className="text-primary hover:text-primary/80 transition-colors">
                                Edit
                              </button>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-4 border-2 border-dashed border-primary/40 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                          >
                            + Add New Payment Method
                          </motion.button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Billing Preferences
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-secondary/30">
                          <div>
                            <div className="font-medium text-foreground">
                              Auto-renewal
                            </div>
                            <div className="text-sm text-base-content/70">
                              Automatically renew subscriptions
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.autoRenewal}
                              onChange={() =>
                                handleSettingChange("autoRenewal")
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-base-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "theme" && (
                <div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Theme</h2>
                    <p className="text-sm text-base-content/70">
                      Choose a theme for your chat interface
                    </p>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {THEMES?.map((t) => (
                      <button
                        key={t}
                        className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                          theme === t ? "bg-secondary" : "hover:bg-base-200/50"
                        }`}
                        onClick={() => handleThemeToggle(t)}
                      >
                        <div
                          className="relative h-8 w-full rounded-md overflow-hidden"
                          data-theme={t}
                        >
                          <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                            <div className="rounded bg-secondary"></div>
                            <div className="rounded bg-background"></div>
                            <div className="rounded bg-primary"></div>
                            <div className="rounded bg-base-content"></div>
                          </div>
                        </div>

                        <span className="text-[11px] text-base-content font-medium truncate w-full text-center">
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-6">
                    <h1 className="text-3xl font-bold text-primary">
                      DaisyUI is Working 🎉
                    </h1>

                    <button className="btn btn-primary">Primary Button</button>
                    <button className="btn btn-secondary">
                      Secondary Button
                    </button>
                    <button className="btn btn-accent">Accent Button</button>

                    <div className="card w-96 bg-base-200 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">DaisyUI Card</h2>
                        <p>
                          This is a sample card component with text and actions.
                        </p>
                        <div className="card-actions justify-end">
                          <button className="btn btn-sm btn-primary">
                            Action
                          </button>
                        </div>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />

                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Pick a theme</span>
                      </label>
                      <select className="select select-bordered">
                        <option>light</option>
                        <option>dark</option>
                        <option>cupcake</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSettings;
