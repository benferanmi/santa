import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone: string;
  dateOfBirth: string;
  totalOrders:number;
  address: string;
  city: string;
  zipcode: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In-memory token storage (replace with localStorage in your actual environment)
let authToken: string | null = null;

const BASE_API = "https://api.santavideowishes.co.uk";

// Helper function to safely access localStorage
const getStoredToken = (): string | null => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("authToken");
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
  return null;
};

const setStoredToken = (token: string): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("authToken", token);
    }
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

const removeStoredToken = (): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("authToken");
    }
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Initializing auth...");

      // Get token from localStorage
      const storedToken = getStoredToken();
      console.log("Stored token found:", !!storedToken);

      if (storedToken) {
        authToken = storedToken;
        console.log("Token set, fetching user profile...");

        try {
          const response = await fetch(`${BASE_API}/user/profile`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });

          console.log("Profile fetch response status:", response.status);

          if (response.ok) {
            const result = await response.json();
            console.log("Profile fetch result:", result);

            if (result.success && result.data) {
              setUser(result.data);
              console.log("User profile set successfully");
            } else {
              console.log("Profile fetch unsuccessful:", result);
            }
          } else if (response.status === 401 || response.status === 403) {
            // Only clear token for authentication errors
            authToken = null;
            removeStoredToken();
            console.log("Token expired or invalid, cleared from storage");
          } else {
            console.log("API error, but keeping token:", response.status);
            // Log the error response for debugging
            try {
              const errorResult = await response.json();
              console.log("Error response:", errorResult);
            } catch (e) {
              console.log("Could not parse error response");
            }
          }
        } catch (error) {
          console.error("Network error fetching user profile:", error);
          // Don't clear token for network errors
          // User might be offline or server temporarily down
        }
      } else {
        console.log("No stored token found");
      }

      setLoading(false);
      console.log("Auth initialization complete");
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_API}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        authToken = result.token;
        setStoredToken(result.token);
        setUser(result.data);
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await fetch(`${BASE_API}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword: password,
          firstName,
          lastName,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        authToken = result.token;
        setStoredToken(result.token);
        setUser(result.data);
      } else {
        throw new Error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signOut = () => {
    authToken = null;
    removeStoredToken();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user || !authToken) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await fetch(`${BASE_API}/user/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setUser(result.data);
      } else {
        throw new Error(result.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        updateProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
