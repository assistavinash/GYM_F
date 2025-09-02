"use client";
import { useState, useEffect } from 'react';

export default function CallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-6 md:py-12 text-center overflow-hidden z-10">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0  z-0"></div>
      
      {/* Smooth Top Transition */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
      
      {/* Smooth Bottom Transition */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      
      {/* Animated Particles */}


      <div className="container mx-auto px-6 relative z-20">
        {/* Animated icon */}
        <div className={`mb-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-3xl md:text-6xl text-yellow-400 mx-auto animate-bounce drop-shadow-2xl">
            💪
          </div>
        </div>

        {/* Enhanced heading with gradient text */}
        <h2 className={`text-3xl md:text-7xl font-black mb-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
            Ready to Transform
          </span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Your Life?
          </span>
        </h2>

        {/* Enhanced description */}
        <p className={`mb-10 text-sm md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Join <span className="text-yellow-400 font-bold">Power Point Gym</span> today and unlock your full potential with expert trainers, modern facilities, and a motivating community.
          <br />
          <span className="inline-flex items-center mt-3 px-4 py-2 bg-gradient-to-r text-sm md:text-lg from-red-600 to-red-500 text-white font-bold rounded-full animate-pulse shadow-2xl">
            <span className="mr-1 animate-bounce">🔥</span>
            Limited-time offer: First week FREE!
                        <span className="mr-1 animate-bounce">🔥</span>
          </span>
        </p>

        {/* Enhanced trust badges with animations */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-6 mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { icon: "✅", text: "No Joining Fee", color: "text-green-400" },
            { icon: "⭐", text: "Certified Trainers", color: "text-blue-400" },
            { icon: "⚡", text: "Flexible Memberships", color: "text-purple-400" }
          ].map((badge, index) => (
            <span
              key={index}
              className={`flex items-center bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm px-2 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold text-yellow-300 border border-yellow-400/30 shadow-2xl transform hover:scale-110 transition-all duration-300 ${
                pulseIndex === index ? 'animate-pulse ring-2 ring-yellow-400/50' : ''
              }`}
            >
              <span className={`${badge.color} mr-1 md:mr-3 text-sm md:text-lg animate-spin`} style={{animationDuration: '3s'}}>
                {badge.icon}
              </span>
              <span>{badge.text}</span>
            </span>
          ))}
        </div>

        {/* Enhanced CTA button */}
        <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a
            href="/membership"
            className="group relative inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-gray-900 font-black px-12 py-5 rounded-full shadow-2xl text-sm md:text-xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
          >
            <span className="relative z-10 flex items-center">
              <span className="mr-3 animate-bounce">🔥</span>
              Get Your Free Week
              <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </a>
        </div>

        {/* Enhanced terms text */}
        <div className={`mt-8 text-sm text-gray-400 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          *Offer valid for new members only. 
        </div>

        {/* Success indicators */}

      </div>
    </section>
  );
}