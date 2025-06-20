import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Camera, Save, Edit } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AppLayout from "@/components/layout/AppLayout";

const UserAccount = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center">
              <h1
                className="text-4xl font-bold text-primary mb-2"
                style={{ fontFamily: "cursive" }}
              >
                🎅 My Account
              </h1>
              <p className="text-secondary">Manage your Christmas profile</p>
            </motion.div>

            {/* Profile Picture Section */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100 rounded-2xl shadow-xl p-8 border-2 border-primary/10"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-primary">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-secondary text-lg">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2 text-base-content/70">
                    <Calendar className="w-4 h-4" />
                    <span>Member since December 2024</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Account Information */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100 rounded-2xl shadow-xl p-8 border-2 border-secondary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-2xl font-bold text-secondary"
                  style={{ fontFamily: "cursive" }}
                >
                  👤 Personal Information
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? "Cancel" : "Edit"}
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors ${
                      isEditing ? "bg-base-100" : "bg-primary/5"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors ${
                      isEditing ? "bg-base-100" : "bg-primary/5"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-secondary/20 rounded-lg focus:border-secondary focus:outline-none transition-colors ${
                      isEditing ? "bg-base-100" : "bg-secondary/5"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-secondary/20 rounded-lg focus:border-secondary focus:outline-none transition-colors ${
                      isEditing ? "bg-base-100" : "bg-secondary/5"
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors ${
                      isEditing ? "bg-base-100" : "bg-primary/5"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors ${
                      isEditing ? "bg-base-100" : "bg-primary/5"
                    }`}
                    placeholder="123 Christmas Lane"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-secondary/20 rounded-lg focus:border-secondary focus:outline-none transition-colors ${
                      isEditing ? "bg-base-100" : "bg-secondary/5"
                    }`}
                    placeholder="North Pole"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-secondary/20 rounded-lg focus:border-secondary focus:outline-none transition-colors ${
                      isEditing ? "bg-base-100" : "bg-secondary/5"
                    }`}
                    placeholder="12345"
                  />
                </div>
              </div>

              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex gap-4 justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Account Stats */}
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="bg-base-100 rounded-2xl shadow-lg p-6 border-2 border-primary/10 text-center">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-primary/80">Videos Created</div>
              </div>
              <div className="bg-base-100 rounded-2xl shadow-lg p-6 border-2 border-secondary/10 text-center">
                <div className="text-3xl font-bold text-secondary">2</div>
                <div className="text-secondary/80">Children Registered</div>
              </div>
              <div className="bg-base-100 rounded-2xl shadow-lg p-6 border-2 border-accent/10 text-center">
                <div className="text-3xl font-bold text-accent">Dec 2024</div>
                <div className="text-accent/80">Member Since</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UserAccount;
