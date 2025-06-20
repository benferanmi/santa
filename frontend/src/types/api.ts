
// API Response Types and Expected JSON Data Structures

// User Account Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  avatar?: File;
}

export interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  twoFactorAuth: boolean;
  autoRenewal: boolean;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'stripe';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  paymentMethodId: string;
  orderData: {
    childName: string;
    childAge: string;
    frontDoorImage?: string;
  };
}

export interface PaymentResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  currency: string;
  paymentUrl?: string; // For redirects (Stripe, PayPal)
  orderId: string;
}

// Video Generation Types
export interface VideoRequest {
  childName: string;
  childAge: string;
  frontDoorImage?: File;
  customMessage?: string;
  videoStyle?: 'classic' | 'modern' | 'animated';
}

export interface VideoOrder {
  id: string;
  userId: string;
  childName: string;
  childAge: string;
  frontDoorImage?: string;
  customMessage?: string;
  videoStyle: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
  estimatedCompletion?: string;
}

export interface VideoGenerationResponse {
  orderId: string;
  status: string;
  estimatedCompletion: string;
  message: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
