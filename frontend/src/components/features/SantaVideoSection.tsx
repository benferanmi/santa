// components/SantaVideoSection.tsx
import React, { useState, memo, useMemo, useRef, useCallback } from "react";
import { Play } from "lucide-react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { ANIMATION_VARIANTS } from "../../utils/animationVariants";

interface SnowflakeProps {
  index: number;
  isVisible: boolean;
}

interface StarProps {
  index: number;
  isVisible: boolean;
}

// Optimized Snowflake component with reduced animations when not visible
const Snowflake: React.FC<SnowflakeProps> = memo(({ index, isVisible }) => {
  const style = useMemo(() => {
    const x = Math.random() * 100;
    const animationDelay = Math.random() * 2;
    const animationDuration = Math.random() * 3 + 2;

    return {
      left: `${x}%`,
      animationDelay: `${animationDelay}s`,
      animationDuration: `${animationDuration}s`,
      animationPlayState: isVisible ? "running" : "paused",
    } as React.CSSProperties;
  }, [index, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-snow-fall"
      style={style}
    />
  );
});

Snowflake.displayName = "Snowflake";

// Optimized Star component
const Star: React.FC<StarProps> = memo(({ index, isVisible }) => {
  const style = useMemo(() => {
    const left = Math.random() * 100;
    const top = Math.random() * 50;
    const animationDelay = Math.random() * 2;

    return {
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${animationDelay}s`,
      animationPlayState: isVisible ? "running" : "paused",
    } as React.CSSProperties;
  }, [index, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-twinkle"
      style={style}
    />
  );
});

Star.displayName = "Star";

// Memoized background animations
const BackgroundAnimations: React.FC<{ isVisible: boolean }> = memo(
  ({ isVisible }) => {
    const snowflakes = useMemo(
      () => Array.from({ length: 30 }, (_, i) => i),
      []
    ); // Reduced from 50
    const stars = useMemo(() => Array.from({ length: 15 }, (_, i) => i), []); // Reduced from 20

    return (
      <div className="absolute inset-0">
        {/* Snowflakes - reduced count and conditional rendering */}
        {snowflakes.map((i) => (
          <Snowflake key={i} index={i} isVisible={isVisible} />
        ))}

        <div className="absolute inset-0 bg-black opacity-20" />

        {/* Stars - reduced count */}
        {stars.map((i) => (
          <Star key={`star-${i}`} index={i} isVisible={isVisible} />
        ))}
      </div>
    );
  }
);

BackgroundAnimations.displayName = "BackgroundAnimations";

// Memoized video preview
const VideoPreview: React.FC<{ onPlay: () => void; isVisible: boolean }> = memo(
  ({ onPlay, isVisible }) => {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-red-600 to-green-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />

        {/* Santa Silhouette - only animate when visible */}
        <div
          className={`absolute right-10 bottom-10 text-6xl opacity-30 ${
            isVisible ? "animate-santa-sway" : ""
          }`}
        >
          🎅
        </div>

        {/* Reindeer - only animate when visible */}
        <div
          className={`absolute top-10 text-4xl opacity-40 ${
            isVisible ? "animate-reindeer-fly" : ""
          }`}
        >
          🦌
        </div>

        {/* Play Button */}
        <button
          onClick={onPlay}
          className="relative z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-6 shadow-2xl transition-all duration-300 group transform hover:scale-105 active:scale-95"
          aria-label="Play Santa video"
        >
          <div className={isVisible ? "animate-pulse-scale" : ""}>
            <Play size={64} className="ml-2" />
          </div>
          <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 group-hover:animate-ping" />
        </button>

        {/* Play Text */}
        <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold drop-shadow-lg">
          Watch Santa's Magic ✨
        </p>
      </div>
    );
  }
);

VideoPreview.displayName = "VideoPreview";

// Memoized video player
const VideoPlayer: React.FC = memo(() => {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        title="Santa in Action"
        className="w-full h-full rounded-2xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

// Memoized animated heading
const AnimatedHeading: React.FC<{ isVisible: boolean }> = memo(
  ({ isVisible }) => {
    const headingStyle = useMemo(
      (): React.CSSProperties => ({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-50px)",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }),
      [isVisible]
    );

    const lineStyle = useMemo(
      (): React.CSSProperties => ({
        width: isVisible ? "100%" : "0%",
        transition: "width 1s ease-in-out 0.5s",
      }),
      [isVisible]
    );

    return (
      <div
        className="text-center mb-12 bg-red-900/80 px-10 py-6 rounded-lg backdrop-blur-sm"
        style={headingStyle}
      >
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg">
          <span>See Santa</span>
        </h2>
        <h2 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
          <span>in Action</span>
        </h2>
        <div
          className="h-1 bg-gradient-to-r from-red-500 to-green-500 mx-auto mt-6 rounded-full max-w-md"
          style={lineStyle}
        />
      </div>
    );
  }
);

AnimatedHeading.displayName = "AnimatedHeading";

// Memoized CTA section
const CallToAction: React.FC<{ isVisible: boolean }> = memo(({ isVisible }) => {
  const ctaStyle = useMemo(
    (): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(50px)",
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s",
    }),
    [isVisible]
  );

  return (
    <div className="text-center mt-12" style={ctaStyle}>
      <p className="text-xl text-white/90 mb-6 max-w-2xl bg-black/50 p-4 rounded-lg mx-auto">
        Experience the magic of Christmas as Santa brings joy to children around
        the world! Watch exclusive behind-the-scenes footage from the North
        Pole.
      </p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="View more Santa videos"
      >
        🎅 More Santa Videos
      </button>
    </div>
  );
});

CallToAction.displayName = "CallToAction";

// Main component
const SantaVideoSection: React.FC = memo(() => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

  const handlePlayClick = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const videoContainerStyle = useMemo(
    (): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "scale(1)" : "scale(0.8)",
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
    }),
    [isVisible]
  );

  return (
    <div
      ref={sectionRef}
      className="relative py-10 overflow-hidden bg-cover bg-center bg-christmas-scene min-h-screen"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dtcbirvxc/image/upload/v1748293560/h8ymkm0jxerxeqrhcq6m.jpg")',
      }}
    >
      {/* Animated Background - only when visible */}
      <BackgroundAnimations isVisible={isVisible} />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col justify-center items-center">
        {/* Heading */}
        <AnimatedHeading isVisible={isVisible} />

        {/* Video Container */}
        <div className="relative w-full max-w-4xl" style={videoContainerStyle}>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
              {!isPlaying ? (
                <VideoPreview onPlay={handlePlayClick} isVisible={isVisible} />
              ) : (
                <VideoPlayer />
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="flex items-center justify-between mt-4 text-white/80">
              <div className="flex items-center space-x-4">
                <span className="text-sm">🎬 Santa's Workshop Live</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">HD Quality</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Decorative Elements - only animate when visible */}
          <div
            className={`absolute -top-4 -right-4 text-4xl ${
              isVisible ? "animate-spin-slow" : ""
            }`}
          >
            ❄️
          </div>
          <div
            className={`absolute -bottom-4 -left-4 text-4xl ${
              isVisible ? "animate-spin-reverse" : ""
            }`}
          >
            🎁
          </div>
        </div>

        {/* Call to Action */}
        <CallToAction isVisible={isVisible} />
      </div>
    </div>
  );
});

SantaVideoSection.displayName = "SantaVideoSection";

export default SantaVideoSection;
