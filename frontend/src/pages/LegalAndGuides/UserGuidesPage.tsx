import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  BookOpen,
  Users,
  Settings,
  Zap,
  HelpCircle,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const UserGuidesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedGuide, setExpandedGuide] = useState(null);

  const categories = [
    { id: "all", name: "All Guides", icon: BookOpen },
    { id: "getting-started", name: "Getting Started", icon: Zap },
    { id: "account", name: "Account Management", icon: Users },
    { id: "settings", name: "Settings & Configuration", icon: Settings },
    { id: "troubleshooting", name: "Troubleshooting", icon: HelpCircle },
  ];

  const guides = [
    {
      id: 1,
      title: "Getting Started with Your Account",
      description:
        "Learn how to set up your account and get started with our platform in just a few minutes.",
      category: "getting-started",
      readTime: "5 min read",
      difficulty: "Beginner",
      rating: 4.8,
      views: 12450,
      steps: [
        'Create your account by clicking the "Sign Up" button',
        "Verify your email address through the confirmation link",
        "Complete your profile with basic information",
        "Set up your preferences and notification settings",
        "Explore the dashboard and familiarize yourself with the interface",
      ],
    },
    {
      id: 2,
      title: "Managing Your Profile Settings",
      description:
        "Customize your profile, update personal information, and configure privacy settings.",
      category: "account",
      readTime: "8 min read",
      difficulty: "Beginner",
      rating: 4.6,
      views: 8920,
      steps: [
        "Navigate to your profile settings from the main menu",
        "Update your personal information and profile photo",
        "Configure privacy settings and visibility options",
        "Set up two-factor authentication for enhanced security",
        "Manage connected accounts and integrations",
      ],
    },
    {
      id: 3,
      title: "Advanced Configuration Options",
      description:
        "Dive deep into advanced settings to customize your experience and optimize performance.",
      category: "settings",
      readTime: "12 min read",
      difficulty: "Advanced",
      rating: 4.7,
      views: 5630,
      steps: [
        "Access the advanced settings panel",
        "Configure API keys and webhook endpoints",
        "Set up custom workflows and automation rules",
        "Optimize performance settings for your use case",
        "Enable developer mode and debugging options",
      ],
    },
    {
      id: 4,
      title: "Troubleshooting Common Issues",
      description:
        "Solutions to the most frequently encountered problems and how to resolve them quickly.",
      category: "troubleshooting",
      readTime: "10 min read",
      difficulty: "Intermediate",
      rating: 4.5,
      views: 7840,
      steps: [
        "Identify the specific error message or issue",
        "Check your internet connection and browser compatibility",
        "Clear your browser cache and cookies",
        "Disable browser extensions that might interfere",
        "Contact support if the issue persists",
      ],
    },
    {
      id: 5,
      title: "Team Collaboration Features",
      description:
        "Learn how to invite team members, manage permissions, and collaborate effectively.",
      category: "account",
      readTime: "15 min read",
      difficulty: "Intermediate",
      rating: 4.9,
      views: 9210,
      steps: [
        "Set up your team workspace and invite members",
        "Configure roles and permissions for different team members",
        "Use real-time collaboration tools and features",
        "Manage shared resources and project access",
        "Set up team notifications and communication preferences",
      ],
    },
    {
      id: 6,
      title: "Quick Start Tutorial",
      description:
        "A rapid introduction to get you up and running with the essential features immediately.",
      category: "getting-started",
      readTime: "3 min read",
      difficulty: "Beginner",
      rating: 4.7,
      views: 15320,
      steps: [
        "Launch the application and complete the welcome tour",
        "Create your first project or workspace",
        "Explore the main navigation and key features",
        "Complete a simple task to familiarize yourself",
        "Bookmark important resources and help sections",
      ],
    },
  ];

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AppLayout>
      <main className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <motion.div
          className="bg-white shadow-lg border-b border-gray-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <motion.h1
                className="text-4xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                User Guides & Documentation
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Everything you need to know to get the most out of our platform
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.div
              className="lg:w-1/4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Search */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search guides..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          selectedCategory === category.id
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{category.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6"
              >
                <AnimatePresence>
                  {filteredGuides.map((guide) => (
                    <motion.div
                      key={guide.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                      layout
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {guide.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {guide.description}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {guide.readTime}
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                {guide.rating}
                              </div>
                              <div>{guide.views.toLocaleString()} views</div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                                guide.difficulty
                              )}`}
                            >
                              {guide.difficulty}
                            </span>
                            <motion.button
                              onClick={() =>
                                setExpandedGuide(
                                  expandedGuide === guide.id ? null : guide.id
                                )
                              }
                              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {expandedGuide === guide.id
                                ? "Hide Steps"
                                : "View Guide"}
                              <ChevronRight
                                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                                  expandedGuide === guide.id ? "rotate-90" : ""
                                }`}
                              />
                            </motion.button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedGuide === guide.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-200 pt-4 mt-4"
                            >
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Step-by-step instructions:
                              </h4>
                              <div className="space-y-3">
                                {guide.steps.map((step, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: index * 0.1,
                                      duration: 0.3,
                                    }}
                                    className="flex items-start"
                                  >
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                                      {index + 1}
                                    </div>
                                    <p className="text-gray-700">{step}</p>
                                  </motion.div>
                                ))}
                              </div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                                className="flex justify-end mt-6"
                              >
                                <motion.button
                                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center hover:bg-blue-700 transition-colors duration-200"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Start Guide
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </motion.button>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredGuides.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No guides found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or category filter.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still need help?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is here to assist you with any questions
            </p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </main>
    </AppLayout>
  );
};

export default UserGuidesPage;
