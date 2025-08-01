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
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
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
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: "var(--background)" }}
    >
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
              className="text-4xl font-bold mb-2"
              style={{
                fontFamily: "cursive",
                color: "var(--foreground)",
              }}
            >
              🎅 My Account
            </h1>
            <p style={{ color: "var(--foreground)" }}>
              Manage your Christmas profile
            </p>
          </motion.div>

          {/* Profile Picture Section */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl shadow-xl p-8 border-2"
            style={{
              backgroundColor: "var(--color-base-100)",
              borderColor: "var(--color-primary)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                  }}
                >
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 text-white p-2 rounded-full shadow-lg"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="text-center md:text-left">
                <h2
                  className="text-3xl font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-lg" style={{ color: "var(--foreground)" }}>
                  {user?.email}
                </p>
                <div
                  className="flex items-center gap-2 mt-2"
                  style={{ color: "var(--color-base-content)" }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Member since {user && user.createdAt}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Account Information */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl shadow-xl p-8 border-2"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--color-secondary)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-2xl font-bold"
                style={{
                  fontFamily: "cursive",
                  color: "var(--foreground)",
                }}
              >
                👤 Personal Information
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--foreground)",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "var(--color-secondary)")
                }
              >
                <Edit className="w-4 h-4" />
                {isEditing ? "Cancel" : "Edit"}
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  <User className="inline w-4 h-4 mr-1" />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-primary)",
                    backgroundColor: isEditing
                      ? "var(--color-base-100)"
                      : "var(--color-secondary)",
                    color: "var(--color-base-content)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--from-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--color-primary)")
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  <User className="inline w-4 h-4 mr-1" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-primary)",
                    backgroundColor: isEditing
                      ? "var(--color-base-100)"
                      : "var(--color-secondary)",
                    color: "var(--color-base-content)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--from-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--color-primary)")
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-secondary)",
                    backgroundColor: isEditing
                      ? "var(--color-base-100)"
                      : "var(--color-accent)",
                    color: "var(--color-base-content)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--to-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--color-secondary)")
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-secondary)",
                    backgroundColor: isEditing
                      ? "var(--color-base-100)"
                      : "var(--color-accent)",
                    color: "var(--color-base-content)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--to-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--color-secondary)")
                  }
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-primary)",
                    backgroundColor: isEditing
                      ? "var(--color-base-100)"
                      : "var(--color-secondary)",
                    color: "var(--color-base-content)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--from-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--color-primary)")
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-primary)",
                    backgroundColor: isEditing
                      ? "var(--color-base-100)"
                      : "var(--color-secondary)",
                    color: "var(--color-base-content)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--from-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--color-primary)")
                  }
                  placeholder="123 Christmas Lane"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-secondary)",
                    backgroundColor: isEditing
                      ? "var(--color-base-100)"
                      : "var(--color-accent)",
                    color: "var(--color-base-content)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--to-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--color-secondary)")
                  }
                  placeholder="North Pole"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-secondary)",
                    backgroundColor: isEditing
                      ? "var(--color-base-100)"
                      : "var(--color-accent)",
                    color: "var(--color-base-content)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--to-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--color-secondary)")
                  }
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
                  className="flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                  }}
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
            <div
              className="rounded-2xl shadow-lg p-6 border-2 text-center"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--color-primary)",
              }}
            >
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                3
              </div>
              <div style={{ color: "var(--foreground)" }}>Videos Created</div>
            </div>
            <div
              className="rounded-2xl shadow-lg p-6 border-2 text-center"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--color-secondary)",
              }}
            >
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                2
              </div>
              <div style={{ color: "var(--foreground)" }}>
                Children Registered
              </div>
            </div>
            <div
              className="rounded-2xl shadow-lg p-6 border-2 text-center"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--color-accent)",
              }}
            >
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--color-accent)" }}
              >
                Dec 2024
              </div>
              <div style={{ color: "var(--color-accent)" }}>Member Since</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserAccount;
