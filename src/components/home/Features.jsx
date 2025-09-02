import React, { useState, useEffect } from 'react';
import { Dumbbell, Clock, Users, Flower2, X } from 'lucide-react';
import Particles from '../Particles';

const features = [
  {
    icon: <Dumbbell className="text-yellow-400 text-4xl mb-3 drop-shadow-lg" />,
    title: 'Modern Equipment',
    description: 'Train with the latest, well-maintained machines and free weights.',
  },
  {
    icon: <Users className="text-green-400 text-4xl mb-3 drop-shadow-lg" />,
    title: 'Expert Trainers',
    description: 'Certified trainers to guide, motivate, and personalize your fitness journey.',
  },
  {
    icon: <Clock className="text-blue-400 text-4xl mb-3 drop-shadow-lg" />,
    title: 'Flexible Hours',
    description: 'Open early morning till late night for your convenience.',
  },
  {
    icon: <Flower2 className="text-pink-400 text-4xl mb-3 drop-shadow-lg" />,
    title: 'Wellness & Relaxation',
    description: 'Yoga, Zumba, and wellness classes for mind and body balance.',
  },
];

export default function Features() {
  const [activeCard, setActiveCard] = useState(-1); // -1 means none selected
  const [isMobile, setIsMobile] = useState(false);
  
  const handleClick = (cardIndex) => {
    setActiveCard(activeCard === cardIndex ? -1 : cardIndex);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-4 sm:py-16 md:py-20 bg-black/30 relative overflow-hidden z-10">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0  z-0"></div>
      
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
        <h2 className="text-2xl pb-4 sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15] drop-shadow-lg animate-pulse">
          Why Choose Power Point Gym?
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div
              key={`feature-${idx}`}
              onClick={() => handleClick(idx)}
              className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-xl shadow-2xl p-3 sm:p-6 flex flex-col items-center text-center hover:scale-105 hover:shadow-[0_20px_50px_rgba(250,204,21,0.3)] transition-all duration-500 border border-gray-800 hover:border-[#FACC15]/50 overflow-hidden cursor-pointer sm:cursor-default"
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated Border Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FACC15] via-transparent to-[#60A5FA] p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-900/90 to-black/90"></div>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon with enhanced hover effect */}
                <div className="mb-2 sm:mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {React.cloneElement(feature.icon, {
                    className: `text-2xl sm:text-3xl md:text-4xl mb-2 drop-shadow-lg group-hover:drop-shadow-[0_0_20px_currentColor] transition-all duration-500 ${feature.icon.props.className.split(' ')[0]}`
                  })}
                </div>
                
                {/* Title with gradient effect */}
                <h3 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-[#FACC15] group-hover:from-[#FACC15] group-hover:to-yellow-200 transition-all duration-500">
                  {feature.title}
                </h3>
                
                {/* Mobile Description Container */}
                <div className="sm:hidden">
                  {activeCard === idx && (
                    <p className="text-amber-50/90 transition-colors duration-500 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
                
                {/* Desktop Description Container */}
                <div className="hidden sm:block">
                  <p className="text-amber-50/90 group-hover:text-white transition-colors duration-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Decorative corner elements */}


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}