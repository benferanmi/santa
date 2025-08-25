import React from "react";
import { useAuth } from "../context/AuthContext";
import SantaAuthPage from "@/components/features/SantaAuthRequiredPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">🎄</div>
          <p className="text-red-600 font-semibold text-lg">
            Ho ho ho! Loading your Christmas magic... ✨
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated, show the auth page
  if (!isAuthenticated) {
    return <SantaAuthPage />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
