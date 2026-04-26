import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Camera, Calendar } from "lucide-react";
import { CloudinaryResponse, uploadToCloudinary } from "@/utils/cloudinary";

// Types (same as before)
interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: string;
  avatar?: string;
  totalOrders?: number;
}

interface ProfileUpdate {
  avatar: string;
}
interface ProfileCardProps {
  user?: User;
  updateProfile: (data: ProfileUpdate) => Promise<void>;
  itemVariants: Variants;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  updateProfile,
  itemVariants,
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);


  // Handle upload function (same as before but with better error messages)
  const handleUpload = (): void => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    fileInput.onchange = async (event: Event): Promise<void> => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size must be less than 5MB");
        return;
      }

      try {
        setIsUploading(true);

        const profileImageUrl = await uploadToCloudinary(file);
        await updateProfile({ avatar: profileImageUrl });

        console.log("Profile updated successfully!");
        alert("Profile picture updated successfully!");
      } catch (error) {
        console.error("Failed to upload image:", error);

        // More specific error messages
        if (error instanceof Error) {
          if (error.message.includes("environment variables")) {
            alert(`Configuration error: ${error.message}`);
          } else if (error.message.includes("Cloudinary error")) {
            alert(`Upload failed: ${error.message}`);
          } else {
            alert(`Failed to upload image: ${error.message}`);
          }
        } else {
          alert("Failed to upload image. Please try again.");
        }
      } finally {
        setIsUploading(false);
        if (document.body.contains(fileInput)) {
          document.body.removeChild(fileInput);
        }
      }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
  };

  return (
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
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="w-[100%] h-[100%] rounded-full"
              />
            ) : (
              ""
            )}
          </div>
          <motion.button
            whileHover={{ scale: isUploading ? 1 : 1.1 }}
            whileTap={{ scale: isUploading ? 1 : 0.9 }}
            className="absolute bottom-0 right-0 text-white p-2 rounded-full shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
            disabled={isUploading}
            onClick={handleUpload}
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Camera className="w-4 h-4" />
            )}
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
            <span>Member since {user?.createdAt}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
