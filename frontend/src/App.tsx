import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentContext";
import { VideoProvider } from "./context/VideoContext";
import { UserProvider } from "./context/UserContext";
import { ThemesProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import UserAccount from "./pages/UserAccount";
// import UserSettings from "./pages/UserSettings";
import Personalise from "./pages/Personalise";
import SantaCheckout from "./pages/SantaCheckout";
import OrderSuccess from "./pages/OrderSuccess";
import Register from "./pages/Register";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import PrivacyPolicyPage from "./pages/LegalAndGuides/Privacy";
import UserGuidesPage from "./pages/LegalAndGuides/UserGuidesPage";
import ContactUsPage from "./pages/public/Contact";
import TermsOfServicePage from "./pages/LegalAndGuides/TermsOfService";
import "./App.css";
import ProtectedRoute from "./pages/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemesProvider>
      <AuthProvider>
        <UserProvider>
          <PaymentProvider>
            <VideoProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Protected Routes - Require Authentication */}
                    <Route
                      path="/personalize"
                      element={
                        <ProtectedRoute>
                          <Personalise />
                        </ProtectedRoute>
                      }
                    />
                    {/* <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <SantaCheckout cl/>
                        </ProtectedRoute>
                      }
                    /> */}
                    <Route
                      path="/order-success"
                      element={
                        <ProtectedRoute>
                          <OrderSuccess />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/account"
                      element={
                        <ProtectedRoute>
                          <UserAccount />
                        </ProtectedRoute>
                      }
                    />
                    {/* Uncomment when UserSettings is ready */}
                    {/* 
                    <Route
                      path="/settings"
                      element={
                        <ProtectedRoute>
                          <UserSettings />
                        </ProtectedRoute>
                      }
                    />
                    */}

                    {/* Public Routes - No Authentication Required */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Register />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/guides" element={<UserGuidesPage />} />
                    <Route path="/contact-us" element={<ContactUsPage />} />
                    <Route
                      path="/terms-of-service"
                      element={<TermsOfServicePage />}
                    />

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </VideoProvider>
          </PaymentProvider>
        </UserProvider>
      </AuthProvider>
    </ThemesProvider>
  </QueryClientProvider>
);

export default App;
