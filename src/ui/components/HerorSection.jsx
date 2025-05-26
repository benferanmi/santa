import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const HeroSection = () => {
  // Simple animation variants (inline implementation)
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.2 }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.4 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const bounceIn = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.1
    }
  };

  // eslint-disable-next-line no-unused-vars
  const float = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Custom hook for scroll-based animations
  // eslint-disable-next-line no-unused-vars
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const AnimatedDiv = ({ children, variant, className = "" }) => {
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
      transition: `all ${variant.transition?.duration || 0.8}s ease-out ${variant.transition?.delay || 0}s`
    };

    return (
      <div ref={setRef} className={className} style={style}>
        {children}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url(https://res.cloudinary.com/dtcbirvxc/image/upload/v1748293580/bwd7sdonldvmvevatpgq.svg)]"

      />

      {/* Animated Snowflakes Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${12 + Math.random() * 8}px`
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Animated Santa */}
        <AnimatedDiv variant={bounceIn} className="mb-8">
          <div
            className="text-8xl md:text-9xl filter drop-shadow-2xl inline-block"
            style={{
              animation: 'float 4s ease-in-out infinite'
            }}
          >
            🎅
          </div>
        </AnimatedDiv>

        {/* Main Heading */}
        <AnimatedDiv variant={fadeInUp}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
              Personalised Video Messages
            </span>
            <br />
            <span className="text-red-100 drop-shadow-lg">
              from Santa
            </span>
          </h1>
        </AnimatedDiv>

        {/* Subtitle */}
        <AnimatedDiv variant={fadeInUp}>
          <p className="text-xl md:text-2xl text-red-100 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            Create magical Christmas memories with a personalised video from Santa Claus that includes your child's name, age, and even their front door!
          </p>
        </AnimatedDiv>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Primary CTA Button */}
          <AnimatedDiv variant={fadeInLeft}>
            <button className="group bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 hover:from-yellow-300 hover:via-yellow-400 hover:to-orange-300 text-red-900 font-bold text-xl px-8 py-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-yellow-400/50 border-4 border-yellow-300">
              <span className="flex items-center space-x-2">
                <span>Create Your Video</span>
                <span className="text-2xl group-hover:animate-spin transition-transform duration-500">🎄</span>
              </span>
            </button>
          </AnimatedDiv>

          {/* Secondary Button */}
          <AnimatedDiv variant={fadeInRight}>
            <button className="group flex items-center space-x-3 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white font-semibold text-lg px-6 py-4 rounded-full border-2 border-white border-opacity-50 hover:border-opacity-80 transition-all duration-300 hover:scale-1.1 text-black">
              <div className="bg-white bg-opacity-30 rounded-full p-2 group-hover:bg-opacity-50 transition-all duration-300 group-hover:animate-pulse">
                <Play className="w-6 h-6 fill-black" />
              </div>
              <span className='text-amber-600'>Watch the Video</span>
            </button>
          </AnimatedDiv>
        </div>

        {/* Decorative Elements */}
        <AnimatedDiv variant={staggerChildren} className="mt-12 flex justify-center space-x-8 opacity-60">
          {['⭐', '🎁', '✨', '🔔', '⭐'].map((emoji, index) => (
            <div
              key={index}
              className="text-3xl md:text-4xl animate-pulse"
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: '2s'
              }}
            >
              {emoji}
            </div>
          ))}
        </AnimatedDiv>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;