"use client";
import React, { useState } from 'react';
import { Zap, Leaf, Dumbbell, ArrowRight, Clock, Users, Star } from 'lucide-react';

const sampleClasses = [
  {
    id: 1,
    name: 'HIIT Cardio',
    image: '/images/classes/Logo.png',
    description: 'High-Intensity Interval Training to burn calories fast and boost your endurance.',
    detailedDesc: 'Transform your fitness with explosive workouts designed to maximize calorie burn',
    icon: <Zap className="w-6 h-6" />,
    duration: '45 min',
    difficulty: 'High',
    participants: '12-15',
    rating: 4.8,
    color: 'bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15]',
    bgPattern: 'bg-gradient-to-br from-gray-800 to-gray-900',
    category: 'Cardio'
  },
  {
    id: 2,
    name: 'Yoga Flow',
    image: '/images/classes/Logo.png',
    description: 'Stretch, strengthen, and find your inner peace through mindful movement.',
    detailedDesc: 'Connect mind, body and soul with flowing sequences that restore balance',
    icon: <Leaf className="w-6 h-6" />,
    duration: '60 min',
    difficulty: 'Medium',
    participants: '8-12',
    rating: 4.9,
    color: 'bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15]',
    bgPattern: 'bg-gradient-to-br from-gray-800 to-gray-900',
    category: 'Wellness'
  },
  {
    id: 3,
    name: 'Strength Training',
    image: '/images/classes/Logo.png',
    description: 'Build muscle and boost your metabolism with progressive resistance training.',
    detailedDesc: 'Sculpt your physique and unlock your strength potential with expert guidance',
    icon: <Dumbbell className="w-6 h-6" />,
    duration: '50 min',
    difficulty: 'High',
    participants: '6-10',
    rating: 4.7,
    color: 'bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15]',
    bgPattern: 'bg-gradient-to-br from-gray-800 to-gray-900',
    category: 'Strength'
  },
    {
    id: 3,
    name: 'Strength Training',
    image: '/images/classes/Logo.png',
    description: 'Build muscle and boost your metabolism with progressive resistance training.',
    detailedDesc: 'Sculpt your physique and unlock your strength potential with expert guidance',
    icon: <Dumbbell className="w-6 h-6" />,
    duration: '50 min',
    difficulty: 'High',
    participants: '6-10',
    rating: 4.7,
    color: 'bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15]',
    bgPattern: 'bg-gradient-to-br from-gray-800 to-gray-900',
    category: 'Strength'
  },
];

export default function ClassesPreview() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Cardio', 'Wellness', 'Strength'];

  const filteredClasses = activeFilter === 'All' 
    ? sampleClasses 
    : sampleClasses.filter(cls => cls.category === activeFilter);

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0  z-0"></div>
      
      {/* Smooth Top Transition */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
      
      {/* Smooth Bottom Transition */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      
      {/* Animated Particles */}


      <div className="relative max-w-7xl mx-auto z-20">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-block">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15] text-black text-sm font-semibold rounded-full mb-4 transform hover:scale-105 transition-transform duration-300">
              FITNESS CLASSES
            </span>
          </div>
          
          <h2 className=" text-3xl md:text-6xl font-bold text-white mb-6 relative">
            <span className="bg-gradient-to-r from-[#FACC15] via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Popular Classes
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FACC15] via-yellow-300 to-orange-400 rounded-full"></div>
          </h2>
          
          <p className="text-xl  text-gray-300 max-w-2xl mx-auto md:mb-8 mb-4">
            Transform your fitness journey with our expertly designed classes that challenge, inspire, and deliver results
          </p>

          {/* Filter Buttons */}
          <div className="flex  justify-center gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 hidden sm:block py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#FACC15] via-yellow-300 to-orange-400 text-black shadow-lg font-bold'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <a
            href="/classes"
            className="inline-flex items-center gap-2 font-bold transition-all duration-300 group"
          >
            <span className="bg-gradient-to-r from-[#FACC15] via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              View all classes
            </span>
            <ArrowRight className="w-4 h-4 text-yellow-500 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Classes Grid - Mobile 2+2, Desktop 3 cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
          {filteredClasses.map((cls, idx) => (
            <div
              key={`${cls.id}-${idx}`}
              className={`group relative overflow-hidden rounded-3xl bg-transparent border border-gray-700/50 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl shadow-black/50 ${idx === 3 ? 'md:hidden' : ''}`}
              style={{
                animationDelay: `${idx * 0.2}s`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
              onMouseEnter={() => setHoveredCard(cls.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >

              
              {/* Content */}
              <div className="relative p-4 md:p-8 min-h-48 md:h-full flex flex-col">
                {/* Icon Section */}
                <div className="flex items-center justify-between mb-3 md:mb-6">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-white transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                    {cls.icon}
                  </div>
                  
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                    <span className="text-xs md:text-sm font-semibold text-gray-300">{cls.rating}</span>
                  </div>
                </div>

                {/* Class Info */}
                <div className="flex-grow">
                  <h3 className="text-base md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {cls.name}
                  </h3>
                  
                  <p className="text-gray-300  hidden sm:block mb-4 leading-relaxed">
                    {hoveredCard === cls.id ? cls.detailedDesc : cls.description}
                  </p>
                  

                  {/* Class Details */}
                  <div className="hidden sm:grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>{cls.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4 text-green-400" />
                      <span>{cls.participants}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className={`w-2 h-2 rounded-full ${cls.difficulty === 'High' ? 'bg-red-500' : cls.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      <span>{cls.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${cls.color} text-black font-bold transform transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 group-hover:scale-105 active:scale-95 relative overflow-hidden text-sm md:text-base`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1 md:gap-2">
                    Book Now
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  
                  {/* Button Animation Effect */}
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-yellow-500/50 transition-all duration-500"></div>
            </div>
          ))}
        </div>
        

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-block p-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl">
            <button className="bg-gray-900 px-8 py-4 rounded-xl font-semibold text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              Explore All Classes →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Hide scrollbars */
        ::-webkit-scrollbar {
          display: none;
        }
        
        html, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}