import {
  User,
  Order,
  DashboardStats,
  ApiResponse,
  LoginCredentials,
} from "../types";

const BASE_URL = "https://api.santavideowishes.co.uk";

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem("admin_token");
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response;
};

// Types for pricing
export interface PricingPlan {
  id: string;
  price: number; // amount in cents
  videos_included: number;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePricingPlan {
  price: number;
  videos_included: number;
  description: string;
}

export interface UpdatePricingPlan {
  price: number;
  videos_included: number;
  description: string;
}

// API functions
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Store token if provided
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
      }

      // Store user data
      if (data.user || data.data) {
        localStorage.setItem(
          "admin_user",
          JSON.stringify(data.user || data.data)
        );
      }

      return {
        data: data.user || data.data,
        message: data.message || "Login successful",
        success: true,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  },

  logout: async (): Promise<ApiResponse<null>> => {
    try {
      await makeAuthenticatedRequest("/auth/logout", {
        method: "POST",
      });
      console.log("reached");

      // Clear local storage
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");

      return {
        data: null,
        message: "Logout successful",
        success: true,
      };
    } catch (error) {
      // Clear local storage even if API call fails
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");

      return {
        data: null,
        message: "Logout successful",
        success: true,
      };
    }
  },
};

export const dashboardAPI = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    try {
      const response = await makeAuthenticatedRequest(
        "/admin/dashboard/analytics"
      );
      const data = await response.json();

      return {
        data: data.data || data,
        message: data.message || "Stats fetched successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch stats"
      );
    }
  },
};

export const ordersAPI = {
  getOrders: async (): Promise<ApiResponse<Order[]>> => {
    try {
      const response = await makeAuthenticatedRequest("/admin/orders");
      const data = await response.json();

      console.log(data.data.orders);

      return {
        data: data.data.orders || data,
        message: data.message || "Orders fetched successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch orders"
      );
    }
  },

  updateOrderStatus: async (
    orderId: string,
    status: "completed" | "processing"
  ): Promise<ApiResponse<Order>> => {
    try {
      const response = await makeAuthenticatedRequest(
        `/orders/${orderId}/status`,
        {
          method: "PUT",
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      return {
        data: data.data || data,
        message: data.message || "Order status updated successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to update order status"
      );
    }
  },

  deleteOrder: async (orderId: string): Promise<ApiResponse<null>> => {
    try {
      const response = await makeAuthenticatedRequest(`/orders/${orderId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      return {
        data: null,
        message: data.message || "Order deleted successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete order"
      );
    }
  },

  reprocessOrder: async (orderId: string): Promise<ApiResponse<null>> => {
    try {
      const response = await makeAuthenticatedRequest(
        `/admin/orders/${orderId}/reprocess`,
        {
          method: "POST",
          body: JSON.stringify({
            resendEmail: true,
          }),
        }
      );

      const data = await response.json();

      return {
        data: null,
        message: data.message || "Order deleted successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete order"
      );
    }
  },
};

export const usersAPI = {
  getUsers: async ({ page }) => {
    try {
      const response = await makeAuthenticatedRequest(`/admin/users?page=${page}&limit=50`);
      const data = await response.json();
      console.log(data.data);

      return {
        data: data.data,
        message: "Users fetched successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch users"
      );
    }
  },

  createUser: async (userData: { name: string; email: string }) => {
    try {
      const response = await makeAuthenticatedRequest("/users", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      return {
        data: data.data || data,
        message: data.message || "User created successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to create user"
      );
    }
  },

  updateUser: async (
    userId: string,
    userData: { name: string; email: string }
  ) => {
    try {
      const response = await makeAuthenticatedRequest(`/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      return {
        data: data.data || data,
        message: data.message || "User updated successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to update user"
      );
    }
  },

  deleteUser: async (userId: string) => {
    try {
      const response = await makeAuthenticatedRequest(`/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      return {
        data: null,
        message: data.message || "User deleted successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete user"
      );
    }
  },
};

// New Pricing API
export const pricingAPI = {
  // Get all pricing plans
  getAllPlans: async (): Promise<ApiResponse<PricingPlan[]>> => {
    try {
      const response = await makeAuthenticatedRequest("/admin/pricing");
      const data = await response.json();

      return {
        data: data.data || data,
        message: data.message || "Pricing plans fetched successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch pricing plans"
      );
    }
  },

  // Create new pricing plan
  createPlan: async (
    planData: CreatePricingPlan
  ): Promise<ApiResponse<PricingPlan>> => {
    try {
      const response = await makeAuthenticatedRequest("/admin/pricing/add", {
        method: "POST",
        body: JSON.stringify(planData),
      });

      const data = await response.json();

      return {
        data: data.data || data,
        message: data.message || "Pricing plan created successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to create pricing plan"
      );
    }
  },

  // Update existing pricing plan
  updatePlan: async (
    planId: string,
    planData: UpdatePricingPlan
  ): Promise<ApiResponse<PricingPlan>> => {
    try {
      const response = await makeAuthenticatedRequest(
        `/admin/pricing/${planId}`,
        {
          method: "PUT",
          body: JSON.stringify(planData),
        }
      );

      const data = await response.json();

      return {
        data: data.data || data,
        message: data.message || "Pricing plan updated successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to update pricing plan"
      );
    }
  },

  // Delete pricing plan
  deletePlan: async (planId: string): Promise<ApiResponse<null>> => {
    try {
      const response = await makeAuthenticatedRequest(
        `/admin/pricing/${planId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      return {
        data: null,
        message: data.message || "Pricing plan deleted successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete pricing plan"
      );
    }
  },
};
