'use client';

import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Neha Patel',
    role: 'Fitness Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c1e6?w=150&h=150&fit=crop&crop=face',
    feedback: 'Joining Power Point Gym was the best decision! The trainers are amazing and I feel stronger every day. The premium equipment and personalized training programs have transformed my fitness journey completely.',
    rating: 5,
    achievement: 'Lost 15kg in 6 months'
  },
  {
    name: 'Suresh Kumar',
    role: 'Professional Athlete',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    feedback: 'Great atmosphere, friendly staff, and top-notch equipment. The advanced training facilities and expert guidance have elevated my performance to new heights. Highly recommended!',
    rating: 5,
    achievement: 'Increased strength by 40%'
  },
  {
    name: 'Aarti Joshi',
    role: 'Yoga Instructor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    feedback: 'I love the variety of classes and the supportive community here. The holistic approach to fitness and wellness has been life-changing. The instructors are world-class!',
    rating: 5,
    achievement: 'Improved flexibility by 60%'
  },
];

export default function PremiumTestimonials() {
  const [idx, setIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setIdx((prevIdx) => (prevIdx + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function prev() {
    if (isAnimating) return;
    setIsAnimating(true);
    setIdx((idx - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  }

  function next() {
    if (isAnimating) return;
    setIsAnimating(true);
    setIdx((idx + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  }

  return (
    <section className="relative py-6 overflow-hidden  z-10">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0  z-0"></div>
      
      {/* Smooth Top Transition */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
      
      {/* Smooth Bottom Transition */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      
      {/* Animated Particles */}


      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/20 mb-6">
            <Star className="text-yellow-400 w-4 h-4" />
            <span className="text-yellow-400 text-sm font-medium">Client Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-yellow-400 mb-4">
            Success Stories
          </h2>
          <p className="text-gray-400 hidden sm:block text-lg max-w-2xl mx-auto">
            Discover how our members transformed their lives with our premium fitness programs
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className={`relative transition-all duration-500 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            
            <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"></div>

              <div className="relative p-6 md:p-16">
                <div className="absolute top-4 md:top-8 left-4 md:left-8">
                  <Quote className="text-yellow-400/30 w-6 h-6 md:w-10 md:h-10" />
                </div>

                <div className="grid md:grid-cols-3 gap-4 md:gap-8 items-center">
                  
                  <div className="text-center md:text-left">
                    <div className="relative inline-block mb-4 md:mb-6">
                      <div className="w-20 h-20 md:w-32 md:h-32 mx-auto md:mx-0 rounded-xl md:rounded-2xl overflow-hidden ring-2 md:ring-4 ring-yellow-400/30 shadow-2xl">
                        <img
                          src={testimonials[idx].image}
                          alt={testimonials[idx].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 md:-bottom-3 -right-2 md:-right-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 md:p-2">
                        <Star className="text-black w-3 h-3 md:w-4 md:h-4" />
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-2">{testimonials[idx].name}</h4>
                    <p className="text-yellow-400  hidden sm:block font-medium mb-3">{testimonials[idx].role}</p>
                    
                    <div className="flex justify-center md:justify-start gap-1 mb-0 md:mb-4">
                      {[...Array(testimonials[idx].rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <div className="hidden md:inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-green-500/30">
                      <span className="text-green-400 text-sm font-medium">{testimonials[idx].achievement}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <blockquote className="text-gray-200 text-sm md:text-2xl leading-relaxed italic font-light">
                      "{testimonials[idx].feedback}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={prev}
              disabled={isAnimating}
              className="group relative bg-gradient-to-r from-gray-800 to-gray-700 hover:from-yellow-500 hover:to-orange-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-black transition-colors" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setIdx(i);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === i 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  {idx === i && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-50 blur-sm animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              disabled={isAnimating}
              className="group relative bg-gradient-to-r from-gray-800 to-gray-700 hover:from-yellow-500 hover:to-orange-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-black transition-colors" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
            </button>
          </div>

          <div className="mt-8 max-w-md mx-auto">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${((idx + 1) / testimonials.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Testimonial {idx + 1}</span>
              <span>{testimonials.length} Total</span>
            </div>
          </div>
        </div>

        <div className="text-center hidden sm:block mt-8 md:mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-400/20">
            <span className="text-gray-300">Join thousands of satisfied members</span>
            <div className="flex -space-x-2">
              {testimonials.map((testimonial, i) => (
                <img
                  key={i}
                  src={testimonial.image}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-gray-800 object-cover"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-gray-800 flex items-center justify-center text-black text-xs font-bold">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}