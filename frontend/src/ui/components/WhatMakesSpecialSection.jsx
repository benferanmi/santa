import React, { useEffect, useState } from 'react';
import { User, Clock, Heart, Sparkles, Star, Gift, Zap } from 'lucide-react';

const WhatMakesSpecialSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Magically Personalized",
      description: "Your child's name, age, and story brought to life by Santa himself!",
      color: "red",
      bgIcon: "🎅"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Delivered in 24 Hours",
      description: "No waiting, your video lands in your inbox faster than Santa's sleigh.",
      color: "green",
      bgIcon: "🎁"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Crafted with Holiday Joy",
      description: "Each video is packed with smiles, giggles, and a sprinkle of magic.",
      color: "red",
      bgIcon: "✨"
    }
  ];

  return (
    <div className="py-20 px-8 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-red-500 text-4xl animate-pulse">❄</div>
        <div className="absolute top-40 right-20 text-green-500 text-3xl animate-bounce">⭐</div>
        <div className="absolute bottom-32 left-32 text-red-400 text-4xl animate-pulse">🎄</div>
        <div className="absolute bottom-64 right-40 text-green-400 text-5xl animate-bounce">🔔</div>
        <div className="absolute top-60 left-1/4 text-red-300 text-3xl animate-pulse">🎁</div>
        <div className="absolute bottom-40 right-1/4 text-green-300 text-4xl animate-bounce">❄</div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300 opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 10}px`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-red-50 text-red-600 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-red-100">
            <Sparkles className="w-4 h-4" />
            <span>Our Special Touch</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            What Makes Us{' '}
            <span className="text-red-600 relative">
              Special?
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-200 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We don't just create videos – we craft magical moments that bring families together 
            and make Christmas unforgettable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Background */}
              <div className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
                feature.color === 'red' 
                  ? 'border-red-100 hover:border-red-200' 
                  : 'border-green-100 hover:border-green-200'
              } hover:scale-105 group-hover:-translate-y-2`}>
                
                {/* Background Emoji */}
                <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {feature.bgIcon}
                </div>

                {/* Icon Container */}
                <div className={`relative mb-6 inline-flex p-4 rounded-2xl ${
                  feature.color === 'red' 
                    ? 'bg-red-50 text-red-600' 
                    : 'bg-green-50 text-green-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                  
                  {/* Glowing effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                    feature.color === 'red' ? 'bg-red-300' : 'bg-green-300'
                  } blur-lg`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`text-2xl font-bold mb-4 ${
                    feature.color === 'red' ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 w-full h-1 rounded-b-3xl transition-all duration-300 ${
                  feature.color === 'red' 
                    ? 'bg-red-200 group-hover:bg-red-400' 
                    : 'bg-green-200 group-hover:bg-green-400'
                } ${activeCard === index ? 'h-2' : 'h-1'}`}></div>
              </div>

              {/* Floating elements */}
              <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full ${
                feature.color === 'red' ? 'bg-red-400' : 'bg-green-400'
              } opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-ping`}></div>
              
              <div className={`absolute -bottom-3 -left-3 w-4 h-4 rounded-full ${
                feature.color === 'red' ? 'bg-red-300' : 'bg-green-300'
              } opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-gray-50 rounded-3xl p-8 max-w-2xl mx-auto border border-gray-100">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-700">Ready to Create Magic?</span>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            
            <p className="text-gray-600 mb-6 text-lg">
              Join thousands of families who've already experienced the joy of personalized Santa videos.
            </p>
            
            <button className="group relative px-8 py-4 bg-red-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-red-700">
              <div className="relative flex items-center space-x-2">
                <span>Start Creating Now</span>
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default WhatMakesSpecialSection;