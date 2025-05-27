import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const HeroSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.4 },
  };

  const bounceIn = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.1,
    },
  };

  // eslint-disable-next-line no-unused-vars
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const AnimatedDiv = ({ children, variant, className = '' }) => {
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
      transition: `all ${variant.transition?.duration || 0.8}s ease-out ${variant.transition?.delay || 0}s`,
    };

    return (
      <div ref={setRef} className={className} style={style}>
        {children}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-no-repeat hero-section-custom-bg-positioning" 
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-80" />

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl">

        {/* Santa Emoji */}
        <AnimatedDiv variant={bounceIn} className="mb-6">
          <div className="text-8xl md:text-9xl drop-shadow-lg animate-float">🎅</div>
        </AnimatedDiv>

        {/* Title */}
        <AnimatedDiv variant={fadeInUp}>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Make This <span className="text-yellow-400">Christmas</span> Magical
          </h1>
        </AnimatedDiv>

        {/* Subtitle */}
        <AnimatedDiv variant={fadeInUp}>
          <p className="text-red-100 text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto">
            Get a personalized video message from Santa with your child's name, age, and even their home mentioned!
          </p>
        </AnimatedDiv>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <AnimatedDiv variant={fadeInLeft}>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold px-6 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
              🎄 Create Your Video
            </button>
          </AnimatedDiv>

          <AnimatedDiv variant={fadeInRight}>
            <button className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-3 rounded-full border border-white transition-all duration-300 hover:scale-105">
              <div className="bg-white/30 p-2 rounded-full">
                <Play className="w-5 h-5 fill-black" />
              </div>
              <span className="text-amber-400 font-medium">Watch the Video</span>
            </button>
          </AnimatedDiv>
        </div>

        {/* Emojis Row */}
        <AnimatedDiv variant={fadeInUp} className="mt-12 flex justify-center gap-6 text-2xl text-yellow-300">
          {['⭐', '🎁', '🔔', '✨'].map((emoji, index) => (
            <div key={index} className="animate-pulse">{emoji}</div>
          ))}
        </AnimatedDiv>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
