import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaDumbbell,
  FaUserPlus,
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaUsers
} from 'react-icons/fa';

export default function Sidebar({ links = [], onLoginClick, onRegisterClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  
  // Check if user is logged in
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const userRole = localStorage.getItem('role');

  // Navigation links for slider options
  const navLinks = [
    { href: '/', label: 'Home', icon: <FaHome className="text-amber-400" /> },
    { href: '/about', label: 'About', icon: <FaUser className="text-rose-400" /> },
    { href: '/classes', label: 'Classes', icon: <FaCalendarAlt className="text-indigo-400" /> },
    { href: '/trainers', label: 'Trainers', icon: <FaUsers className="text-green-400" /> },
    { href: '/membership', label: 'Membership', icon: <FaCreditCard className="text-emerald-400" /> },
  ];

  // Animate items when sidebar opens
  useEffect(() => {
    if (isHovered) {
      setAnimateItems(true);
    } else {
      setAnimateItems(false);
    }
  }, [isHovered]);

  // Sidebar content when logged in
  const SidebarContent = ({ isMobile = false }) => (
    <>
      <div className={`transform transition-all duration-500 ${animateItems || isMobile ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        {/* Logo or Brand with 3D effect */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg hover:shadow-2xl"
            >
            <img 
              src="./images/Logo.png" 
              alt="Power Point Gym Logo" 
              className="w-full h-full object-contain rounded-full"
            />
              
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-rose-500  bg-clip-text text-transparent animate-pulse">
              Power Point
            </span>
            <span className="text-xs text-gray-400 font-medium">Premium Fitness</span>
          </div>
        </Link>
      </div>
      
      <div className={`space-y-4 transform transition-all duration-700 ${
        animateItems || isMobile ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        {/* User info card or Login/Register buttons */}
        {isAuthenticated ? (
          <>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                  {localStorage.getItem('userName')?.[0] || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {localStorage.getItem('userName') || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {localStorage.getItem('role') || 'Member'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Logout button */}
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
                navigate('/');
              }}
              className="w-full relative flex items-center justify-center space-x-3 py-4 px-4 bg-gray-800/50 hover:bg-red-900/30 rounded-xl transition-all duration-300 text-gray-300 hover:text-white group overflow-hidden border border-gray-700/50 hover:border-red-500/50 focus:outline-none"
              style={{
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <FaSignOutAlt className="text-rose-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="font-medium relative z-10">Logout</span>
            </button>
          </>
        ) : (
          <>
            {/* Login button */}
            <button
              onClick={onLoginClick || (() => navigate('/login'))}
              className="w-full relative flex items-center justify-center space-x-3 py-4 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 text-white group overflow-hidden shadow-lg hover:shadow-blue-500/25 focus:outline-none"
              style={{
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <FaSignInAlt className="text-white group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="font-medium relative z-10">Login</span>
            </button>
            
            {/* Register button */}
            <button
              onClick={onRegisterClick || (() => navigate('/register'))}
              className="w-full relative flex items-center justify-center space-x-3 py-4 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl transition-all duration-300 text-white group overflow-hidden shadow-lg hover:shadow-green-500/25 focus:outline-none"
              style={{
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <FaUserPlus className="text-white group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="font-medium relative z-10">Register</span>
            </button>
          </>
        )}
        
        {/* Footer */}
        <div className="text-gray-500 text-xs text-center border-t border-gray-700/50 pt-4 backdrop-blur-sm">
          <div className="bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent font-medium">
            &copy; {new Date().getFullYear()} Power Point Gym
          </div>
          <div className="mt-1 text-gray-600">Premium Fitness Experience</div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Hover Icon - Enhanced with 3D effect */}
      {!isHovered && (
        <div 
          className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40 group"
          onMouseEnter={() => setIsHovered(true)}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>
            
            {/* Main button */}
            <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 group-hover:shadow-2xl">
              <FaUser className="text-lg group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Sidebar - Enhanced with backdrop blur and 3D effects */}
      <aside 
        className={`bg-gray-900/95 backdrop-blur-xl text-white w-64 h-auto min-h-fit max-h-screen p-6 hidden lg:flex flex-col shadow-2xl fixed left-0 top-1/2 -translate-y-1/2 z-30 transform transition-all duration-500 ease-out border border-gray-700/50 rounded-r-2xl ${
          isHovered ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50 rounded-r-2xl"></div>
        <div className="relative z-10 flex flex-col space-y-6">
          <SidebarContent />
        </div>
      </aside>
      
      {/* Mobile Sidebar Toggle - Enhanced */}
      {!showMobileSidebar && (
        <button
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          className="lg:hidden fixed bottom-6 left-6 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 rounded-full text-white shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-110 group overflow-hidden focus:outline-none"
          style={{ 
            borderRadius: '50%', 
            outline: 'none', 
            border: 'none',
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none'
          }}>
       <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-rose-500 to-amber-500 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
          <div className="relative z-10 transform transition-transform duration-300">
            <FaUser className="text-xl group-hover:scale-110 transition-transform duration-300" />
          </div>
        </button>
      )}
      
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}
      
      {/* Mobile Sidebar - Enhanced and Compact */}
      <aside 
        className={`bg-gray-900/95 backdrop-blur-xl text-white w-72 h-auto min-h-fit max-h-screen p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transform transition-all duration-500 ease-out lg:hidden flex flex-col shadow-2xl border border-gray-700/50 rounded-2xl ${
          showMobileSidebar ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50 rounded-2xl"></div>
        <div className="relative z-10 flex flex-col space-y-6">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMobileSidebar(false);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMobileSidebar(false);
            }}
            className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center text-white text-xl bg-red-500 hover:bg-red-600 rounded-full transition-all duration-150 hover:scale-105 shadow-xl border-2 border-white/20 focus:outline-none active:scale-90 z-50"
            style={{
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              touchAction: 'manipulation'
            }}
          >
            <FaTimes className="pointer-events-none" />
          </button>
          <SidebarContent isMobile={true} />
        </div>
      </aside>
    </>
  );
}
