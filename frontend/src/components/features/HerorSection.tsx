// components/HeroSection.tsx
import React, { memo, useMemo, useRef } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import {
  ANIMATION_VARIANTS,
  type AnimationVariant,
} from "../../utils/animationVariants";

interface AnimatedDivProps {
  children: React.ReactNode;
  variant: AnimationVariant;
  className?: string;
}

// Optimized AnimatedDiv component
const AnimatedDiv: React.FC<AnimatedDivProps> = memo(
  ({ children, variant, className = "" }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const isInView = useIntersectionObserver(elementRef, { threshold: 0.1 });

    const animationStyle = useMemo((): React.CSSProperties => {
      const baseStyle: React.CSSProperties = {
        transition: `all ${variant.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${variant.delay}s`,
      };

      if (isInView) {
        return {
          ...baseStyle,
          opacity: variant.animate.opacity,
          transform: variant.animate.transform,
        };
      }

      return {
        ...baseStyle,
        opacity: variant.initial.opacity,
        transform: variant.initial.transform,
      };
    }, [isInView, variant]);

    return (
      <div ref={elementRef} className={className} style={animationStyle}>
        {children}
      </div>
    );
  }
);

AnimatedDiv.displayName = "AnimatedDiv";

// Memoized emoji row to prevent unnecessary re-renders
const EmojiRow: React.FC = memo(() => {
  const emojis = useMemo(() => ["⭐", "🎁", "🔔", "✨"] as const, []);

  return (
    <AnimatedDiv
      variant={ANIMATION_VARIANTS.fadeInUp}
      className="mt-12 flex justify-center gap-6 text-2xl text-yellow-300"
    >
      {emojis.map((emoji, index) => (
        <div
          key={emoji}
          className="animate-pulse"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {emoji}
        </div>
      ))}
    </AnimatedDiv>
  );
});

EmojiRow.displayName = "EmojiRow";

// Memoized CTA buttons
const CTAButtons: React.FC = memo(() => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
      <AnimatedDiv variant={ANIMATION_VARIANTS.fadeInLeft}>
        <Link
          to="/dashboard"
          className="bg-yellow-400 cursor-pointer hover:bg-yellow-300 text-red-900 font-bold px-6 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
        >
          🎄 Create Your Video
        </Link>
      </AnimatedDiv>

      <AnimatedDiv variant={ANIMATION_VARIANTS.fadeInRight}>
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white cursor-pointer px-5 py-3 rounded-full border border-white transition-all duration-300 hover:scale-105"
        >
          <div className="bg-white/30 p-2 rounded-full">
            <Play className="w-5 h-5 fill-black" />
          </div>
          <span className="text-amber-400 font-medium">Watch the Video</span>
        </Link>
      </AnimatedDiv>
    </div>
  );
});

CTAButtons.displayName = "CTAButtons";

// Main Hero Section Component
const HeroSection: React.FC = memo(() => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-no-repeat hero-section-custom-bg-positioning">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl">
        {/* Santa Emoji */}
        {/* <AnimatedDiv variant={ANIMATION_VARIANTS.bounceIn} className="mb-6">
          <div className="text-8xl md:text-9xl drop-shadow-lg animate-float">
            🎅
          </div>
        </AnimatedDiv> */}

        {/* Title */}
        <AnimatedDiv variant={ANIMATION_VARIANTS.fadeInUp}>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Make This <span className="text-yellow-400">Christmas</span> Magical
          </h1>
        </AnimatedDiv>

        {/* Subtitle */}
        <AnimatedDiv variant={ANIMATION_VARIANTS.fadeInUp}>
          <p className="text-red-100 text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto">
            Get a Personalized video message from Santa with your child's name,
            age, special person and even their home mentioned!
          </p>
        </AnimatedDiv>

        {/* CTA Buttons */}
        <CTAButtons />

        {/* Emojis Row */}
        <EmojiRow />
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
