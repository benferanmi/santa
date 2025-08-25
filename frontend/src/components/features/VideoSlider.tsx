// components/VideoSlider.tsx
import React, { useState, memo, useMemo, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Gift,
  Star,
  Heart,
} from "lucide-react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// Types
interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  likes: number;
  description: string;
}

interface VideoWithPosition extends Video {
  position: number;
}

interface FloatingElementProps {
  emoji: string;
  index: number;
  isVisible: boolean;
}

interface VideoCardProps {
  video: VideoWithPosition;
  isCenter: boolean;
  onClick?: () => void;
}

interface NavigationButtonProps {
  onClick: () => void;
  direction: "prev" | "next";
  className?: string;
}

// Static data moved outside component
const VIDEOS: Video[] = [
  {
    id: 1,
    title: "Emma's Christmas Joy",
    thumbnail: "🎄",
    duration: "2:15",
    likes: 1234,
    description: "Watch Emma's priceless reaction to Santa's special message!",
  },
  {
    id: 2,
    title: "Tommy's Big Surprise",
    thumbnail: "🎅",
    duration: "1:45",
    likes: 2156,
    description: "Tommy couldn't believe Santa knew his name!",
  },
  {
    id: 3,
    title: "Sarah's Christmas Wish",
    thumbnail: "🎁",
    duration: "3:02",
    likes: 987,
    description: "The moment Sarah realized her wish came true!",
  },
  {
    id: 4,
    title: "Jake's Holiday Magic",
    thumbnail: "⭐",
    duration: "2:30",
    likes: 1567,
    description: "Pure magic captured in Jake's reaction!",
  },
  {
    id: 5,
    title: "Lily's Christmas Dream",
    thumbnail: "❄️",
    duration: "1:58",
    likes: 1890,
    description: "Lily's dream of meeting Santa came true!",
  },
];

const EMOJIS = ["🎄", "🎅", "🎁", "⭐", "❄️", "🦌"] as const;

// Optimized floating element with reduced animations
const FloatingElement: React.FC<FloatingElementProps> = memo(
  ({ emoji, index, isVisible }) => {
    const style = useMemo(() => {
      const animationDelay = Math.random() * 5;
      const animationDuration = Math.random() * 20 + 15;

      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
        animationPlayState: isVisible ? "running" : "paused",
      } as React.CSSProperties;
    }, [index, isVisible]);

    // Don't render if not visible to save performance
    if (!isVisible) return null;

    return (
      <div
        className="absolute text-2xl opacity-20 animate-float-slow"
        style={style}
      >
        {emoji}
      </div>
    );
  }
);

FloatingElement.displayName = "FloatingElement";

// Optimized background animations
const BackgroundAnimations: React.FC<{ isVisible: boolean }> = memo(
  ({ isVisible }) => {
    const elements = useMemo(
      () =>
        Array.from({ length: 15 }, (_, i) => ({
          // Reduced from 30
          id: i,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        })),
      []
    );

    return (
      <div className="absolute inset-0 pointer-events-none">
        {elements.map((element) => (
          <FloatingElement
            key={element.id}
            emoji={element.emoji}
            index={element.id}
            isVisible={isVisible}
          />
        ))}
      </div>
    );
  }
);

BackgroundAnimations.displayName = "BackgroundAnimations";

// Memoized navigation button
const NavigationButton: React.FC<NavigationButtonProps> = memo(
  ({ onClick, direction, className = "" }) => {
    const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
    const baseClasses =
      "absolute top-1/2 transform -translate-y-1/2 z-20 bg-red-600/80 hover:bg-red-600 text-white p-3 md:p-4 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95";
    const positionClasses =
      direction === "prev" ? "left-4 md:left-8" : "right-4 md:right-8";

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${positionClasses} ${className}`}
        aria-label={`${direction === "prev" ? "Previous" : "Next"} video`}
      >
        <Icon size={24} />
      </button>
    );
  }
);

NavigationButton.displayName = "NavigationButton";

// Memoized video card
const VideoCard: React.FC<VideoCardProps> = memo(
  ({ video, isCenter, onClick }) => {
    const cardStyle = useMemo(
      (): React.CSSProperties => ({
        opacity: isCenter ? 1 : 0.6,
        transform: `scale(${isCenter ? 1 : 0.7})`,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: isCenter ? 10 : 5,
      }),
      [isCenter]
    );

    return (
      <div
        className={`relative ${
          isCenter ? "w-full max-w-2xl" : "w-64 md:w-80 hidden md:block"
        }`}
        style={cardStyle}
      >
        <div
          className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 ${
            isCenter ? "shadow-2xl" : "shadow-lg"
          }`}
        >
          {/* Video Player */}
          <div className="relative bg-gradient-to-br from-red-600 to-green-600 rounded-xl overflow-hidden group aspect-video">
            {/* Video Thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`${
                  isCenter
                    ? "text-8xl md:text-9xl animate-bounce-slow"
                    : "text-6xl md:text-8xl"
                }`}
              >
                {video.thumbnail}
              </div>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={onClick}
                className="bg-red-600/90 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label={`Play ${video.title}`}
              >
                <Play size={isCenter ? 32 : 24} />
              </button>
            </div>

            {/* Duration Badge */}
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
              {video.duration}
            </div>
          </div>

          {/* Video Info */}
          <div className="mt-4">
            <h3
              className={`font-semibold text-white mb-2 ${
                isCenter ? "text-xl md:text-2xl" : "text-lg"
              }`}
            >
              {video.title}
            </h3>
            {isCenter && (
              <p className="text-white/80 mb-3 text-base">
                {video.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart size={16} className="text-red-400" />
                <span className="text-white/70 text-sm">
                  {video.likes.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VideoCard.displayName = "VideoCard";

// Memoized header section
const HeaderSection: React.FC<{ isVisible: boolean }> = memo(
  ({ isVisible }) => {
    const headerStyle = useMemo(
      (): React.CSSProperties => ({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-50px)",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }),
      [isVisible]
    );

    const progressBarStyle = useMemo(
      (): React.CSSProperties => ({
        width: isVisible ? "100%" : "0%",
        transition: "width 1s ease-in-out 0.8s",
      }),
      [isVisible]
    );

    return (
      <div className="text-center mb-16" style={headerStyle}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-yellow-300 via-red-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
            Reaction Videos
          </span>
          <br />
          <span className="text-white drop-shadow-lg">
            of Message from Santa
          </span>
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mx-auto max-w-4xl border border-white/20">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            🎬 Send us your video reaction and win a discount! 🎁
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Share your child's magical moment receiving Santa's personal message
            and get a chance to win amazing discounts on future Santa videos!
          </p>

          <div
            className="h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mx-auto mt-6 rounded-full"
            style={progressBarStyle}
          />
        </div>
      </div>
    );
  }
);

HeaderSection.displayName = "HeaderSection";

// Memoized CTA section
const CTASection: React.FC<{ isVisible: boolean }> = memo(({ isVisible }) => {
  const ctaStyle = useMemo(
    (): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(50px)",
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s",
    }),
    [isVisible]
  );

  return (
    <div className="text-center mt-16" style={ctaStyle}>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mx-auto max-w-2xl border border-white/20">
        <Gift className="mx-auto mb-4 text-yellow-400" size={48} />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Share Your Magic? 🎥
        </h3>
        <p className="text-white/90 mb-6 text-lg">
          Upload your child's reaction video and join our magical community!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            🎬 Upload Your Video
          </button>

          <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95">
            📋 Contest Rules
          </button>
        </div>
      </div>
    </div>
  );
});

CTASection.displayName = "CTASection";

// Main component
const VideoSlider: React.FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

  const nextVideo = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  const prevVideo = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  }, []);

  const handleVideoPlay = useCallback((videoId: number) => {
    console.log(`Playing video ${videoId}`);
    // Add your video play logic here
  }, []);

  const visibleVideos = useMemo((): VideoWithPosition[] => {
    const result: VideoWithPosition[] = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + VIDEOS.length) % VIDEOS.length;
      result.push({ ...VIDEOS[index], position: i });
    }
    return result;
  }, [currentIndex]);

  return (
    <div
      ref={sectionRef}
      className="relative py-10 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen"
    >
      {/* Background Animation */}
      <BackgroundAnimations isVisible={isVisible} />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <HeaderSection isVisible={isVisible} />

        {/* Video Slider Section */}
        <div className="relative">
          {/* Navigation Arrows */}
          <NavigationButton onClick={prevVideo} direction="prev" />
          <NavigationButton onClick={nextVideo} direction="next" />

          {/* Video Slider */}
          <div className="flex items-center justify-center px-16 md:px-24">
            <div className="flex items-center space-x-4 md:space-x-8 w-full max-w-6xl justify-center">
              {visibleVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isCenter={video.position === 0}
                  onClick={() => handleVideoPlay(video.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <CTASection isVisible={isVisible} />
      </div>
    </div>
  );
});

VideoSlider.displayName = "VideoSlider";

export default VideoSlider;
