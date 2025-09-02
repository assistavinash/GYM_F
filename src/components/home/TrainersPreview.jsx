"use client";
import React, { useState } from 'react';
import { Dumbbell, Flower2, Zap, ArrowRight, Star, Award, Users, Clock } from 'lucide-react';

import { useEffect } from 'react';
import { getTrainers } from '../../services/trainerApi';

const iconMap = {
  Strength: <Dumbbell className="w-6 h-6" />,
  Wellness: <Flower2 className="w-6 h-6" />,
  Cardio: <Zap className="w-6 h-6" />,
};

export default function TrainersPreview() {
  const [hoveredTrainer, setHoveredTrainer] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const data = await getTrainers();
        setTrainers(data.map(tr => ({ ...tr, icon: iconMap[tr.category] })));
      } catch (err) {
        console.error('Failed to fetch trainers:', err);
      }
    }
    fetchTrainers();
  }, []);

  const filters = ['All', 'Strength', 'Wellness', 'Cardio'];
  const filteredTrainers = activeFilter === 'All' 
    ? trainers 
    : trainers.filter(trainer => trainer.category === activeFilter);

  // ...existing code...
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      <div className="absolute inset-0  z-0"></div>
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative max-w-7xl mx-auto z-20">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-block">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15] text-black text-sm font-semibold rounded-full mb-4 transform hover:scale-105 transition-transform duration-300">
              EXPERT TRAINERS
            </span>
          </div>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 relative">
            <span className="bg-gradient-to-r from-[#FACC15] via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Meet Our Trainers
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FACC15] via-yellow-300 to-orange-400 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Learn from certified professionals who are passionate about helping you achieve your fitness goals
          </p>
          {/* Filter Buttons */}
          <div className="hidden sm:flex justify-center gap-3 mb-8">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
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
            href="/trainers"
            className="inline-flex items-center gap-2 font-bold transition-all duration-300 group"
          >
            <span className="bg-gradient-to-r from-[#FACC15] via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              View all trainers
            </span>
            <ArrowRight className="w-4 h-4 text-yellow-500 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
        {/* Trainers Grid - Mobile 2 cols, Desktop 2-3 cols */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredTrainers.map((trainer, idx) => (
            <div
              key={trainer.id}
              className="group relative overflow-hidden rounded-3xl bg-transparent border border-gray-700/50 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl shadow-black/50"
              style={{
                animationDelay: `${idx * 0.2}s`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
              onMouseEnter={() => setHoveredTrainer(trainer.id)}
              onMouseLeave={() => setHoveredTrainer(null)}
            >
              {/* Card Background Gradient */}
              {/* Floating Icon */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15] flex items-center justify-center text-white transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg border-4 border-gray-800`}>
                  {trainer.icon}
                </div>
              </div>
              {/* Content */}
              <div className="relative p-4 md:p-8 pt-12 md:pt-16 min-h-56 md:h-full flex flex-col">
                {/* Trainer Image */}
                <div className="relative mx-auto mb-4 md:mb-6">
                  <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${trainer.bgGlow} p-1 group-hover:scale-110 transition-all duration-500`}>
                    <div className="w-full h-full rounded-full bg-gray-600 overflow-hidden ring-2 md:ring-4 ring-white/20">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute -bottom-1 md:-bottom-2 -right-1 md:-right-2 bg-gray-800 rounded-full px-1 md:px-2 py-1 flex items-center gap-1 border border-gray-600">
                    <Star className="w-2 h-2 md:w-3 md:h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold text-gray-300">{trainer.rating}</span>
                  </div>
                </div>
                {/* Trainer Info */}
                <div className="text-center flex-grow">
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {trainer.name}
                  </h3>
                  <p className="text-xs md:text-lg font-medium mb-2 md:mb-3 bg-gradient-to-r from-yellow-400 to-red-200 bg-clip-text text-transparent">
                    {trainer.specialty}
                  </p>
                  <p className="text-gray-300 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed hidden md:block">
                    {trainer.description}
                  </p>
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm">
                    <div className="flex items-center justify-center gap-1 md:gap-2 text-gray-400">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                      <span>{trainer.experience}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 md:gap-2 text-gray-400">
                      <Users className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                      <span>{trainer.clients}</span>
                    </div>
                  </div>
                  {/* Bottom Stats - Only on desktop */}
                </div>
                {/* CTA Button */}
                <button 
                  className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#FACC15] via-yellow-300 to-[#FACC15] text-white font-semibold transform transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 group-hover:scale-105 active:scale-95 relative overflow-hidden text-xs md:text-base`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1 md:gap-2">
                    View Profile
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
        <div className="text-center mt-8">
          <div className="inline-block p-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl">
            <button className="bg-gray-900 px-8 py-4 rounded-xl font-semibold text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              Book a Training Session →
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
