
import React, { createContext, useContext, useState, useCallback } from 'react';
import { VideoRequest, VideoOrder, VideoGenerationResponse } from '../types/api';
import { VideoApiService } from '../services/videoApi';

interface VideoContextType {
  orders: VideoOrder[];
  loading: boolean;
  error: string | null;
  currentOrder: VideoOrder | null;
  fetchOrders: (page?: number, limit?: number) => Promise<void>;
  createVideoOrder: (videoData: VideoRequest) => Promise<VideoGenerationResponse | null>;
  getVideoOrder: (orderId: string) => Promise<VideoOrder | null>;
  checkVideoStatus: (orderId: string) => Promise<{ status: string, progress: number } | null>;
  downloadVideo: (orderId: string) => Promise<string | null>;
  cancelVideoOrder: (orderId: string) => Promise<boolean>;
  regenerateVideo: (orderId: string) => Promise<boolean>;
  shareVideo: (orderId: string, expirationDays?: number) => Promise<string | null>;
  clearError: () => void;
  setCurrentOrder: (order: VideoOrder | null) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<VideoOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentOrder, setCurrentOrder] = useState<VideoOrder | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchOrders = useCallback(async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await VideoApiService.getVideoOrders(page, limit);
      if (response.success && response.data) {
        setOrders(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch video orders');
      }
    } catch (err) {
      setError('Failed to fetch video orders');
    }
    setLoading(false);
  }, []);

  const createVideoOrder = useCallback(async (videoData: VideoRequest): Promise<VideoGenerationResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await VideoApiService.createVideoOrder(videoData);
      if (response.success && response.data) {
        // Refresh orders to include the new one
        fetchOrders();
        return response.data;
      } else {
        setError(response.error || 'Failed to create video order');
        return null;
      }
    } catch (err) {
      setError('Failed to create video order');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  const getVideoOrder = useCallback(async (orderId: string): Promise<VideoOrder | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await VideoApiService.getVideoOrder(orderId);
      if (response.success && response.data) {
        setCurrentOrder(response.data);
        return response.data;
      } else {
        setError(response.error || 'Failed to fetch video order');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch video order');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkVideoStatus = useCallback(async (orderId: string): Promise<{ status: string, progress: number } | null> => {
    try {
      const response = await VideoApiService.checkVideoStatus(orderId);
      if (response.success && response.data) {
        // Update the order in the list if we have it
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: response.data!.status as any }
            : order
        ));
        return response.data;
      } else {
        setError(response.error || 'Failed to check video status');
        return null;
      }
    } catch (err) {
      setError('Failed to check video status');
      return null;
    }
  }, []);

  const downloadVideo = useCallback(async (orderId: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await VideoApiService.downloadVideo(orderId);
      if (response.success && response.data) {
        return response.data.downloadUrl;
      } else {
        setError(response.error || 'Failed to get download link');
        return null;
      }
    } catch (err) {
      setError('Failed to get download link');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelVideoOrder = useCallback(async (orderId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await VideoApiService.cancelVideoOrder(orderId);
      if (response.success) {
        setOrders(prev => prev.filter(order => order.id !== orderId));
        return true;
      } else {
        setError(response.error || 'Failed to cancel video order');
        return false;
      }
    } catch (err) {
      setError('Failed to cancel video order');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const regenerateVideo = useCallback(async (orderId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await VideoApiService.regenerateVideo(orderId);
      if (response.success) {
        // Update the order status
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'pending' }
            : order
        ));
        return true;
      } else {
        setError(response.error || 'Failed to regenerate video');
        return false;
      }
    } catch (err) {
      setError('Failed to regenerate video');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const shareVideo = useCallback(async (orderId: string, expirationDays: number = 30): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await VideoApiService.shareVideo(orderId, expirationDays);
      if (response.success && response.data) {
        return response.data.shareUrl;
      } else {
        setError(response.error || 'Failed to create share link');
        return null;
      }
    } catch (err) {
      setError('Failed to create share link');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <VideoContext.Provider
      value={{
        orders,
        loading,
        error,
        currentOrder,
        fetchOrders,
        createVideoOrder,
        getVideoOrder,
        checkVideoStatus,
        downloadVideo,
        cancelVideoOrder,
        regenerateVideo,
        shareVideo,
        clearError,
        setCurrentOrder,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
