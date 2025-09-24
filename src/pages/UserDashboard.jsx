import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, Dumbbell, CreditCard,
  Check, User as UserIcon, Headphones, AlertCircle,
  ArrowRight, Star, Activity, Users as UsersIcon,
  Zap, BookOpen, MapPin, Phone, X, RefreshCw,
  CheckCircle, XCircle
} from 'lucide-react';

function UserDashboard() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [user, setUser] = useState(null);

  // Dashboard data
  const [userStats, setUserStats] = useState({
    upcomingBookings: 0,
    completedBookings: 0,
    membershipStatus: 'inactive',
    membershipName: '',
    membershipEndDate: null,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);

  useEffect(() => setIsVisible(true), []);

  // Fetch current user using cookie-based auth
  const fetchCurrentUser = async () => {
    try {
  const res = await axios.get(`${API_BASE}/api/auth/user`, { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      // Not logged in -> go to login
      navigate('/login');
      throw err;
    }
  };

  // Placeholder: fetch bookings (not implemented in backend yet)
  const fetchUserBookings = async () => {
    // When bookings API exists, populate from server
    setBookedClasses([]);
    setRecentBookings([]);
    setUserStats(prev => ({ ...prev, upcomingBookings: 0, completedBookings: 0 }));
  };

  // Placeholder: fetch membership/profile (not in model by default)
  const fetchUserProfile = async () => {
    setUserStats(prev => ({ ...prev, membershipStatus: 'inactive', membershipName: '', membershipEndDate: null }));
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        await fetchCurrentUser();
        await Promise.all([fetchUserBookings(), fetchUserProfile()]);
      } catch (e) {
        // navigation handled above
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    // Hook this to backend when available
    setCancellingBooking(bookingId);
    setTimeout(() => setCancellingBooking(null), 800);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE}/api/auth/logout`, { withCredentials: true });
    } catch (e) {
      // ignore backend failure; still clear client state
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      // Redirect to home instead of login (user asked why login screen shows)
      navigate('/');
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'confirmed':
        return { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: <CheckCircle className="w-4 h-4" />, text: 'Confirmed' };
      case 'completed':
        return { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: <CheckCircle className="w-4 h-4" />, text: 'Completed' };
      case 'cancelled':
        return { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: <XCircle className="w-4 h-4" />, text: 'Cancelled' };
      default:
        return { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: <Clock className="w-4 h-4" />, text: 'Unknown' };
    }
  };

  const canCancelBooking = (booking) => {
    if (booking.status !== 'confirmed') return false;
    // 24h cutoff placeholder
    const bookingDate = new Date(booking.date);
    const cutoff = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return bookingDate > cutoff;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto p-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Top bar with Logout */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow hover:from-red-500 hover:to-pink-500 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
        {/* Welcome Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Welcome Back</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Hello,
            <span className="block bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              {user?.name || 'User'}!
            </span>
          </h1>
          <p className="text-xl text-white/80">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-500/20 border border-red-500/50 text-red-300 p-6 rounded-xl backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-medium">{error}</p>
                <button onClick={() => setError('')} className="mt-2 text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">Dismiss</button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Upcoming Classes" value={userStats.upcomingBookings} icon={<Calendar className="w-6 h-6" />} gradient="from-blue-500/20 to-cyan-500/20" borderColor="border-blue-500/30" link="/classes" />
          <StatCard title="Completed Classes" value={userStats.completedBookings} icon={<Check className="w-6 h-6" />} gradient="from-green-500/20 to-emerald-500/20" borderColor="border-green-500/30" />
          <StatCard title="Membership Status" value={userStats.membershipStatus.charAt(0).toUpperCase() + userStats.membershipStatus.slice(1)} icon={<CreditCard className="w-6 h-6" />} gradient={userStats.membershipStatus === 'active' ? 'from-green-500/20 to-emerald-500/20' : 'from-red-500/20 to-pink-500/20'} borderColor={userStats.membershipStatus === 'active' ? 'border-green-500/30' : 'border-red-500/30'} link="/membership" />
          <StatCard title="Next Workout" value="Schedule Now" icon={<Dumbbell className="w-6 h-6" />} gradient="from-purple-500/20 to-pink-500/20" borderColor="border-purple-500/30" link="/schedule" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Membership Details */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-yellow-400" />
              Membership Details
            </h2>

            {userStats.membershipStatus === 'active' ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-white mb-2">{userStats.membershipName || 'Premium Plan'}</p>
                      <p className="text-green-400 font-medium">Active Membership</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/70">Expires On</p>
                      <p className="text-lg font-bold text-white">{userStats.membershipEndDate ? new Date(userStats.membershipEndDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link to="/membership" className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-3 px-6 rounded-xl font-semibold hover:scale-105 transition-transform text-center">View Details</Link>
                  <Link to="/membership" className="flex-1 border-2 border-yellow-400 text-yellow-400 py-3 px-6 rounded-xl font-semibold hover:bg-yellow-400 hover:text-black transition-all text-center">Upgrade Plan</Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-500/30">
                  <CreditCard className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Active Membership</h3>
                <p className="text-white/70 mb-8 max-w-md mx-auto">Get started with one of our membership plans to access all gym facilities and classes.</p>
                <Link to="/membership" className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2">
                  Browse Plans
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              Quick Actions
            </h2>
            <div className="space-y-4">
              <QuickActionItem to="/classes" icon={<Calendar className="w-5 h-5" />} title="Book a Class" description="Reserve your spot" gradient="from-blue-500/20 to-cyan-500/20" iconColor="text-blue-400" />
              <QuickActionItem to="/schedule" icon={<Clock className="w-5 h-5" />} title="View Schedule" description="Check class times" gradient="from-green-500/20 to-emerald-500/20" iconColor="text-green-400" />
              <QuickActionItem to="/profile" icon={<UserIcon className="w-5 h-5" />} title="Update Profile" description="Manage your info" gradient="from-yellow-500/20 to-amber-500/20" iconColor="text-yellow-400" />
              <QuickActionItem to="/contact" icon={<Headphones className="w-5 h-5" />} title="Contact Support" description="Get help" gradient="from-red-500/20 to-pink-500/20" iconColor="text-red-400" />
            </div>
          </div>
        </div>

        {/* My Booked Classes */}
        <div className="mb-12 bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-yellow-400" />
              My Booked Classes
            </h2>
            <div className="flex gap-3">
              <button onClick={fetchUserBookings} disabled={loading} className="text-yellow-400 hover:text-amber-500 font-semibold flex items-center gap-2 transition-colors px-4 py-2 bg-white/5 rounded-lg border border-white/10 disabled:opacity-50">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <Link to="/classes" className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2">
                Book New Class
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {bookedClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookedClasses.map((booking) => {
                const statusConfig = getStatusConfig(booking.status);
                const canCancel = canCancelBooking(booking);
                return (
                  <div key={booking._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                          <Dumbbell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{booking.className}</h3>
                          <p className="text-sm text-white/70">{booking.class?.category || 'Fitness'}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color} flex items-center gap-1`}>
                        {statusConfig.icon}
                        {statusConfig.text}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-white/80">
                        <Calendar className="w-4 h-4 mr-3 text-blue-400" />
                        <span className="text-sm">{new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} • {booking.day}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Clock className="w-4 h-4 mr-3 text-green-400" />
                        <span className="text-sm">{booking.time}</span>
                      </div>
                      {booking.class?.trainer && (
                        <div className="flex items-center text-white/80">
                          <UserIcon className="w-4 h-4 mr-3 text-purple-400" />
                          <span className="text-sm">{booking.class.trainer.name}</span>
                        </div>
                      )}
                      {booking.class?.location && (
                        <div className="flex items-center text-white/80">
                          <MapPin className="w-4 h-4 mr-3 text-red-400" />
                          <span className="text-sm">{booking.class.location}</span>
                        </div>
                      )}
                      <div className="flex items-center text-white/80">
                        <UsersIcon className="w-4 h-4 mr-3 text-orange-400" />
                        <span className="text-sm">{booking.participants || 1} participant(s)</span>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-xs text-white/70 mb-1">Special Requests:</p>
                        <p className="text-sm text-white">{booking.specialRequests}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {canCancel && (
                        <button onClick={() => handleCancelBooking(booking._id)} disabled={cancellingBooking === booking._id} className="flex-1 bg-red-600/20 border border-red-500/30 text-red-400 py-2 px-4 rounded-lg hover:bg-red-600/30 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                          {cancellingBooking === booking._id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                          Cancel
                        </button>
                      )}
                      {booking.class?.trainer?.phone && (
                        <button className="flex-1 bg-blue-600/20 border border-blue-500/30 text-blue-400 py-2 px-4 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contact
                        </button>
                      )}
                      {!canCancel && booking.status === 'confirmed' && (
                        <div className="flex-1 bg-green-600/20 border border-green-500/30 text-green-400 py-2 px-4 rounded-lg text-sm font-semibold text-center">Ready to Attend</div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/50">Booking ID: {booking._id}</p>
                      <p className="text-xs text-white/50">Booked: {new Date(booking.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-500/30">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Booked Classes</h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">You haven't booked any classes yet. Browse our available classes and reserve your spot!</p>
              <Link to="/classes" className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2">
                Browse Classes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {recentBookings.length > 0 && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Activity className="w-8 h-8 text-yellow-400" />
                Recent Activity
              </h2>
              <Link to="/classes" className="text-yellow-400 hover:text-amber-500 font-semibold flex items-center gap-2 transition-colors">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => {
                const statusConfig = getStatusConfig(booking.status);
                return (
                  <div key={booking._id} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                        <Dumbbell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{booking.className}</h3>
                        <p className="text-white/70">{new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} • {booking.time}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusConfig.color} flex items-center gap-2`}>
                      {statusConfig.icon}
                      {statusConfig.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, gradient, borderColor, link }) {
  const content = (
    <div className={`bg-gradient-to-br ${gradient} backdrop-blur-lg border ${borderColor} rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group`}>
      <div className="flex items-center">
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm mr-4 group-hover:scale-110 transition-transform">{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-white/70 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
  return link ? <Link to={link}>{content}</Link> : content;
}

function QuickActionItem({ to, icon, title, description, gradient, iconColor }) {
  return (
    <Link to={to} className={`flex items-center p-4 bg-gradient-to-r ${gradient} rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105`}>
      <div className={`${iconColor} mr-4 group-hover:scale-110 transition-transform`}>{icon}</div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-white/50 ml-auto group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

export default UserDashboard;