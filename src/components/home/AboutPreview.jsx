"use client";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Users, Heart, ArrowRight, Quote } from 'lucide-react';
import Particles from '../Particles';

export default function AboutPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  return (
    <section className="pt-6 pb-4 sm:pt-8 sm:pb-6 md:pt-10 md:pb-8 bg-black/30 relative overflow-hidden z-10">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Smooth Top Transition */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
      
      {/* Smooth Bottom Transition */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 z-[1]">
        <Particles
          particleCount={isMobile ? 400 : 1000}
          particleSpread={isMobile ? 8 : 12}
          speed={isMobile ? 0.05 : 0.1}
          particleColors={["#FACC15", "#22c55e", "#60A5FA", "#ec4899", "#ffffff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={isMobile ? 0.5 : 0.8}
          alphaParticles={true}
          particleBaseSize={isMobile ? 120 : 200}
          sizeRandomness={0.8}
          cameraDistance={isMobile ? 18 : 25}
          disableRotation={false}
          className="features-particles"
        />
      </div>


      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className={`flex-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] via-yellow-300 to-orange-400 drop-shadow-lg">
              Fitness For Everyone
            </h2>

            <p className="text-base hidden sm:block sm:text-lg md:text-xl mb-6 sm:mb-8 text-amber-50/90 leading-relaxed">
              At <span className="font-bold text-[#FACC15] animate-pulse">Power Point Unisex Gym</span>, we believe fitness is a lifestyle, not a destination. Our mission is to empower every member—regardless of age, gender, or ability—to achieve their best self in a motivating, inclusive, and safe environment.
            </p>
            
            {/* Feature List */}
            <ul className="mb-6 sm:mb-8 space-y-4">
              {[
                { icon: Dumbbell, text: "State-of-the-art equipment & modern facilities" },
                { icon: Users, text: "Expert trainers & supportive community" },
                { icon: Heart, text: "Wide range of group classes for every fitness level" }
              ].map((item, index) => (
                <li 
                  key={index}
                  className={`flex items-center text-amber-50/90 group transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
                >
                  <div className="bg-gradient-to-r from-[#FACC15] to-yellow-300 p-2 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="text-black text-lg sm:text-xl" />
                  </div>
                  <span className="group-hover:text-white transition-colors duration-300">{item.text}</span>
                </li>
              ))}
            </ul>
            
            {/* Testimonial */}
            <div className={`bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-3 sm:mb-4 shadow-2xl border border-gray-700 hover:border-[#FACC15]/50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FACC15] to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
                </div>
                <div className="flex-1">
                  <p className="italic text-gray-300 mb-3 text-sm sm:text-base leading-relaxed">
                    "Power Point Gym is more than a gym—it's a family. The trainers and members inspire me every day!"
                  </p>
                  <span className="block text-[#FACC15] font-semibold text-sm sm:text-base">– Neha, Member</span>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <button 
                onClick={handleLearnMoreClick}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FACC15] to-yellow-300 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-2xl hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Learn more about us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
          
          {/* Image */}
          <div className={`flex-1 hidden sm:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl group">
              {/* Placeholder Image with Gradient Background */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center relative overflow-hidden">
                {/* Gym Equipment Silhouettes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl sm:text-8xl md:text-9xl text-[#FACC15]/20 transform rotate-12">
                    <Dumbbell />
                  </div>
                </div>
                
                {/* Overlay Pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FACC15]/10 to-[#60A5FA]/10"></div>
                
                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #FACC15 2px, transparent 0)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                
                {/* Center Text */}
                <div className="relative z-10 text-center">
                  <Dumbbell className="w-16 h-16 sm:w-20 sm:h-20 text-[#FACC15] mx-auto mb-4 animate-pulse" />
                  <p className="text-white/80 font-semibold text-lg sm:text-xl">Power Point Gym</p>
                  <p className="text-white/60 text-sm sm:text-base">Premium Fitness Experience</p>
                </div>
              </div>
              
              {/* Badge */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-gradient-to-r from-[#FACC15] to-yellow-300 text-black text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg font-bold backdrop-blur-sm">
                Since 2015
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FACC15]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Corner Decorations */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#FACC15]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#60A5FA]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}