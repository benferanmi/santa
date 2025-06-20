import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ChevronRight,
  ChevronDown,
  Shield,
  Users,
  CreditCard,
  AlertTriangle,
  Scale,
  Eye,
  Clock,
  CheckCircle,
  ArrowUp,
  Search,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const TermsOfServicePage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const termsData = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement.",
        "These Terms of Service constitute a legally binding agreement between you and our company.",
        "If you do not agree to abide by the above, please do not use this service.",
        "We reserve the right to change these terms at any time by posting the changes online.",
      ],
    },
    {
      id: "services",
      title: "Description of Services",
      icon: FileText,
      content: [
        "Our platform provides cloud-based software solutions for businesses and individuals.",
        "Services include but are not limited to: data management, analytics, collaboration tools, and API access.",
        "We strive to maintain the service, but we cannot guarantee uninterrupted or error-free operation.",
        "Features and functionality may be updated, modified, or discontinued at our discretion.",
      ],
    },
    {
      id: "accounts",
      title: "User Accounts and Registration",
      icon: Users,
      content: [
        "You must register for an account to access certain features of our service.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are responsible for all activities that occur under your account.",
        "We reserve the right to suspend or terminate accounts that violate these terms.",
      ],
    },
    {
      id: "conduct",
      title: "Acceptable Use Policy",
      icon: Shield,
      content: [
        "You agree not to use the service for any unlawful or prohibited activities.",
        "Prohibited activities include: harassment, spam, malware distribution, or unauthorized access attempts.",
        "You may not interfere with or disrupt the service or servers connected to the service.",
        "Commercial use of the service requires explicit written permission.",
        "We reserve the right to investigate and take appropriate legal action against violators.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      icon: Eye,
      content: [
        "Your privacy is important to us. Please review our Privacy Policy for detailed information.",
        "We collect and process personal data in accordance with applicable privacy laws.",
        "We implement appropriate security measures to protect your personal information.",
        "You have rights regarding your personal data, including access, correction, and deletion.",
        "We do not sell or rent your personal information to third parties.",
      ],
    },
    {
      id: "payment",
      title: "Payment Terms and Billing",
      icon: CreditCard,
      content: [
        "Paid services are billed in advance on a monthly or annual basis.",
        "All fees are non-refundable unless otherwise stated or required by law.",
        "You authorize us to charge your payment method for applicable fees.",
        "Price changes will be communicated with at least 30 days advance notice.",
        "Failure to pay may result in service suspension or account termination.",
      ],
    },
    {
      id: "intellectual",
      title: "Intellectual Property Rights",
      icon: Scale,
      content: [
        "All content, features, and functionality are owned by us and protected by copyright and trademark laws.",
        "You retain ownership of content you create using our service.",
        "You grant us a license to use your content for service operation and improvement.",
        "You may not copy, modify, or distribute our proprietary content without permission.",
        "We respect intellectual property rights and expect users to do the same.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: [
        'Our service is provided "as is" without warranties of any kind.',
        "We are not liable for any indirect, incidental, or consequential damages.",
        "Our total liability shall not exceed the amount paid by you in the past 12 months.",
        "Some jurisdictions do not allow limitation of liability, so these limits may not apply to you.",
        "You agree to indemnify us against claims arising from your use of the service.",
      ],
    },
    {
      id: "termination",
      title: "Termination and Suspension",
      icon: Clock,
      content: [
        "Either party may terminate this agreement at any time with or without cause.",
        "We may suspend or terminate your access immediately for violations of these terms.",
        "Upon termination, your right to use the service ceases immediately.",
        "We will provide reasonable notice before termination unless prohibited by law.",
        "Certain provisions of these terms will survive termination.",
      ],
    },
  ];

  const filteredTerms = termsData.filter(
    (term) =>
      term.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.content.some((content) =>
        content.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6"
              >
                <Scale className="w-10 h-10" />
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Terms of Service
              </motion.h1>
              <motion.p
                className="text-xl text-blue-100 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Please read these terms carefully before using our service
              </motion.p>
              <motion.div
                className="text-sm text-blue-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.div
              className="lg:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="sticky top-8">
                {/* Search */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search terms..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {termsData.map((section, index) => {
                      const Icon = section.icon;
                      return (
                        <motion.a
                          key={section.id}
                          href={`#${section.id}`}
                          className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.6 + index * 0.1,
                            duration: 0.5,
                          }}
                        >
                          <Icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-600" />
                          <span className="font-medium text-sm">
                            {section.title}
                          </span>
                        </motion.a>
                      );
                    })}
                  </nav>
                </div>

                {/* Contact Info */}
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <h3 className="font-semibold mb-2">
                    Questions about our terms?
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Contact our legal team for clarification or concerns.
                  </p>
                  <motion.button
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Legal Team
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:w-2/3">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Introduction */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Introduction
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Welcome to our platform. These Terms of Service ("Terms")
                    govern your use of our website, products, and services. By
                    using our service, you agree to these terms in full.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    These terms apply to all visitors, users, and others who
                    access or use our service. Please read them carefully and
                    contact us if you have any questions.
                  </p>
                </motion.div>

                {/* Terms Sections */}
                <AnimatePresence>
                  {filteredTerms.map((section, index) => {
                    const Icon = section.icon;
                    const isExpanded = activeSection === section.id;

                    return (
                      <motion.div
                        key={section.id}
                        id={section.id}
                        variants={itemVariants}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                        layout
                      >
                        <motion.div
                          className="p-6 cursor-pointer border-b border-gray-100"
                          onClick={() =>
                            setActiveSection(isExpanded ? null : section.id)
                          }
                          whileHover={{ backgroundColor: "#f8fafc" }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Icon className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {section.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  Click to {isExpanded ? "collapse" : "expand"}{" "}
                                  section
                                </p>
                              </div>
                            </div>
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="w-6 h-6 text-gray-400" />
                            </motion.div>
                          </div>
                        </motion.div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-6"
                            >
                              <div className="space-y-4 pt-4">
                                {section.content.map((paragraph, idx) => (
                                  <motion.p
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: idx * 0.1,
                                      duration: 0.3,
                                    }}
                                    className="text-gray-700 leading-relaxed flex items-start"
                                  >
                                    <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    {paragraph}
                                  </motion.p>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Footer Note */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl p-6"
                >
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">
                        Important Notice
                      </h3>
                      <p className="text-yellow-700 text-sm leading-relaxed">
                        These terms may be updated from time to time. We will
                        notify you of any material changes by posting the new
                        Terms of Service on this page. Your continued use of the
                        service after such modifications constitutes acceptance
                        of the updated terms.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 z-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default TermsOfServicePage;
