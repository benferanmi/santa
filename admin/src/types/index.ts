
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Order {
  id: string;
  date: string;
  name: string;
  age: number;
  status: 'delivered' | 'pending';
  amount?: number;
  customerEmail?: string;
}

export interface DashboardStats {
  revenue: number;
  totalOrders: number;
  videosCompleted: number;
  revenueChange: number;
  ordersChange: number;
  videosChange: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
