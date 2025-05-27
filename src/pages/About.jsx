
import { useEffect, useState } from 'react';
import { Heart, Sparkles, Star, Gift, Users, Zap } from 'lucide-react';

import SantaMagicCTASection from '../ui/components/SantaMagicCTASection'
import WhatMakesSpecialSection from '../ui/components/WhatMakesSpecialSection';
import AppLayout from '../ui/AppLayout';

const About = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const features = [
    { icon: <Heart className="w-6 h-6" />, text: "Made with love for families" },
    { icon: <Sparkles className="w-6 h-6" />, text: "AI-powered Christmas magic" },
    { icon: <Gift className="w-6 h-6" />, text: "Personalized experiences" },
    { icon: <Users className="w-6 h-6" />, text: "Bringing families together" }
  ];
  return (
    <AppLayout>
      <section>
        <div className=" bg-gradient-to-br from-red-50 via-white to-green-50 py-20 px-8 relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 text-red-500 text-6xl animate-pulse">🎄</div>
            <div className="absolute top-40 right-20 text-green-500 text-4xl animate-bounce">⭐</div>
            <div className="absolute bottom-32 left-32 text-red-400 text-5xl animate-pulse">🎁</div>
            <div className="absolute bottom-64 right-40 text-green-400 text-6xl animate-bounce">❄</div>
            <div className="absolute top-60 left-1/4 text-red-300 text-4xl animate-pulse">🔔</div>
            <div className="absolute bottom-40 right-1/4 text-green-300 text-5xl animate-bounce">🎅</div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-200 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Content */}
              <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                {/* Header */}
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>About Our Magic</span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                    About{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-green-600">
                      Us
                    </span>
                  </h1>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    We're here to make Christmas feel a little{' '}
                    <span className="text-red-600 font-semibold">warmer</span>, a little{' '}
                    <span className="text-green-600 font-semibold">brighter</span>, and a lot more{' '}
                    <span className="text-purple-600 font-semibold">magical</span> for families everywhere.
                  </p>

                  <div className="bg-gradient-to-r from-red-500 to-green-500 p-6 rounded-2xl text-white shadow-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold">It All Started With A Question</h3>
                    </div>
                    <p className="text-lg italic">
                      "What if Santa could speak directly to you?"
                    </p>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    So we built a platform that makes that happen — powered by{' '}
                    <span className="font-semibold text-blue-600">artificial intelligence</span>,{' '}
                    <span className="font-semibold text-purple-600">creativity</span>, and a little{' '}
                    <span className="font-semibold text-red-600">holiday magic</span>. Our goal is to make the season more personal, fun, and unforgettable.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="w-10 h-10 bg-red-800 rounded-lg flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button className="group relative px-8 py-4 bg-red-800 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>Experience the Magic</span>
                      <Star className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Side - Image with Effects */}
              <div
                className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                onMouseMove={handleMouseMove}
              >
                {/* Main Image Container */}
                <div className="relative group">
                  {/* Glowing Background */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-400 via-purple-500 to-green-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>

                  {/* Image Placeholder */}
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl overflow-hidden border border-gray-100 relative">
                    <div className="aspect-square bg-gradient-to-br from-red-100 to-green-100 bg-cover bg-[url('https://res.cloudinary.com/dtcbirvxc/image/upload/v1748379204/santas-helpers_jnrmc2.png')] rounded-2xl flex items-center justify-center relative overflow-hidden">
                    

                      {/* Interactive Light Effect */}
                      <div
                        className="absolute w-32 h-32 bg-gradient-to-r from-white to-transparent rounded-full opacity-20 blur-xl transition-all duration-300 pointer-events-none"
                        style={{
                          left: mousePosition.x - 64,
                          top: mousePosition.y - 64,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Floating Elements Around Image */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="absolute -top-4 -right-8 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-6 -left-8 w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                    <Gift className="w-7 h-7" />
                  </div>
                  <div className="absolute -bottom-4 -right-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

                {/* Additional Decorative Elements */}
                <div className="absolute top-1/4 -left-12 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/4 -right-12 w-4 h-4 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-3/4 -left-8 w-5 h-5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* Custom CSS for animations */}
          <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
        </div>

      </section>

      <div className='lg:py-8'>
        <WhatMakesSpecialSection />
      </div>
      <SantaMagicCTASection />
    </AppLayout>
  )
}

export default About


