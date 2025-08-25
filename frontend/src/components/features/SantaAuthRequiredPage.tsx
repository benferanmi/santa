import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

export default function SantaAuthPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center p-4">
        {/* Snowflake decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-blue-200 text-2xl animate-pulse">
            ❄
          </div>
          <div className="absolute top-20 right-20 text-blue-200 text-3xl animate-bounce">
            ❄
          </div>
          <div className="absolute top-32 left-1/3 text-blue-200 text-xl animate-pulse">
            ❄
          </div>
          <div className="absolute bottom-20 right-10 text-blue-200 text-2xl animate-bounce">
            ❄
          </div>
          <div className="absolute bottom-32 left-20 text-blue-200 text-xl animate-pulse">
            ❄
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center relative border-4 border-red-100">
          {/* Santa hat decoration on the card */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="text-4xl">🎅</div>
          </div>

          {/* Main icon */}
          <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <div className="text-3xl">🎄</div>
          </div>

          {/* Magical heading */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-4">
            Create Your Magic Video! ✨
          </h1>

          {/* Friendly description */}
          <p className="text-gray-600 mb-2 leading-relaxed">
            Please login or register to start your
          </p>
          <p className="text-red-600 font-semibold text-lg mb-4">
            personalised Santa video! 🎬
          </p>

          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            An account lets you track your order and receive your video securely
            🔐
          </p>

          {/* Action buttons */}
          <div className="space-y-4 flex flex-col gap-4">
            <Link
              to="/login"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-red-300 focus:ring-offset-2 outline-none"
            >
              🎅 Login to Continue
            </Link>

            <Link
              to={"/register"}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-green-300 focus:ring-offset-2 outline-none"
            >
              🎁 Create New Account
            </Link>
          </div>

          {/* Additional Christmas elements */}
          <div className="mt-8 flex justify-center space-x-4 text-2xl">
            <span className="animate-bounce">🎄</span>
            <span className="animate-pulse">⭐</span>
            <span className="animate-bounce">🎁</span>
          </div>

          {/* Footer text */}
          <p className="text-xs text-gray-400 mt-6">
            Ho ho ho! Let's make some Christmas magic together! 🎉
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
