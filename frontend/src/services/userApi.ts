
import api from '../lib/api';
import { User, UserUpdateRequest, UserSettings, ApiResponse } from '../types/api';

export class UserApiService {
  // Get current user profile
  static async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get('/user/profile');
      return response;
      
      // Expected JSON from backend:
      // {
      //   "success": true,
      //   "data": {
      //     "id": "user123",
      //     "email": "user@example.com",
      //     "firstName": "John",
      //     "lastName": "Doe",
      //     "avatar": "https://...",
      //     "phone": "+1234567890",
      //     "dateOfBirth": "1990-01-01",
      //     "address": "123 Main St",
      //     "city": "New York",
      //     "zipCode": "10001",
      //     "createdAt": "2024-01-01T00:00:00Z",
      //     "updatedAt": "2024-01-01T00:00:00Z"
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to fetch profile' };
    }
  }

  // Update user profile
  static async updateProfile(data: UserUpdateRequest): Promise<ApiResponse<User>> {
    try {
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

      const response = await api.put('/user/profile', formData);
      return response;

      // Expected request body:
      // FormData or JSON:
      // {
      //   "firstName": "John",
      //   "lastName": "Doe Updated",
      //   "phone": "+1234567890",
      //   "dateOfBirth": "1990-01-01",
      //   "address": "456 New St",
      //   "city": "Boston",
      //   "zipCode": "02101",
      //   "avatar": File (if uploading)
      // }
      
      // Expected response: Same as getProfile
    } catch (error) {
      return { success: false, error: 'Failed to update profile' };
    }
  }

  // Get user settings
  static async getSettings(): Promise<ApiResponse<UserSettings>> {
    try {
      const response = await api.get('/user/settings');
      return response;
      
      // Expected JSON from backend:
      // {
      //   "success": true,
      //   "data": {
      //     "emailNotifications": true,
      //     "pushNotifications": false,
      //     "orderUpdates": true,
      //     "promotions": false,
      //     "twoFactorAuth": false,
      //     "autoRenewal": true
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to fetch settings' };
    }
  }

  // Update user settings
  static async updateSettings(settings: Partial<UserSettings>): Promise<ApiResponse<UserSettings>> {
    try {
      const response = await api.put('/user/settings', settings);
      return response;

      // Expected request body:
      // {
      //   "emailNotifications": true,
      //   "pushNotifications": false,
      //   "orderUpdates": true,
      //   "promotions": false,
      //   "twoFactorAuth": false,
      //   "autoRenewal": true
      // }
      
      // Expected response: Same as getSettings
    } catch (error) {
      return { success: false, error: 'Failed to update settings' };
    }
  }

  // Delete user account
  static async deleteAccount(): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete('/user/account');
      return response;
      
      // Expected response:
      // {
      //   "success": true,
      //   "message": "Account deleted successfully"
      // }
    } catch (error) {
      return { success: false, error: 'Failed to delete account' };
    }
  }

  // Change password
  static async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.put('/user/password', {
        currentPassword,
        newPassword
      });
      return response;

      // Expected request body:
      // {
      //   "currentPassword": "oldpass123",
      //   "newPassword": "newpass456"
      // }
      
      // Expected response:
      // {
      //   "success": true,
      //   "message": "Password changed successfully"
      // }
    } catch (error) {
      return { success: false, error: 'Failed to change password' };
    }
  }
}
