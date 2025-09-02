'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, Zap, Target, Trophy, Users } from 'lucide-react';
import LightRays from '../LightRays';
import Particles from '../Particles';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const stats = [
    { icon: Users, number: '5000+', label: 'Active Members' },
    { icon: Trophy, number: '15+', label: 'Years Experience' },
    { icon: Target, number: '95%', label: 'Success Rate' },
    { icon: Zap, number: '24/7', label: 'Access Available' }
  ];

  const text1 = "Unleash Your Potential";
  const text2 = "Transform Your Body";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for mobile
  useEffect(() => {
    if (isLoaded) {
      let i = 0;
      const typeText1 = () => {
        if (i < text1.length) {
          setTypedText1(text1.slice(0, i + 1));
          i++;
          setTimeout(typeText1, 50);
        } else {
          setShowSecondLine(true);
          let j = 0;
          const typeText2 = () => {
            if (j < text2.length) {
              setTypedText2(text2.slice(0, j + 1));
              j++;
              setTimeout(typeText2, 50);
            }
          };
          setTimeout(typeText2, 100);
        }
      };
      setTimeout(typeText1, 200);
    }
  }, [isLoaded]);

  return (
    <>
      <style jsx>{`
        @keyframes slideStats {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .sliding-stats {
          animation: slideStats 20s linear infinite;
        }
        .typing-cursor::after {
          content: '|';
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <section className="relative min-h-[50vh] sm:min-h-screen h-auto flex items-center justify-center overflow-hidden py-4 sm:py-8 md:py-12">
        

        {/* Smooth Top Transition */}
      <div className="absolute inset-0  z-0"></div>
      
      {/* Smooth Top Transition */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
      
      {/* Smooth Bottom Transition */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent"></div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        {/* Light Rays Background */}
        <div className="absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#FFFF99"
            raysSpeed={isMobile ? 0.8 : 1.2}
            lightSpread={isMobile ? 0.4 : 0.6}
            rayLength={isMobile ? 2 : 3}
            followMouse={!isMobile}
            mouseInfluence={isMobile ? 0 : 0.08}
            noiseAmount={isMobile ? 0.03 : 0.05}
            distortion={isMobile ? 0.02 : 0.03}
            className="hero-light-rays"
          />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-[1]">
          <Particles
            particleCount={isMobile ? 300 : 1000}
            particleSpread={isMobile ? 6 : 12}
            speed={isMobile ? 0.05 : 0.1}
            particleColors={["#FACC15", "#22c55e", "#60A5FA", "#ec4899", "#ffffff"]}
            moveParticlesOnHover={true}
            particleHoverFactor={isMobile ? 0.5 : 0.8}
            alphaParticles={true}
            particleBaseSize={isMobile ? 100 : 200}
            sizeRandomness={0.8}
            cameraDistance={isMobile ? 15 : 25}
            disableRotation={false}
            className="hero-particles"
          />
        </div>

        {/* Content overlay - Layer 2 */}
        <div className="absolute inset-0 z-[2] bg-black/20"></div>

        {/* Mobile: Logo and POWER POINT full width at top */}
        <div className='absolute top-4 left-4 right-4 z-40 sm:hidden'>
          <div className='flex items-center gap-2'>
            <div 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
              
            >
                  <img 
              src="./images/logo.png" 
              alt="Power Point Gym Logo" 
              className="w-full h-full object-contain rounded-full"
            />
            </div>
            
            <div className='flex items-center gap-1'>
              <h2
                className="absolute left-1/2 transform -translate-x-1/2 text-xl font-black tracking-wider animate-pulse"
                style={{
                  fontWeight: '900',
                  color: 'white',
                  textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5), 0 0 90px rgba(239, 68, 68, 0.3)',
                  letterSpacing: '0.2rem',
                }}
              >
                POWER POINT
              </h2>
            </div>
          </div>
          
          <div>
            <div className='flex justify-center items-center h-full pl-50'>    
              <div 
                className="text-xl font-black tracking-widest animate-pulse pt-5 flex flex-col items-center"
                style={{
                  color: 'white',
                  textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5), 0 0 90px rgba(239, 68, 68, 0.3)',
                  letterSpacing: '0.3em',
                }}
              >
                <div>G</div>
                <div>Y</div>
                <div>M</div>
              </div>
            </div>
            
            <div className={`sm:hidden transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-2xl font-black leading-tight">
                <span 
                  className={`block mb-2 ${typedText1 === text1 ? '' : 'typing-cursor'}`}
                  style={{ 
                    color: '#FACC15',
                    textShadow: '0 0 20px rgba(250, 204, 21, 0.5), 0 0 40px rgba(250, 204, 21, 0.3)'
                  }}
                >
                  {typedText1}
                </span>
              </h2>
            </div>
            
            <div>
              <h2 className='text-lg font-black leading-tight'>
                {showSecondLine && (
                  <span className="block">
                    <span 
                      className={`${typedText2 === text2 ? '' : 'typing-cursor'}`}
                      style={{ 
                        color: '#60A5FA',
                        textShadow: '0 0 20px rgba(96, 165, 250, 0.5)'
                      }}
                    >
                      Transform
                    </span>
                    <span className="text-white ml-2">Your Body</span>
                  </span>
                )}
              </h2>
            </div>

            {/* Mobile: Action Buttons */}
            <div className={`sm:hidden flex gap-3 justify-center mt-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0'}`}>
              <button
                className="group relative w-32 px-4 py-2.5 rounded-full font-bold text-xs shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)',
                  color: '#000000',
                  boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)'
                }}
              >
                <span className="relative z-10">Get Membership</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
              
              <button
                className="group relative w-32 px-4 py-2.5 rounded-full font-bold text-xs border-2 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                style={{
                  borderColor: '#FACC15',
                  color: '#FACC15',
                  background: 'rgba(0, 0, 0, 0.3)'
                }}
              >
                <span className="relative z-10">Explore Classes</span>
                <div className="absolute inset-0 bg-[#FACC15] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
              </button>
            </div>

            {/* Mobile: Sliding Stats */}
<div className="sm:hidden mt-6 overflow-hidden relative">
  {/* Left Gradient */}
  <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

  {/* Right Gradient (same darkness as left) */}
  <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
  
  <div className="sliding-stats flex gap-4 whitespace-nowrap">
    {[...stats, ...stats, ...stats].map((stat, index) => {
      const IconComponent = stat.icon;
      return (
        <div 
          key={index}
          className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm border border-[#FACC15]/30 rounded-full px-3 py-1.5"
        >
          <IconComponent className="w-3 h-3 text-[#FACC15]" />
          <span className="text-[#FACC15] font-bold text-xs">{stat.number}</span>
          <span className="text-white text-xs">{stat.label}</span>
        </div>
      );
    })}
  </div>
</div>

          </div>
        </div>

        {/* Desktop: Logo */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 hidden sm:block z-40">
          <div 
            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
          >
            <img 
              src="./images/logo.png" 
              alt="Power Point Gym Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
        
        {/* Desktop: POWER POINT Header */}
        <div className="absolute top-4 sm:top-6 md:top-8 left-0 right-0 z-40 justify-center hidden sm:flex">
          <div className="w-full ml-40 max-w-[100%] flex justify-center">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-widest animate-pulse text-center"
              style={{
                fontWeight: '900',
                color: 'white',
                textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5), 0 0 90px rgba(239, 68, 68, 0.3)',
                letterSpacing: '2rem',
                display: 'inline-block'
              }}
            >
              POWER POINT
            </h2>
          </div>
        </div>

        {/* Desktop: GYM Text */}
        <div className="absolute right-4 sm:right-6 md:right-8 top-1/4 z-40 pr-6 hidden sm:flex">
          <div className="flex flex-col items-center space-y-2">
            <div 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black animate-pulse"
              style={{
                color: 'white',
                textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5), 0 0 90px rgba(239, 68, 68, 0.3)',
              }}
            >
              G
            </div>
            <div 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black animate-pulse"
              style={{
                color: 'white',
                textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5), 0 0 90px rgba(239, 68, 68, 0.3)',
              }}
            >
              Y
            </div>
            <div 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black animate-pulse"
              style={{
                color: 'white',
                textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5), 0 0 90px rgba(239, 68, 68, 0.3)',
              }}
            >
              M
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container sm:mt-25 px-4 sm:px-6 z-20 relative">
          <div className="max-w-4xl mx-auto text-center sm:text-left">
            
            {/* Desktop: Animated Title */}
            <div className={`hidden sm:block transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight">
                <span 
                  className="block mb-2 sm:mb-4 animate-pulse"
                  style={{ 
                    color: '#FACC15',
                    textShadow: '0 0 20px rgba(250, 204, 21, 0.5), 0 0 40px rgba(250, 204, 21, 0.3)'
                  }}
                >
                  Unleash Your Potential
                </span>
                <span className="block">
                  <span 
                    className="animate-pulse"
                    style={{ 
                      color: '#60A5FA',
                      textShadow: '0 0 20px rgba(96, 165, 250, 0.5)'
                    }}
                  >
                    Transform
                  </span>
                  <span className="text-white ml-2 sm:ml-4">Your Body</span>
                </span>
              </h1>
            </div>

            {/* Desktop: Subtitle */}
            <div className={`transition-all duration-1000 hidden sm:block ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p 
                className="text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto sm:mx-0 leading-relaxed"
                style={{ color: '#FFF8F8' }}
              >
                Join Power Point Gym today and experience world-class facilities, expert trainers, and 
                <span className="text-[#FACC15] font-bold"> cutting-edge equipment</span> designed to help you achieve your fitness goals.
              </p>
            </div>

            {/* Desktop: Action Buttons */}
            <div className={`hidden sm:flex flex-row gap-6 mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 items-center sm:items-start ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button
                className="group relative flex-none px-8 md:px-10 py-4 rounded-full font-bold text-base md:text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)',
                  color: '#000000',
                  boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)'
                }}
              >
                <span className="relative z-10">Get Membership</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
              
              <button
                className="group relative flex-none px-8 md:px-10 py-4 rounded-full font-bold text-base md:text-lg border-2 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                style={{
                  borderColor: '#FACC15',
                  color: '#FACC15',
                  background: 'rgba(0, 0, 0, 0.3)'
                }}
              >
                <span className="relative z-10">Explore Classes</span>
                <div className="absolute inset-0 bg-[#FACC15] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
              </button>
            </div>

            {/* Desktop Stats */}
            <div className={`hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index}
                    className={`text-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border transition-all duration-500 ${
                      currentStat === index 
                        ? 'bg-[#FACC15]/20 border-[#FACC15] shadow-lg shadow-[#FACC15]/20 scale-105' 
                        : 'bg-black/30 border-gray-600 hover:border-[#FACC15]/50'
                    }`}
                  >
                    <IconComponent 
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 transition-colors duration-300 ${
                        currentStat === index ? 'text-[#FACC15]' : 'text-white'
                      }`} 
                    />
                    <div 
                      className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 transition-colors duration-300 ${
                        currentStat === index ? 'text-[#FACC15]' : 'text-white'
                      }`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-4 sm:left-10 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-1 h-12 sm:h-16 bg-gradient-to-b from-[#FACC15] to-transparent animate-pulse"></div>
            <div className="text-[#FACC15] font-bold text-xs sm:text-sm rotate-90 whitespace-nowrap">POWER POINT</div>
            <div className="w-1 h-12 sm:h-16 bg-gradient-to-t from-[#60A5FA] to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Side Decorations */}
        <div className="absolute right-4 sm:right-10 bottom-16 sm:bottom-20 z-20 hidden sm:block">
          <div className="flex flex-col items-end space-y-2">
            <div className="w-8 sm:w-12 h-1 bg-[#FACC15] rounded-full"></div>
            <div className="w-6 sm:w-8 h-1 bg-[#60A5FA] rounded-full"></div>
            <div className="w-10 sm:w-16 h-1 bg-white/50 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Transition */}
        <div className="absolute bottom-0 inset-x-0 h-8 sm:h-20 bg-gradient-to-t from-black to-transparent z-20"></div>
      </section>
    </>
  );
}

export default Hero;
