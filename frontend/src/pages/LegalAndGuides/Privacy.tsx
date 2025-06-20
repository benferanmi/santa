import { useState, useEffect } from "react";
import {
  Shield,
  Eye,
  Lock,
  Users,
  FileText,
  Clock,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.getAttribute("data-section"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tableOfContents = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <Lock className="w-4 h-4" />,
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: "updates",
      title: "Policy Updates",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <AppLayout>
      <main className=" bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                <span>Privacy & Security</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We respect your privacy and are committed to protecting your
                personal information. This policy explains how we collect, use,
                and safeguard your data.
              </p>
              <div className="mt-6 text-sm text-gray-500">
                <span className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Last Updated: December 15, 2024</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Contents
                  </h3>
                  <nav className="space-y-1">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                          activeSection === item.id
                            ? "bg-red-50 text-red-700 border-l-4 border-red-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                        }`}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                        <ChevronRight className="w-3 h-3 ml-auto" />
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100">
                {/* Introduction */}
                <section
                  id="introduction"
                  data-section="introduction"
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="w-8 h-8 text-red-600 mr-3" />
                    Introduction
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Welcome to Wishes! We are committed to protecting your
                      privacy and ensuring the security of your personal
                      information. This Privacy Policy explains how we collect,
                      use, disclose, and safeguard your information when you use
                      our personalized Santa video service.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      By using our service, you agree to the collection and use
                      of information in accordance with this policy. We will not
                      use or share your information with anyone except as
                      described in this Privacy Policy.
                    </p>
                  </div>
                </section>

                {/* Information We Collect */}
                <section
                  id="information-we-collect"
                  data-section="information-we-collect"
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Eye className="w-8 h-8 text-red-600 mr-3" />
                    Information We Collect
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Personal Information
                      </h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>
                          • Child's name and age for video personalization
                        </li>
                        <li>• Your email address for video delivery</li>
                        <li>• Payment information for order processing</li>
                        <li>• Optional: Special requests or messages</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Automatically Collected Information
                      </h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Device information and browser type</li>
                        <li>• IP address and location data</li>
                        <li>• Usage patterns and service interactions</li>
                        <li>• Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section
                  id="how-we-use"
                  data-section="how-we-use"
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Users className="w-8 h-8 text-red-600 mr-3" />
                    How We Use Your Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Service Delivery
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Create and deliver personalized Santa videos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Communication
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Send order confirmations and updates
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Customer Support
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Provide assistance and resolve issues
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Service Improvement
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Analyze usage to enhance our platform
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Legal Compliance
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Meet regulatory and legal requirements
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Marketing
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Send promotional content (with consent)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Sharing */}
                <section
                  id="information-sharing"
                  data-section="information-sharing"
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Shield className="w-8 h-8 text-red-600 mr-3" />
                    Information Sharing
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      We Do Not Sell Your Data
                    </h3>
                    <p className="text-red-700">
                      We never sell, rent, or trade your personal information to
                      third parties for their marketing purposes.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We may share your information only in the following
                      limited circumstances:
                    </p>
                    <ul className="text-gray-700 space-y-3 pl-4">
                      <li>
                        • <strong>Service Providers:</strong> Trusted partners
                        who help deliver our services (payment processors, email
                        services)
                      </li>
                      <li>
                        • <strong>Legal Requirements:</strong> When required by
                        law or to protect our rights and safety
                      </li>
                      <li>
                        • <strong>Business Transfers:</strong> In the event of a
                        merger, acquisition, or sale of assets
                      </li>
                      <li>
                        • <strong>With Your Consent:</strong> Any other sharing
                        will require your explicit permission
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Data Security */}
                <section
                  id="data-security"
                  data-section="data-security"
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Lock className="w-8 h-8 text-red-600 mr-3" />
                    Data Security
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-green-50 rounded-xl p-6 text-center">
                      <Lock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Encryption
                      </h4>
                      <p className="text-sm text-gray-600">
                        All data is encrypted in transit and at rest
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6 text-center">
                      <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Secure Storage
                      </h4>
                      <p className="text-sm text-gray-600">
                        Industry-standard security measures
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 text-center">
                      <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Access Control
                      </h4>
                      <p className="text-sm text-gray-600">
                        Limited access on need-to-know basis
                      </p>
                    </div>
                  </div>
                </section>

                {/* Your Rights */}
                <section
                  id="your-rights"
                  data-section="your-rights"
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Users className="w-8 h-8 text-red-600 mr-3" />
                    Your Rights
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      You have the following rights regarding your personal
                      information:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-gray-700 space-y-2">
                        <li>• Access your personal data</li>
                        <li>• Correct inaccurate information</li>
                        <li>• Delete your personal data</li>
                      </ul>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Restrict data processing</li>
                        <li>• Data portability</li>
                        <li>• Opt-out of marketing communications</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Cookies */}
                <section id="cookies" data-section="cookies" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Eye className="w-8 h-8 text-red-600 mr-3" />
                    Cookies & Tracking
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use cookies and similar technologies to enhance your
                    experience, analyze usage, and provide personalized content.
                    You can control cookie preferences through your browser
                    settings.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Cookie Types
                    </h4>
                    <p className="text-yellow-700 text-sm">
                      Essential cookies (required), Performance cookies
                      (analytics), and Functional cookies (preferences)
                    </p>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section
                  id="children-privacy"
                  data-section="children-privacy"
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Shield className="w-8 h-8 text-red-600 mr-3" />
                    Children's Privacy
                  </h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <p className="text-blue-800 font-semibold mb-2">
                      Special Protection for Children
                    </p>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      We take extra care with children's information. We only
                      collect the minimum necessary data to create personalized
                      videos, and we never use children's information for
                      marketing purposes. Parents have full control over their
                      child's data and can request deletion at any time.
                    </p>
                  </div>
                </section>

                {/* Updates */}
                <section id="updates" data-section="updates" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Clock className="w-8 h-8 text-red-600 mr-3" />
                    Policy Updates
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any significant changes by posting the new
                    policy on this page and updating the "Last Updated" date. We
                    encourage you to review this policy periodically.
                  </p>
                </section>

                {/* Contact */}
                <section id="contact" data-section="contact" className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="w-8 h-8 text-red-600 mr-3" />
                    Contact Us
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about this Privacy Policy or our
                      privacy practices, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-600">
                      <p>📧 Email: privacy@wishes.com</p>
                      <p>📞 Phone: +1 (555) 123-4567</p>
                      <p>
                        📍 Address: 123 Christmas Lane, North Pole, NP 12345
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110 z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </main>
    </AppLayout>
  );
};

export default PrivacyPolicyPage;
