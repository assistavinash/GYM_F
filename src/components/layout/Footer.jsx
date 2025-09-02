import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaDumbbell,
  FaHeart,
  FaStar,
  FaArrowUp
} from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(true);

  // Animated counters for stats
  const [members, setMembers] = useState(0);
  const [trainers, setTrainers] = useState(0);
  const [years, setYears] = useState(0);

  // Animate counters on mount
  useEffect(() => {
    let start = Date.now();
    let duration = 300; // ms
    let membersTarget = 5000;
    let trainersTarget = 50;
    let yearsTarget = 10;
    let raf;
    function animate() {
      let elapsed = Date.now() - start;
      let progress = Math.min(elapsed / duration, 1);
      setMembers(Math.floor(progress * membersTarget));
      setTrainers(Math.floor(progress * trainersTarget));
      setYears(Math.floor(progress * yearsTarget));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setMembers(membersTarget);
        setTrainers(trainersTarget);
        setYears(yearsTarget);
      }
    }
    animate();
    return () => raf && cancelAnimationFrame(raf);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Classes', href: '/classes' },
        { name: 'Personal Training', href: '/trainers' },
        { name: 'Membership Plans', href: '/membership' },
        { name: 'Success Stories', href: '/success-stories' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Strength Training', href: '/strength-training' },
        { name: 'Cardio Workouts', href: '/cardio' },
        { name: 'Yoga Classes', href: '/yoga' },
        { name: 'Nutrition Guidance', href: '/nutrition' },
        { name: 'Physiotherapy', href: '/physiotherapy' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Refund Policy', href: '/refund' }
      ]
    }
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Consistent Background Effects - Extended to edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/10 via-transparent to-[#60A5FA]/10"></div>
      
      {/* Smooth Top Transition */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent"></div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-yellow-400 to-amber-500 text-black p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg group-hover:animate-bounce" />
        </button>
      )}

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 md:pt-16 md:pb-8">
        {/* Top Section - Brand & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 hidden sm:block h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
          <img
            src="./images/Logo.png"></img>
              </div>
              <div>
                <Link
                  to="/"
                  className="font-black  md:text-3xl text-xl bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent hover:from-amber-400 hover:to-yellow-500 transition-all duration-300"
                >
                  Power Point Gym
                </Link>
                <p className="text-gray-400 text-sm mt-1">Unisex Fitness & Wellness Center</p>
              </div>
            </div>
            
            <p className="text-gray-300 hidden sm:block leading-relaxed max-w-md">
              Transform your body, elevate your mind, and unlock your potential. Join thousands who've made fitness their lifestyle with our expert guidance and premium facilities.
            </p>

            {/* Stats */}
            <div className="hidden sm:flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{members}+</div>
                <div className="text-xs text-gray-400">Happy Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{trainers}+</div>
                <div className="text-xs text-gray-400">Expert Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{years}+</div>
                <div className="text-xs text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <div className='hidden sm:block'>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaHeart className="text-red-500 mr-2 animate-pulse" />
                Stay Motivated!
              </h3>
              <p className="text-gray-300 mb-6">
                Get weekly fitness tips, nutrition advice, and exclusive member offers delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4 hidden sm:block">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-800/50 backdrop-blur border border-gray-700 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 text-white placeholder-gray-400"
                  required
                />
                <div className="absolute right-2 top-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold px-6 py-2 rounded-xl hover:from-amber-400 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              
              {isSubscribed && (
                <div className="flex items-center text-green-400 animate-fade-in">
                  <FaStar className="mr-2" />
                  Thanks for subscribing! Welcome to the Power Point family!
                </div>
              )}
            </form>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Follow Our Journey</h4>
              <div className="flex space-x-4">
                {[
                  { icon: FaFacebookF, href: 'https://facebook.com/', color: 'hover:text-blue-500' },
                  { icon: FaInstagram, href: 'https://instagram.com/', color: 'hover:text-pink-500' },
                  { icon: FaTwitter, href: 'https://twitter.com/', color: 'hover:text-blue-400' },
                  { icon: FaYoutube, href: 'https://youtube.com/', color: 'hover:text-red-500' },
                  { icon: FaLinkedinIn, href: 'https://linkedin.com/', color: 'hover:text-blue-600' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-gray-700 hover:border-current`}
                    aria-label={`Follow us on ${social.icon.name}`}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-bold text-lg text-yellow-400 border-b border-yellow-400/30 pb-2">
                {section.title}
              </h4>
              <ul className="md:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-yellow-400 border-b border-yellow-400/30 pb-2">
              Get In Touch
            </h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-yellow-400 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p>123 Fitness Street,</p>
                  <p>Noida, UP 201301</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaPhone className="text-yellow-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-sm hover:text-yellow-400 transition-colors">
                  +91 98765 43210
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-yellow-400 flex-shrink-0" />
                <a href="mailto:info@powerpointgym.com" className="text-sm hover:text-yellow-400 transition-colors">
                  info@powerpointgym.com
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaClock className="text-yellow-400 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p>Mon-Sat: 5:00 AM - 11:00 PM</p>
                  <p>Sunday: 6:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Power Point Unisex Gym. <span className='hidden sm:inline'>All rights reserved.</span> 
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Designed with <FaHeart className="inline text-red-500 mx-1" /> for fitness enthusiasts
              </p>
            </div>

            <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-yellow-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/sitemap" className="hover:text-yellow-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animation handled by Tailwind classes */}
    </footer>
  );
}
