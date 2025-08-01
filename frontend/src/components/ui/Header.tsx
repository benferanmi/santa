import React, { useEffect, useState } from "react";
import { Menu, X, User, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Logo } from "@/assets";
import { useThemes } from "@/context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const { theme, changeTheme } = useThemes();
  const [mode, setMode] = useState(theme);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Personalise", href: "/personalise" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    changeTheme(mode);
  }, [mode]);

  console.log(isAuthenticated);

  return (
    <header className="bg-gradient shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-2xl">
                <img alt="" src={Logo} />
              </span>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">International Elf HQ</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-amber-300 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white hover:bg-opacity-10"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Create Video Button and Profile */}
          <div className="flex items-center space-x-4">
            {}
            {mode === "christmas" ? (
              <Sun
                className="text-white stroke-white cursor-pointer"
                onClick={() => setMode("dark")}
              />
            ) : (
              <Moon
                className="cursor-pointer"
                onClick={() => setMode("christmas")}
              />
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/personalise"
                  className="bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 hidden sm:block"
                >
                  Create Your Video
                </Link>
                <div className="flex items-center space-x-3">
                  <Link to="/account" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img alt="" src={user?.avatar} />
                      ) : (
                        <User className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <span className="text-white font-medium hidden sm:block">
                      {user?.firstName || "User"}
                    </span>
                  </Link>
                  <div className=" border-l-2 pl-4">
                    <button
                      onClick={handleSignOut}
                      className="text-white hover:text-yellow-200 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to={"/register"}
                  className="text-white hover:text-yellow-200 font-medium"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-200 p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-red-800 bg-opacity-50 rounded-lg mt-2">
            {navigationItems?.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                to="/register"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold py-2 px-4 rounded-full shadow-lg mt-3 block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
