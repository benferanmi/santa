import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { useThemes } from "@/context/ThemeContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { theme } = useThemes();
  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-gradient-to-br from-red-50 to-green-50"
    >
      <Header />
      <main className="constainer px-0 mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
