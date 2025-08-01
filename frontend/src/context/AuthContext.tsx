import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone: string;
  dateOfBirth: string;
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

const BASE_API = "http://api.santavideowishes.co.uk";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (authToken) {
        try {
          const response = await fetch(`${BASE_API}/user/me`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setUser(result.data);
            }
          } else {
            // Token is invalid, clear it
            authToken = null;
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          authToken = null;
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
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
        localStorage.setItem("authToken", result.token);
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
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await fetch(`${BASE_API}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        authToken = result.token;
        localStorage.setItem("authToken", result.token);
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
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user || !authToken) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await fetch(`${BASE_API}/user/me`, {
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
