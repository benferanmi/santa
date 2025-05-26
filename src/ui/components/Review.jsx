import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SantaReviewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c8f8?w=80&h=80&fit=crop&crop=face",
      review: "My daughter Emma was absolutely speechless when she saw Santa mention her by name and show our actual front door! The personalization was incredible and made her Christmas truly magical."
    },
    {
      id: 2,
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      review: "Outstanding quality and attention to detail! My son Tommy couldn't believe Santa knew about his recent soccer game. The video exceeded all our expectations."
    },
    {
      id: 3,
      name: "Lisa Martinez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      review: "This was the best Christmas surprise ever! Both my kids were amazed by their personalized messages. The production quality is professional and heartwarming."
    },
    {
      id: 4,
      name: "David Thompson",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      review: "Absolutely brilliant service! My daughter Sophia has been talking about her Santa video for weeks. The way Santa incorporated her drawings was pure magic."
    },
    {
      id: 5,
      name: "Amanda Wilson",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      review: "Customer service was exceptional and the final product was beyond our wildest dreams. My son Max was convinced Santa really knew him personally."
    },
    {
      id: 6,
      name: "Robert Garcia",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      review: "Simply amazing! The bilingual option was perfect for our family. Santa speaking both English and Spanish made it extra special for our daughter."
    }
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextReview, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-300 via-red-400 to-green-400 bg-clip-text text-transparent">
              What Parents
            </span>
            <br />
            <span className="text-white">Are Saying</span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Thousands of families have created magical Christmas memories
          </p>
        </div>

        {/* Review Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>

          {/* Review Card */}
          <div className="px-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl h-32">
              <div className="flex items-center space-x-4 h-full">
                {/* Profile Image */}
                <img
                  src={reviews[currentIndex].image}
                  alt={reviews[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-white/30"
                />
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-lg mb-2">
                    {reviews[currentIndex].name}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                    "{reviews[currentIndex].review}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SantaReviewsSlider;