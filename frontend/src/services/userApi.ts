import api from "../lib/api";
import {
  User,
  UserUpdateRequest,
  UserSettings,
  ApiResponse,
} from "../types/api";

export class UserApiService {
  // Get current user profile
  static async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get("/user/profile");
      return response;
    } catch (error) {
      return { success: false, error: "Failed to fetch profile" };
    }
  }

  // Update user profile - now properly handles both JSON and FormData
  static async updateProfile(
    data: UserUpdateRequest
  ): Promise<ApiResponse<User>> {
    try {
      // Check if we need FormData (for file uploads)
      const hasFile = Object.values(data).some(
        (value) => value instanceof File
      );

      let requestData: FormData | UserUpdateRequest;

      if (hasFile) {
        // Use FormData for file uploads
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined) {
            if (value instanceof File) {
              formData.append(key, value);
            } else {
              formData.append(key, String(value));
            }
          }
        });
        requestData = formData;
      } else {
        // Use JSON for regular updates
        requestData = data;
      }

      const response = await api.put("/user/profile", requestData);
      return response;
    } catch (error) {
      return { success: false, error: "Failed to update profile" };
    }
  }

  // Alternative update method that matches your existing pattern
  static async updateProfileSimple(
    data: Partial<User>
  ): Promise<ApiResponse<User>> {
    try {
      const response = await api.put("/user/update", data);
      return response;
    } catch (error) {
      return { success: false, error: "Failed to update profile" };
    }
  }

  // Get user settings
  static async getSettings(): Promise<ApiResponse<UserSettings>> {
    try {
      const response = await api.get("/user/settings");
      return response;
    } catch (error) {
      return { success: false, error: "Failed to fetch settings" };
    }
  }

  // Update user settings
  static async updateSettings(
    settings: Partial<UserSettings>
  ): Promise<ApiResponse<UserSettings>> {
    try {
      const response = await api.put("/user/settings", settings);
      return response;
    } catch (error) {
      return { success: false, error: "Failed to update settings" };
    }
  }

  // Delete user account
  static async deleteAccount(): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete("/user/account");
      return response;
    } catch (error) {
      return { success: false, error: "Failed to delete account" };
    }
  }

  // Change password
  static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    try {
      const response = await api.put("/user/password", {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      return { success: false, error: "Failed to change password" };
    }
  }
}
