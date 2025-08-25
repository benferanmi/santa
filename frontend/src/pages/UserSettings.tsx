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
  X,
  EyeOff,
  Eye,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { THEMES } from "@/constants";
import { useThemes } from "@/context/ThemeContext";
import AppLayout from "@/components/layout/AppLayout";
import { UserApiService } from "@/services/userApi";

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
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    setPasswordLoading(true);
    setPasswordError("");

    try {
      const result = await UserApiService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (result.success) {
        setPasswordSuccess(true);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          setShowPasswordForm(false);
          setPasswordSuccess(false);
        }, 2000);
      } else {
        setPasswordError(result.error || "Failed to change password");
      }
    } catch (error) {
      setPasswordError("An error occurred while changing password");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Reset form when closing
  const handleClosePasswordForm = () => {
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setPasswordSuccess(false);
  };

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
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-8">
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
                    className="bg-base-100 rounded-2xl shadow-lg p-6 border-2 border-secondary/20"
                  >
                    <h3 className="text-lg font-semibold text-base-content mb-4">
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
                          <label className="block text-sm font-semibold text-base-content mb-2">
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
                        <select className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:border-primary focus:outline-none transition-colors bg-base-100">
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
                    className="text-2xl font-bold text-base-content"
                    style={{ fontFamily: "cursive" }}
                  >
                    🔔 Notification Settings
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="bg-base-100 rounded-2xl shadow-lg p-6 border-2 border-primary/20"
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
                                <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
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
                    className="bg-base-100 rounded-2xl shadow-lg p-6 border-2 border-secondary/20"
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-base-content mb-4">
                          Password & Authentication
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-secondary/30">
                            <div>
                              <div className="font-medium text-base-content">
                                Change Password
                              </div>
                              <div className="text-sm text-base-content/70">
                                Update your account password
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setShowPasswordForm(true)}
                              className="px-4 py-2 bg-secondary text-base-100 rounded-lg hover:brightness-110 transition-colors"
                            >
                              <Lock className="inline w-4 h-4 mr-2" />
                              Change
                            </motion.button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-secondary/30">
                            <div>
                              <div className="font-medium text-base-content">
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
                              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-error"></div>
                            </label>
                          </div>

                          <button className="w-full text-left px-4 py-3 bg-error/20 text-error rounded-lg border border-error/30 hover:bg-error/30 transition-colors">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Password Change Modal */}
                  {showPasswordForm && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                      onClick={handleClosePasswordForm}
                    >
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-base-100 rounded-2xl shadow-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold  text-base-content">
                            Change Password
                          </h3>
                          <button
                            onClick={handleClosePasswordForm}
                            className="p-2 hover:bg-base-200 rounded-full transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {passwordSuccess && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 bg-success/20 text-success rounded-lg border border-success/30"
                          >
                            Password changed successfully!
                          </motion.div>
                        )}

                        {passwordError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 bg-error/20 text-error rounded-lg border border-error/30"
                          >
                            {passwordError}
                          </motion.div>
                        )}

                        <form
                          onSubmit={handlePasswordChange}
                          className="space-y-4"
                        >
                          {/* Current Password */}
                          <div>
                            <label className="block text-sm font-medium text-base-content mb-2">
                              Current Password
                            </label>
                            <div className="relative">
                              <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    currentPassword: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary pr-12"
                                placeholder="Enter current password"
                                required
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* New Password */}
                          <div>
                            <label className="block text-sm font-medium text-base-content mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    newPassword: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary pr-12"
                                placeholder="Enter new password"
                                required
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                              >
                                {showNewPassword ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Confirm New Password */}
                          <div>
                            <label className="block text-sm font-medium text-base-content mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-base border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                              placeholder="Confirm new password"
                              required
                            />
                          </div>

                          {/* Form Actions */}
                          <div className="flex space-x-3 pt-4">
                            <button
                              type="button"
                              onClick={handleClosePasswordForm}
                              className="flex-1 px-4 py-3  text-base-content bg-background rounded-lg hover:bg-base-300 transition-colors"
                              disabled={passwordLoading}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={passwordLoading}
                              className="flex-1 px-4 py-3 bg-secondary text-base rounded-lg hover:brightness-110 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {passwordLoading ? (
                                <div className="flex items-center justify-center">
                                  <div className="w-5 h-5 border-2 border-white/30 border-t-white bg-primary text-secondary rounded-full animate-spin mr-2"></div>
                                  Changing...
                                </div>
                              ) : (
                                "Change Password"
                              )}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </motion.div>
                  )}
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
                    className="text-2xl font-bold text-base-content"
                    style={{ fontFamily: "cursive" }}
                  >
                    💳 Billing Settings
                  </motion.h2>

                  <motion.div
                    variants={itemVariants}
                    className="bg-base-100 rounded-2xl shadow-lg p-6 border-2 border-primary/20"
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
                        <h3 className="text-lg font-semibold text-base-content mb-4">
                          Billing Preferences
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-secondary/30">
                          <div>
                            <div className="font-medium text-base-content">
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
                            <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
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
                          theme === t ? "bg-secondary" : "hover:bg-secondary/20"
                        }`}
                        onClick={() => handleThemeToggle(t)}
                      >
                        <div
                          className="relative h-8 w-full rounded-md overflow-hidden"
                          data-theme={t}
                        >
                          <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                            <div className="rounded bg-secondary"></div>
                            <div className="rounded bg-base-100"></div>
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

                  <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center gap-6 p-6">
                    <h1 className="text-3xl font-bold text-primary">
                      DaisyUI is Working 🎉
                    </h1>

                    <button className="btn btn-primary">Primary Button</button>
                    <button className="btn btn-secondary">
                      Secondary Button
                    </button>
                    <button className="btn btn-accent">Accent Button</button>

                    <div className="card w-96 bg-secondary shadow-xl">
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
