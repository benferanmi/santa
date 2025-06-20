
import api from '../lib/api';
import { VideoRequest, VideoOrder, VideoGenerationResponse, ApiResponse, PaginatedResponse } from '../types/api';

export class VideoApiService {
  // Create new video order
  static async createVideoOrder(videoData: VideoRequest): Promise<ApiResponse<VideoGenerationResponse>> {
    try {
      const formData = new FormData();
      formData.append('childName', videoData.childName);
      formData.append('childAge', videoData.childAge);
      if (videoData.frontDoorImage) {
        formData.append('frontDoorImage', videoData.frontDoorImage);
      }
      if (videoData.customMessage) {
        formData.append('customMessage', videoData.customMessage);
      }
      formData.append('videoStyle', videoData.videoStyle || 'classic');

      const response = await api.post('/videos/create', formData);
      return response;

      // Expected request body (FormData):
      // - childName: "Emma"
      // - childAge: "7"
      // - frontDoorImage: File object
      // - customMessage: "Emma has been very good this year"
      // - videoStyle: "classic" | "modern" | "animated"
      
      // Expected response:
      // {
      //   "success": true,
      //   "data": {
      //     "orderId": "order_123",
      //     "status": "pending",
      //     "estimatedCompletion": "2024-12-20T10:00:00Z",
      //     "message": "Video generation started successfully"
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to create video order' };
    }
  }

  // Get user's video orders
  static async getVideoOrders(page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<VideoOrder>>> {
    try {
      const response = await api.get(`/videos/orders?page=${page}&limit=${limit}`);
      return response;
      
      // Expected response:
      // {
      //   "success": true,
      //   "data": {
      //     "data": [
      //       {
      //         "id": "order_123",
      //         "userId": "user_456",
      //         "childName": "Emma",
      //         "childAge": "7",
      //         "frontDoorImage": "https://...",
      //         "customMessage": "Emma has been very good",
      //         "videoStyle": "classic",
      //         "status": "completed",
      //         "videoUrl": "https://...",
      //         "thumbnailUrl": "https://...",
      //         "paymentStatus": "paid",
      //         "createdAt": "2024-12-15T10:00:00Z",
      //         "updatedAt": "2024-12-16T10:00:00Z",
      //         "estimatedCompletion": "2024-12-16T10:00:00Z"
      //       }
      //     ],
      //     "pagination": {
      //       "page": 1,
      //       "limit": 10,
      //       "total": 25,
      //       "totalPages": 3
      //     }
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to fetch video orders' };
    }
  }

  // Get specific video order
  static async getVideoOrder(orderId: string): Promise<ApiResponse<VideoOrder>> {
    try {
      const response = await api.get(`/videos/orders/${orderId}`);
      return response;
      
      // Expected response: Single VideoOrder object
    } catch (error) {
      return { success: false, error: 'Failed to fetch video order' };
    }
  }

  // Check video generation status
  static async checkVideoStatus(orderId: string): Promise<ApiResponse<{ status: string, progress: number, estimatedCompletion?: string }>> {
    try {
      const response = await api.get(`/videos/status/${orderId}`);
      return response;
      
      // Expected response:
      // {
      //   "success": true,
      //   "data": {
      //     "status": "processing", // "pending" | "processing" | "completed" | "failed"
      //     "progress": 75, // 0-100
      //     "estimatedCompletion": "2024-12-16T10:00:00Z"
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to check video status' };
    }
  }

  // Download video
  static async downloadVideo(orderId: string): Promise<ApiResponse<{ downloadUrl: string, expiresAt: string }>> {
    try {
      const response = await api.get(`/videos/download/${orderId}`);
      return response;
      
      // Expected response:
      // {
      //   "success": true,
      //   "data": {
      //     "downloadUrl": "https://...",
      //     "expiresAt": "2024-12-20T10:00:00Z"
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to get download link' };
    }
  }

  // Cancel video order (if still pending)
  static async cancelVideoOrder(orderId: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete(`/videos/orders/${orderId}`);
      return response;
      
      // Expected response:
      // {
      //   "success": true,
      //   "message": "Video order cancelled successfully"
      // }
    } catch (error) {
      return { success: false, error: 'Failed to cancel video order' };
    }
  }

  // Request video regeneration (if failed)
  static async regenerateVideo(orderId: string): Promise<ApiResponse<VideoGenerationResponse>> {
    try {
      const response = await api.post(`/videos/regenerate/${orderId}`, {});
      return response;
      
      // Expected response: Same as createVideoOrder
    } catch (error) {
      return { success: false, error: 'Failed to regenerate video' };
    }
  }

  // Share video (get shareable link)
  static async shareVideo(orderId: string, expirationDays: number = 30): Promise<ApiResponse<{ shareUrl: string, expiresAt: string }>> {
    try {
      const response = await api.post(`/videos/share/${orderId}`, { expirationDays });
      return response;

      // Expected request body:
      // {
      //   "expirationDays": 30
      // }
      
      // Expected response:
      // {
      //   "success": true,
      //   "data": {
      //     "shareUrl": "https://app.com/share/video_token_123",
      //     "expiresAt": "2025-01-15T10:00:00Z"
      //   }
      // }
    } catch (error) {
      return { success: false, error: 'Failed to create share link' };
    }
  }
}
