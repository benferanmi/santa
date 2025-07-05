import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentContext";
import { VideoProvider } from "./context/VideoContext";
import { UserProvider } from "./context/UserContext";
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
import { ThemesProvider } from "./context/ThemeContext";

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
                    <Route path="/personalise" element={<Personalise />} />
                    <Route path="/checkout" element={<SantaCheckout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/account" element={<UserAccount />} />
                    {/* <Route path="/settings" element={<UserSettings />} /> */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/guides" element={<UserGuidesPage />} />
                    <Route path="/contact-us" element={<ContactUsPage />} />
                    <Route
                      path="terms-of-service"
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
