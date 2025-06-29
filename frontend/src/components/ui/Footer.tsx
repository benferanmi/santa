import { Facebook, Youtube, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/assets";
import { useThemes } from "@/context/ThemeContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useThemes();

  return (
    <footer
      className={`${
        theme === "christmas" ? "text-base-100" : "text-foreground"
      } bg-gthree `}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">
                  <img alt="" src={Logo} />{" "}
                </span>
              </div>
              <div>
                <h3
                  className={`text-2xl font-bold ${
                    theme === "christmas" ? "text-base-100" : "text-foreground"
                  }`}
                >
                  International Elf HQ
                </h3>
              </div>
            </div>
            <p className="text-primary-content/70 leading-relaxed max-w-sm">
              Creating magical Christmas memories with personalised videos from
              Santa Claus.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com/santa"
                target="_blank"
                className="bg-foreground bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 fill-background" />
              </a>
              <a
                href="https://youtube.com/santa"
                target="_blank"
                className="bg-foreground bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6 fill-background" />
              </a>
              <a
                href="https://x.com/santa"
                target="_blank"
                className="bg-foreground bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 fill-background" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-accent">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-primary-content/70 hover:text-accent transition-colors duration-200 flex items-center"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="text-primary-content/70 hover:text-accent transition-colors duration-200 flex items-center"
                >
                  User Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/#faq-section"
                  className="text-primary-content/70 hover:text-accent transition-colors duration-200 flex items-center"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-accent">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact-us"
                  className="text-primary-content/70 hover:text-accent transition-colors duration-200 flex items-center"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-primary-content/70 hover:text-accent transition-colors duration-200 flex items-center"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="mailto:santa@santavideowishes.com"
                  className="text-primary-content/70 hover:text-accent transition-colors duration-200 flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>santa@santavideowishes.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary bg-primary/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-primary-content/70 text-sm">
              © {currentYear} Santa Video Wishes. All rights reserved.
            </p>
            <Link
              to="/terms-of-service"
              className="text-primary-content/70 hover:text-accent text-sm transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Christmas Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <div className="flex justify-center space-x-8 opacity-10">
          <span className="text-6xl">❄️</span>
          <span className="text-4xl">🎅</span>
          <span className="text-5xl">⭐</span>
          <span className="text-4xl">🦌</span>
          <span className="text-6xl">❄️</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
