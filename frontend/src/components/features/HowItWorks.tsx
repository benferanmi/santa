import React, { useEffect, useState } from "react";
import { Edit3, CreditCard, Video, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      icon: Edit3,
      title: "Enter Details",
      description:
        "Provide your child's name, age, and upload a photo of your front door.",
      accent: "emerald",
    },
    {
      number: "2",
      icon: CreditCard,
      title: "Process Payment",
      description: "Quick and secure checkout process to complete your order.",
      accent: "blue",
    },
    {
      number: "3",
      icon: Video,
      title: "Receive Your Video",
      description:
        "Get your personalised Santa video ready to share with your child.",
      accent: "purple",
    },
  ];

  // Animation variants (inline implementation)
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Custom animated component
  const AnimatedDiv = ({ children, variant, className = "", delay = 0 }) => {
    const [ref, setRef] = useState(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => setInView(entry.isIntersecting),
          { threshold: 0.1 }
        );
        observer.observe(ref);
        return () => observer.disconnect();
      }
    }, [ref]);

    const style = {
      ...variant.initial,
      ...(inView ? variant.animate : {}),
      transition: `all ${variant.transition?.duration || 0.6}s ${
        variant.transition?.ease || "ease-out"
      } ${delay}s`,
    };

    return (
      <div ref={setRef} className={className} style={style}>
        {children}
      </div>
    );
  };

  const getAccentClasses = (accent) => {
    const classes = {
      emerald: {
        bg: "bg-error",
        iconBg: "bg-emerald-100",
        iconText: "text-emerald-600",
        number: "bg-emerald-600",
        hover: "hover:bg-emerald-500",
      },
      blue: {
        bg: "bg-secondary",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        number: "bg-blue-600",
        hover: "hover:bg-blue-500",
      },
      purple: {
        bg: "bg-info",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        number: "bg-purple-600",
        hover: "hover:bg-purple-500",
      },
    };
    return classes[accent];
  };

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedDiv variant={titleVariants} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
            How It Works
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Creating your personalized Santa video is simple and takes just a
            few minutes
          </p>
        </AnimatedDiv>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Row Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => {
              const accentClasses = getAccentClasses(step.accent);

              return (
                <AnimatedDiv
                  key={step.number}
                  variant={itemVariants}
                  delay={index * 0.2}
                  className="relative group"
                >
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 -right-6 w-12 h-0.5 bg-base-200 z-0 hidden xl:block">
                      <ArrowRight className="absolute -right-2 -top-2 w-5 h-5 text-base-content/40" />
                    </div>
                  )}

                  {/* Step Card */}
                  <div
                    className={`relative ${accentClasses.bg} ${accentClasses.hover} rounded-2xl p-8 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-base-200`}
                  >
                    {/* Step Number */}
                    <div
                      className={`absolute -top-4 left-8 w-10 h-10 ${accentClasses.number} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-lg">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${accentClasses.iconBg} ${accentClasses.iconText} rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-primary mb-4">
                        {step.title}
                      </h3>
                      <p className="text-primary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedDiv>
              );
            })}
          </div>

          {/* Mobile Column Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => {
              const accentClasses = getAccentClasses(step.accent);

              return (
                <AnimatedDiv
                  key={step.number}
                  variant={itemVariants}
                  delay={index * 0.15}
                  className="relative"
                >
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-20 w-0.5 h-12 bg-base-200 z-0"></div>
                  )}

                  <div className="flex items-start space-x-6">
                    {/* Step Number */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 ${accentClasses.number} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-xl">
                        {step.number}
                      </span>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`flex-1 ${accentClasses.bg} p-6 rounded-xl border border-base-200`}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div
                          className={`w-12 h-12 ${accentClasses.iconBg} ${accentClasses.iconText} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <step.icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>

                        {/* Text Content */}
                        <div>
                          <h3 className="text-xl font-semibold text-base-content mb-2">
                            {step.title}
                          </h3>
                          <p className="text-base-content/70 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedDiv>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <AnimatedDiv
          variant={itemVariants}
          delay={0.8}
          className="text-center mt-20"
        >
          <button className="group bg-base-content hover:bg-base-content/90 text-base-100 font-semibold text-lg px-10 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <Link to="/personalise" className="flex items-center space-x-2">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </button>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mt-8 text-sm text-base-content/50">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>100% Satisfaction</span>
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default HowItWorksSection;
