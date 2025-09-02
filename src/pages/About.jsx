import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Dumbbell, Heart, Star, ArrowRight, CheckCircle, Play } from 'lucide-react';
import Particles from '../components/Particles';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Draggable bubbles state
  const [bubbles, setBubbles] = useState([
    {
      id: 'members',
      x: -64, // -left-16 equivalent
      y: -64, // -bottom-16 equivalent
      isDragging: false,
      number: '2500+',
      label: 'Happy Members',
      gradient: 'from-yellow-400/30 to-amber-500/30'
    },
    {
      id: 'years',
      x: -64, // -right-16 equivalent  
      y: -64, // -top-16 equivalent
      isDragging: false,
      number: '9',
      label: 'Years Strong',
      gradient: 'from-amber-500/30 to-yellow-400/30'
    }
  ]);

  // Animated counters for stats
  const [members, setMembers] = useState(0);
  const [trainers, setTrainers] = useState(0);
  const [years, setYears] = useState(0);
  const [equipment, setEquipment] = useState(0);

  useEffect(() => {
    let start = Date.now();
    let duration = 300; // ms
    let membersTarget = 5000;
    let trainersTarget = 50;
    let yearsTarget = 10;
    let equipmentTarget = 50;
    let raf;
    function animate() {
      let elapsed = Date.now() - start;
      let progress = Math.min(elapsed / duration, 1);
      setMembers(Math.floor(progress * membersTarget));
      setTrainers(Math.floor(progress * trainersTarget));
      setYears(Math.floor(progress * yearsTarget));
      setEquipment(Math.floor(progress * equipmentTarget));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setMembers(membersTarget);
        setTrainers(trainersTarget);
        setYears(yearsTarget);
        setEquipment(equipmentTarget);
      }
    }
    animate();
    return () => raf && cancelAnimationFrame(raf);
  }, []);

  const stats = [
    { number: `${members}+`, label: 'Happy Members', icon: Users },
    { number: `${trainers}+`, label: 'Expert Trainers', icon: Award },
    { number: `${equipment}+`, label: 'Equipment Types', icon: Dumbbell },
    { number: `${years}+`, label: 'Years Experience', icon: Heart }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 100,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 100
        });
      }

      // Handle bubble dragging
      setBubbles(prev => prev.map(bubble => {
        if (bubble.isDragging) {
          const heroSection = document.querySelector('.hero-image-container');
          if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            return {
              ...bubble,
              x: e.clientX - rect.left - 64, // Offset by half bubble size
              y: e.clientY - rect.top - 64
            };
          }
        }
        return bubble;
      }));
    };

    const handleMouseUp = () => {
      setBubbles(prev => prev.map(bubble => ({ ...bubble, isDragging: false })));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleBubbleMouseDown = (bubbleId, e) => {
    e.preventDefault();
    setBubbles(prev => prev.map(bubble => 
      bubble.id === bubbleId 
        ? { ...bubble, isDragging: true }
        : bubble
    ));
  };

  const features = [
    {
      title: 'Inclusive Environment',
      description: 'We welcome all ages, genders, and fitness backgrounds. Your journey is our priority.',
      gradient: 'from-yellow-400 to-amber-500'
    },
    {
      title: 'Expert Trainers',
      description: 'Our certified trainers offer personalized guidance and motivation to help you reach your goals.',
      gradient: 'from-amber-500 to-yellow-400'
    },
    {
      title: 'Modern Facilities',
      description: 'Enjoy top-tier equipment, spacious workout zones, group fitness studios, and relaxing wellness areas.',
      gradient: 'from-yellow-400 to-amber-500'
    },
    {
      title: 'Diverse Classes',
      description: 'From HIIT and strength training to yoga and Zumba, there\'s something for everyone.',
      gradient: 'from-amber-500 to-yellow-400'
    },
    {
      title: 'Flexible Memberships',
      description: 'Choose from a range of plans, including student, family, and corporate options.',
      gradient: 'from-yellow-400 to-amber-500'
    },
    {
      title: 'Community Spirit',
      description: 'Join a supportive community that celebrates every milestone, big or small.',
      gradient: 'from-amber-500 to-yellow-400'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'Power Point Gym transformed my life completely. The community here is incredible and the trainers genuinely care about your progress.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'Personal Trainer',
      content: 'As a trainer myself, I can say this gym has the best equipment and atmosphere. It\'s where I come to push my own limits.',
      rating: 5,
      avatar: '👨‍💪'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Yoga Instructor',
      content: 'The variety of classes and the supportive environment make this gym special. I\'ve been a member for 3 years and love every moment.',
      rating: 5,
      avatar: '🧘‍♀️'
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <Header />
      
      {/* Particles Background - covers entire scrollable page */}
      <div className="fixed inset-0 z-[1] w-full h-full min-h-screen pointer-events-none">
        <Particles
          particleCount={1000}
          particleSpread={15}
          speed={0.1}
          particleColors={["#FACC15", "#22c55e", "#60A5FA", "#ec4899", "#ffffff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={true}
          particleBaseSize={200}
          sizeRandomness={1.2}
          cameraDistance={25}
          disableRotation={false}
        />
      </div>

      {/* Animated Background Elements */}


      <div className="relative z-10">
    {/* Hero Section */}
  <section className=" flex items-center justify-center sm:mb-12 pb-0">
          <div className="container mt-10 ml-10 sm:mt-20 sm:mx-auto max-w-7xl">
            <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-8">
                <div className="space-y-4 ">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full border border-yellow-400/30 backdrop-blur-sm">
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-sm text-white/80">Premium Fitness Experience</span>
                  </div>
                  <h2 className="text-2xl md:text-7xl font-black text-white leading-tight">
                    Power Point
                    <span className="block bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-5xl md:text-7xl  text-transparent">
                      Unisex  <h2 className='inline text-2xl md:text-7xl'>Gym</h2>

                    </span>
                    
                  </h2>
                  <p className="text-xl text-white leading-relaxed sm:hidden max-w-2xl">
                    Where every journey is unique and every member is family......
                  </p>
                    <p className=" hidden md:block text-xl text-white leading-relaxed max-w-2xl">
                    Where every journey is unique and every member is family. We're more than just a gym—we're a vibrant community dedicated to helping you achieve your personal best.
                  </p>

                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/register" className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full font-semibold text-white shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 inline-block">
                    <span className="relative z-10 flex items-center">
                      Join Our Community
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link to="/gallery" className="flex items-center px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Watch Tour
                  </Link>
                </div>
              </div>

              <div className="relative hero-image-container">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="hidden sm:block md:aspect-[4/3]  bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Dumbbell className="w-24 h-24 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-medium">Gym Facility Image</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Draggable Floating Bubbles only on desktop (sm and above) */}
                <div className="hidden sm:block">
                  {bubbles.map((bubble, index) => (
                    <div
                      key={bubble.id}
                      className={`absolute cursor-grab active:cursor-grabbing select-none z-20 ${
                        bubble.isDragging ? '' : 'animate-bounce'
                      } ${bubble.isDragging ? 'scale-110' : 'hover:scale-105'} transition-transform duration-200`}
                      style={{
                        left: bubble.x,
                        top: bubble.y,
                        animationDelay: index === 0 ? '0s' : '1s',
                        animationDuration: '3s'
                      }}
                      onMouseDown={(e) => handleBubbleMouseDown(bubble.id, e)}
                    >
                      <div className={`bg-gradient-to-br ${bubble.gradient} backdrop-blur-lg rounded-full p-8 border border-white/20 shadow-2xl`}>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-white mb-1">{bubble.number}</div>
                          <div className="text-sm text-white">{bubble.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Static Floating Elements */}
                <div className=" hidden sm:absolute top-1/2 -left-8 animate-pulse" style={{animationDelay: '2s'}}>
                  <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 backdrop-blur-lg rounded-full p-6 border border-white/10">
                    <Dumbbell className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
                
                <div className="hidden sm:absolute bottom-1/4 -right-4 animate-pulse" style={{animationDelay: '0.5s'}}>
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-400/20 backdrop-blur-lg rounded-full p-6 border border-white/10">
                    <Heart className="w-8 h-8 text-amber-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    {/* Stats Section */}
  <section className="pt-0 pb-0 md:pt-4 md:pb-2 px-4 mt-0">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Animated stats */}
              <div className="text-center group">
                <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl lg:text-4xl font-bold text-white mb-2">{members}+</div>
                <div className="text-white">Happy Members</div>
              </div>
              <div className="text-center group">
                <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{trainers}+</div>
                <div className="text-white">Expert Trainers</div>
              </div>
              <div className="text-center group">
                <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{equipment}+</div>
                <div className="text-white">Equipment Types</div>
              </div>
              <div className="text-center group">
                <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{years}+</div>
                <div className="text-white">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Why Choose
                <span className="block bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Power Point?
                </span>
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Experience the difference with our world-class facilities, expert guidance, and vibrant community that sets us apart.
              </p>
            </div>

            <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" 
                       style={{background: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})`}}></div>
                  <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="py-10 sm:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
              <div className="flex flex-wrap justify-center mb-8 bg-white/5 rounded-2xl p-2">
                {['story', 'mission', 'values'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg'
                        : 'text-white hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="text-center">
                {activeTab === 'story' && (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">Our Story</h3>
                    <p className="text-white text-lg leading-relaxed max-w-4xl mx-auto">
                      Power Point Gym began with a simple vision: to make fitness accessible, enjoyable, and rewarding for everyone. 
                      Established in 2015, we've grown into a trusted fitness hub, known for our friendly atmosphere, knowledgeable staff, 
                      and commitment to member success.
                    </p>
                    <p className="text-white text-lg leading-relaxed max-w-4xl mx-auto">
                      We believe fitness is not just about physical strength, but also about building confidence, resilience, 
                      and lifelong friendships. Our members inspire us every day—and together, we strive for progress, not perfection.
                    </p>
                  </div>
                )}
                {activeTab === 'mission' && (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                    <p className="text-white text-lg leading-relaxed max-w-4xl mx-auto">
                      To create an inclusive, supportive environment where every individual can pursue their fitness goals with confidence. 
                      We are committed to providing exceptional facilities, expert guidance, and a community that celebrates every achievement.
                    </p>
                  </div>
                )}
                {activeTab === 'values' && (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">Our Values</h3>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🤝</div>
                        <h4 className="font-semibold text-white mb-2">Inclusivity</h4>
                        <p className="text-white text-sm">Everyone belongs here</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">💪</div>
                        <h4 className="font-semibold text-white mb-2">Excellence</h4>
                        <p className="text-white text-sm">Quality in everything we do</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">❤️</div>
                        <h4 className="font-semibold text-white mb-2">Community</h4>
                        <p className="text-white text-sm">Together we grow stronger</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-10 sm:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                What Our <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Members Say</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-white text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 sm:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Life?
              </h3>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Join thousands of members who have already started their fitness journey with us. 
                Your transformation starts today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full font-semibold text-white shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 inline-block">
                  Start Your Journey
                </Link>
                <Link to="/" className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300 inline-block">
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;
