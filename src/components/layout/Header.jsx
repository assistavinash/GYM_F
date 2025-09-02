import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaHome,
  FaInfoCircle,
  FaDumbbell,
  FaUsers,
  FaCreditCard,
  FaCalendarAlt,
  FaEnvelope,
  FaEye,
  FaTrophy,
  FaTags,
  FaBook,
  FaUserFriends,
  FaWarehouse,
  FaWeight,
  FaHeart,
  FaRunning,
  FaCrosshairs,
  FaUser,
  FaAppleAlt,
  FaStethoscope,
  FaDollarSign,
  FaBuilding,
  FaHome as FaFamily,
  FaClock,
  FaUserCheck,
  FaCalendar,
  FaEdit,
  FaMapMarkerAlt,
  FaQuestionCircle
} from 'react-icons/fa';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownType, setDropdownType] = useState('hover'); // 'hover' or 'click'
  const fullText = "Power Point Gym";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;
  const navigate = useNavigate();

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let timer;
    if (!isDeleting && text.length < fullText.length) {
      timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && text.length === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(text.slice(0, text.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && text.length === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, typingSpeed * 2);
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  const handleLogout = () => {
    setOpen(false);
    alert('Logged out!');
    navigate('/login');
  };

  const handleMouseEnter = (index) => {
    if (!isMobile && dropdownType !== 'click') {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && dropdownType !== 'click') {
      setHoveredIndex(null);
    }
  };

  const handleMouseMove = (e) => {
    if (!isMobile) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Calculate scale based on distance from mouse - reduced scaling
  const calculateScale = (index, currentHoveredIndex) => {
    if (currentHoveredIndex === null) return 1;
    
    const distance = Math.abs(index - currentHoveredIndex);
    if (distance === 0) return 1.2; // Main hovered item - reduced from 1.4
    if (distance === 1) return 1.1; // Adjacent items - reduced from 1.2
    return 1; // Normal size
  };

  const toggleMenu = () => {
    setOpen(!open);
    setIsHovered(false);
    setActiveDropdown(null);
  };

  const closeMenu = () => {
    setOpen(false);
    setIsHovered(false);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (index) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === index ? null : index);
    } else {
      // Desktop click functionality
      setDropdownType('click');
      setActiveDropdown(activeDropdown === index ? null : index);
      setHoveredIndex(null); // Clear hover state when clicking
    }
  };

  const menuItems = [
    {
      name: 'Home',
      link: '/',
      icon: <FaHome />,
      submenu: [
        { name: 'Overview', link: '/overview', icon: <FaEye /> },
        { name: 'Success Stories', link: '/success-stories', icon: <FaTrophy /> },
        { name: 'Promotions', link: '/promotions', icon: <FaTags /> }
      ],
    },
    {
      name: 'About',
      link: '/about',
      icon: <FaInfoCircle />,
      submenu: [
        { name: 'Our Story', link: '/our-story', icon: <FaBook /> },
        { name: 'Meet The Team', link: '/meet-the-team', icon: <FaUserFriends /> },
        { name: 'Our Facilities', link: '/our-facilities', icon: <FaWarehouse /> }
      ],
    },
    {
      name: 'Classes',
      link: '/classes',
      icon: <FaDumbbell />,
      submenu: [
        { name: 'Strength Training', link: '/strength-training', icon: <FaWeight /> },
        { name: 'Yoga Classes', link: '/yoga-classes', icon: <FaHeart /> },
        { name: 'Cardio Blast', link: '/cardio-blast', icon: <FaRunning /> },
        { name: 'Crossfit Sessions', link: '/crossfit-sessions', icon: <FaCrosshairs /> }
      ],
    },
    {
      name: 'Trainers',
      link: '/trainers',
      icon: <FaUsers />,
      submenu: [
        { name: 'Personal Trainers', link: '/personal-trainers', icon: <FaUser /> },
        { name: 'Nutrition Experts', link: '/nutrition-experts', icon: <FaAppleAlt /> },
        { name: 'Physiotherapists', link: '/physiotherapists', icon: <FaStethoscope /> }
      ],
    },
    {
      name: 'Membership',
      link: '/membership',
      icon: <FaCreditCard />,
      submenu: [
        { name: 'Plans & Pricing', link: '/plans-pricing', icon: <FaDollarSign /> },
        { name: 'Corporate Membership', link: '/corporate-membership', icon: <FaBuilding /> },
        { name: 'Family Packages', link: '/family-packages', icon: <FaFamily /> }
      ],
    },
    {
      name: 'Schedule',
      link: '/schedule',
      icon: <FaCalendarAlt />,
      submenu: [
        { name: 'Class Schedule', link: '/class-schedule', icon: <FaClock /> },
        { name: 'Trainer Availability', link: '/trainer-availability', icon: <FaUserCheck /> },
        { name: 'Events Calendar', link: '/events-calendar', icon: <FaCalendar /> }
      ],
    },
    {
      name: 'Contact',
      link: '/contact',
      icon: <FaEnvelope />,
      submenu: [
        { name: 'Contact Form', link: '/contact-form', icon: <FaEdit /> },
        { name: 'Location & Map', link: '/location-map', icon: <FaMapMarkerAlt /> },
        { name: 'FAQs', link: '/faqs', icon: <FaQuestionCircle /> }
      ],
    },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="w-12 h-12 bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg hover:from-amber-600 hover:to-rose-600 transition-all duration-200 hover:scale-105 rounded-full border-0 outline-none"
          style={{
            outline: 'none',
            border: 'none',
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            borderRadius: '50%'
          }}
        >
          {open ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Desktop Floating Hamburger Icon - Bottom Center - Smaller */}
      {!open && !isHovered && !isMobile && (
        <div 
          className="hidden md:block fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          onMouseEnter={() => setIsHovered(true)}
        >
          <div 
            className="w-10 h-10 bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg cursor-pointer hover:from-amber-600 hover:to-rose-600 transition-all duration-200 hover:scale-105"
            style={{ borderRadius: '50%' }}
          >
            <FaBars className="text-lg" />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {open && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Sidebar Menu */}
      {isMobile && (
        <nav
          className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-45 bg-gradient-to-b from-black to-gray-900 shadow-2xl transform transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
        >
          {/* Mobile Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img
                  src="/images/Logo.png"
                  alt="Power Point Gym Logo"
                  className="rounded-full bg-white w-10 h-10"
                />
                <span className="text-base font-bold text-yellow-400">Power Point Gym</span>
              </div>
              <button
                onClick={closeMenu}
                className="text-white hover:text-yellow-400 p-1"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-white/10">
                <div 
                  className="flex items-center justify-between px-4 py-3 text-white hover:bg-white/5 cursor-pointer"
                  onClick={() => {
                    // Always navigate to the page
                    navigate(item.link);
                    closeMenu();
                    
                    // If it has submenu, also toggle dropdown
                    if (item.submenu && item.submenu.length > 0) {
                      setTimeout(() => handleDropdownClick(index), 100);
                    }
                  }}
                >
                  <div className="flex items-center gap-3 text-base font-semibold text-white hover:text-yellow-400 transition-colors">
                    <span className="text-yellow-400">{item.icon}</span>
                    {item.name}
                  </div>
                  {item.submenu && item.submenu.length > 0 && (
                    <span 
                      className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownClick(index);
                      }}
                    >
                      ▼
                    </span>
                  )}
                </div>
                
                {/* Mobile Submenu */}
                {activeDropdown === index && item.submenu && (
                  <div className="bg-white/5 border-t border-white/10">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="flex items-center gap-3 px-6 py-2 text-white/80 hover:text-yellow-400 hover:bg-white/5 transition-colors border-l-4 border-transparent hover:border-yellow-400"
                        onClick={closeMenu}
                      >
                        <span className="text-yellow-400/70">{subItem.icon}</span>
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}

      {/* Desktop Compact Navbar - Better hover area */}
      <nav
        className={`hidden md:block fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 bg-gradient-to-r from-[#000000]/95 via-[#1f1f1f]/85 to-[#000000]/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
          isHovered || open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } rounded-t-xl border-t border-l border-r border-amber-500/30`}
        style={{ 
          transitionProperty: 'opacity, transform',
          height: isHovered || open ? 'auto' : '0',
          minHeight: isHovered || open ? '60px' : '0',
          padding: isHovered || open ? '12px 20px 16px' : '0'
        }}
        aria-label="Main navigation"
        onMouseLeave={(e) => {
          if (dropdownType !== 'click') {
            // Check if mouse is going to submenu area
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseY = e.clientY;
            
            if (mouseY < rect.top - 10) {
              // Mouse going up to submenu area, don't close
              return;
            }
            
            setTimeout(() => {
              // Double check if not hovering submenu
              const submenuHovered = document.querySelector('.submenu-container:hover');
              if (!submenuHovered) {
                setIsHovered(false);
                setHoveredIndex(null);
              }
            }, 150);
          }
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="flex justify-center items-end">
          {/* Desktop Navigation Items - Compact Dock Style */}
          <ul className="flex justify-center items-end gap-8 py-2">
            {menuItems.map((item, index) => {
              const scale = calculateScale(index, hoveredIndex);
              const isItemHovered = hoveredIndex === index;
              
              return (
                <li
                  key={index}
                  className="relative flex flex-col items-center dock-item"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    ...{
                      transform: `scale(${scale}) translateY(${isHovered ? '-14px' : '0'})`,
                      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: isHovered ? 10 : 1,
                      cursor: 'pointer'
                    }
                  }}
                 onClick={() => {
                    // Navigate to the page regardless of submenu
                    navigate(item.link);
                    setOpen(false);
                    setIsHovered(false);
                    setHoveredIndex(null);
                  }}
                >
                  {/* Icon Container with ring and shadow */}
                  <div className={`mb-1 p-2 rounded-xl transition-all duration-300 ${
                    isItemHovered 
                      ? 'bg-gradient-to-br from-amber-400 to-rose-500 shadow-lg shadow-amber-500/40' 
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-amber-500/20 hover:to-rose-500/20'
                  }`}>
                    <span className={`text-lg transition-all duration-300 ${
                      isItemHovered ? 'text-white' : 'text-amber-300'
                    }`}>
                      {item.icon}
                    </span>
                  </div>
                  
                  {/* Label */}
                  <span
                    className={`text-center font-bold transition-all duration-300 whitespace-nowrap ${
                      isHovered 
                        ? 'text-white text-base drop-shadow-lg' 
                        : 'text-amber-300 text-xs hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                  
                  {/* Submenu Dropdown - Improved Hover */}
                  {((hoveredIndex === index && dropdownType === 'hover') || (activeDropdown === index && dropdownType === 'click')) && item.submenu && (
                    <div 
                      className="submenu-container absolute bottom-full mb-1 bg-white/98 backdrop-blur-sm rounded-xl p-3 shadow-xl min-w-52 z-50 border border-amber-200 pointer-events-auto"
                      style={{
                        animation: 'dockPopup 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                      onMouseEnter={() => {
                        if (dropdownType === 'hover') {
                          setHoveredIndex(index);
                          setIsHovered(true);
                        }
                      }}
                      onMouseLeave={() => {
                        if (dropdownType === 'hover') {
                          setTimeout(() => {
                            setHoveredIndex(null);
                          }, 100);
                        }
                      }}
                    >
                      {/* Arrow with better gap handling */}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-amber-200"></div>
                      
                      {/* Invisible bridge for smooth hover */}
                      <div className="absolute -bottom-2 left-0 right-0 h-2 bg-transparent"></div>
                      
                      {/* Header with close button for click mode */}
                      <div className="text-center mb-2 pb-2 border-b border-amber-200">
                        <div className="flex items-center justify-between text-gray-800">
                          <div className="flex items-center justify-center gap-2 flex-1">
                            <span className="text-amber-500 text-sm">{item.icon}</span>
                            <span className="font-semibold text-sm">{item.name}</span>
                          </div>
                          {dropdownType === 'click' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdown(null);
                                setDropdownType('hover');
                              }}
                              className="text-gray-400 hover:text-gray-600 ml-2"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Submenu Items - Compact */}
                      <div className="space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link 
                            key={subIndex}
                            to={subItem.link} 
                            className="flex items-center gap-2 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-amber-500 hover:to-rose-500 py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium group text-sm cursor-pointer"
                            onClick={() => {
                              navigate(subItem.link);
                              setOpen(false);
                              setIsHovered(false);
                              setHoveredIndex(null);
                              setActiveDropdown(null);
                              setDropdownType('hover');
                            }}
                          >
                            <span className="text-amber-500 group-hover:text-white transition-colors text-sm">{subItem.icon}</span>
                            <span className="flex-1">{subItem.name}</span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-white text-xs">→</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Compact CSS Animations */}
      <style jsx="true">{`
        @keyframes dockPopup {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.9);
          }
          60% {
            opacity: 0.8;
            transform: translateX(-50%) translateY(-2px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        
        .dock-item {
          transform-origin: bottom center;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .dock-item:hover {
          filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.5));
        }
        
        .backdrop-glass {
          backdrop-filter: blur(15px) saturate(180%);
          -webkit-backdrop-filter: blur(15px) saturate(180%);
        }
      `}</style>
    </>
  );
}