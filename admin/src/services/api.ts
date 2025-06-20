
import { User, Order, DashboardStats, ApiResponse, LoginCredentials } from '../types';

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2025-05-28',
    name: 'John Smith',
    age: 28,
    status: 'delivered',
    amount: 1250,
    customerEmail: 'john.smith@email.com'
  },
  {
    id: 'ORD-002',
    date: '2025-05-27',
    name: 'Sarah Johnson',
    age: 34,
    status: 'pending',
    amount: 890,
    customerEmail: 'sarah.johnson@email.com'
  },
  {
    id: 'ORD-003',
    date: '2025-05-26',
    name: 'Michael Brown',
    age: 42,
    status: 'delivered',
    amount: 2100,
    customerEmail: 'michael.brown@email.com'
  },
  {
    id: 'ORD-004',
    date: '2025-05-25',
    name: 'Emily Davis',
    age: 29,
    status: 'pending',
    amount: 750,
    customerEmail: 'emily.davis@email.com'
  },
  {
    id: 'ORD-005',
    date: '2025-05-24',
    name: 'David Wilson',
    age: 37,
    status: 'delivered',
    amount: 1680,
    customerEmail: 'david.wilson@email.com'
  },
  {
    id: 'ORD-006',
    date: '2025-05-23',
    name: 'Lisa Anderson',
    age: 31,
    status: 'pending',
    amount: 945,
    customerEmail: 'lisa.anderson@email.com'
  },
  {
    id: 'ORD-007',
    date: '2025-05-22',
    name: 'Robert Martinez',
    age: 45,
    status: 'delivered',
    amount: 1320,
    customerEmail: 'robert.martinez@email.com'
  },
  {
    id: 'ORD-008',
    date: '2025-05-21',
    name: 'Jennifer Taylor',
    age: 26,
    status: 'pending',
    amount: 560,
    customerEmail: 'jennifer.taylor@email.com'
  }
];

const mockUsers = [
  {
    id: 'USR-001',
    name: 'John Smith',
    email: 'john.smith@email.com'
  },
  {
    id: 'USR-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com'
  },
  {
    id: 'USR-003',
    name: 'Michael Brown',
    email: 'michael.brown@email.com'
  },
  {
    id: 'USR-004',
    name: 'Emily Davis',
    email: 'emily.davis@email.com'
  },
  {
    id: 'USR-005',
    name: 'David Wilson',
    email: 'david.wilson@email.com'
  },
  {
    id: 'USR-006',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com'
  },
  {
    id: 'USR-007',
    name: 'Robert Martinez',
    email: 'robert.martinez@email.com'
  },
  {
    id: 'USR-008',
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@email.com'
  }
];

// API functions
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    await delay(1000);
    
    if (credentials.email === 'admin@admin.com' && credentials.password === 'admin123') {
      const user: User = {
        id: '1',
        email: 'admin@admin.com',
        name: 'Admin User',
        role: 'admin',
      };
      
      return {
        data: user,
        message: 'Login successful',
        success: true,
      };
    }
    
    throw new Error('Invalid credentials');
  },

  logout: async (): Promise<ApiResponse<null>> => {
    await delay(500);
    return {
      data: null,
      message: 'Logout successful',
      success: true,
    };
  },
};

export const dashboardAPI = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay(800);
    
    const stats: DashboardStats = {
      revenue: 48352,
      totalOrders: mockOrders.length,
      videosCompleted: 856,
      revenueChange: 12.5,
      ordersChange: 8.2,
      videosChange: -2.4,
    };
    
    return {
      data: stats,
      message: 'Stats fetched successfully',
      success: true,
    };
  },
};

export const ordersAPI = {
  getOrders: async (): Promise<ApiResponse<Order[]>> => {
    await delay(600);
    return {
      data: mockOrders,
      message: 'Orders fetched successfully',
      success: true,
    };
  },

  updateOrderStatus: async (orderId: string, status: 'delivered' | 'pending'): Promise<ApiResponse<Order>> => {
    await delay(500);
    
    const orderIndex = mockOrders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    mockOrders[orderIndex].status = status;
    
    return {
      data: mockOrders[orderIndex],
      message: 'Order status updated successfully',
      success: true,
    };
  },

  deleteOrder: async (orderId: string): Promise<ApiResponse<null>> => {
    await delay(500);
    
    const orderIndex = mockOrders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    mockOrders.splice(orderIndex, 1);
    
    return {
      data: null,
      message: 'Order deleted successfully',
      success: true,
    };
  },
};

export const usersAPI = {
  getUsers: async () => {
    await delay(600);
    return {
      data: mockUsers,
      message: 'Users fetched successfully',
      success: true,
    };
  },

  createUser: async (userData: { name: string; email: string }) => {
    await delay(500);
    
    const newUser = {
      id: `USR-${String(mockUsers.length + 1).padStart(3, '0')}`,
      name: userData.name,
      email: userData.email,
    };
    
    mockUsers.push(newUser);
    
    return {
      data: newUser,
      message: 'User created successfully',
      success: true,
    };
  },

  updateUser: async (userId: string, userData: { name: string; email: string }) => {
    await delay(500);
    
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    
    return {
      data: mockUsers[userIndex],
      message: 'User updated successfully',
      success: true,
    };
  },

  deleteUser: async (userId: string) => {
    await delay(500);
    
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(userIndex, 1);
    
    return {
      data: null,
      message: 'User deleted successfully',
      success: true,
    };
  },
};
