export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  error?: {
    message: string;
  };
  [key: string]: any;
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Better error checking
  if (!cloudName) {
    throw new Error(
      "VITE_CLOUDINARY_CLOUD_NAME is not set in environment variables"
    );
  }

  if (!uploadPreset) {
    throw new Error(
      "VITE_CLOUDINARY_UPLOAD_PRESET is not set in environment variables"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data: CloudinaryResponse = await response.json();

    // Check for Cloudinary-specific errors
    if (data.error) {
      throw new Error(`Cloudinary error: ${data.error.message}`);
    }

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${JSON.stringify(
          data
        )}`
      );
    }

    if (!data.secure_url) {
      throw new Error("Upload successful but no secure_url returned");
    }

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
