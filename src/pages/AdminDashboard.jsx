import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Tab names for navigation
const TABS = {
  DASHBOARD: 'dashboard',
  CLASSES: 'classes',
  USERS: 'users',
  TRAINERS: 'trainers',
  BOOKINGS: 'bookings',
  MEMBERSHIPS: 'memberships',
};

// Tab configurations
const TAB_CONFIG = {
  [TABS.DASHBOARD]: { title: 'Dashboard Overview', icon: '📊' },
  [TABS.CLASSES]: { title: 'Manage Classes', icon: '🏋️' },
  [TABS.USERS]: { title: 'Manage Users', icon: '👥' },
  [TABS.TRAINERS]: { title: 'Manage Trainers', icon: '👨‍🏫' },
  [TABS.BOOKINGS]: { title: 'Manage Bookings', icon: '📅' },
  [TABS.MEMBERSHIPS]: { title: 'Manage Memberships', icon: '💳' },
};

const INITIAL_STATS = {
  totalUsers: 0,
  newUsersToday: 0,
  newUsersThisMonth: 0,
  activeMembers: 0,
  totalClasses: 0,
  totalBookings: 0,
  revenue: 0,
  recentUsers: [],
  usersByMethod: [],
  membershipStats: [],
  profileCompletionStats: [],
  lastUpdated: null,
};

// Sidebar Link Component
const SidebarLink = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-6 py-3 text-left hover:bg-white/10 transition-colors ${
      active ? 'bg-white/20 border-r-2 border-yellow-400' : ''
    }`}
  >
    <span className="mr-3 text-xl">{icon}</span>
    <span className="font-medium">{text}</span>
  </button>
);

// Dashboard Content Component
const DashboardContent = ({ stats, error, onRetry }) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white/80 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white/80 text-sm font-medium">Active Members</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.activeMembers}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white/80 text-sm font-medium">Total Classes</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalClasses}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white/80 text-sm font-medium">Revenue</h3>
          <p className="text-3xl font-bold text-white mt-2">${stats.revenue}</p>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <p className="text-white/60">Dashboard overview coming soon...</p>
      </div>
    </div>
  );
};

// Users Content Component
const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || '';
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/admin/users`, { withCredentials: true });
      setUsers(res.data || []);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${API_BASE}/api/admin/users/${id}/approve`, {}, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error('Error approving user:', err);
      setError(err.message || 'Failed to approve user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_BASE}/api/admin/users/${id}`, { withCredentials: true });
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
        setError(err.message || 'Failed to delete user');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-xl backdrop-blur-lg">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">All Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full border ${
                        user.isApproved
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}
                    >
                      {user.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {!user.isApproved && (
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(INITIAL_STATS);

  // Check authentication
  useEffect(() => {
    const role = localStorage.getItem('role') || (() => {
      try {
        return JSON.parse(localStorage.getItem('user') || '{}').role;
      } catch {
        return null;
      }
    })();

    if (role !== 'admin') {
      navigate('/login');
      return;
    }

    if (activeTab === TABS.DASHBOARD) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [navigate, activeTab]);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // For now, we'll use mock data since we don't have stats API
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const res = await axios.get(`${API_BASE}/api/admin/users`, { withCredentials: true });
      const data = res.data || [];
      const mockStats = {
        totalUsers: data.length,
        activeMembers: data.filter((u) => u.isApproved).length,
        totalClasses: 12,
        revenue: 5000,
        newUsersToday: 2,
        newUsersThisMonth: 15,
        totalBookings: 45,
        lastUpdated: new Date().toISOString(),
      };

      setStats({
        ...INITIAL_STATS,
        ...mockStats,
      });
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch admin statistics';
      setError(errorMessage);
      console.error('Error fetching admin stats:', err);
      setStats(INITIAL_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      setError('');

      if (tab === TABS.DASHBOARD) {
        fetchStats();
      }
    },
    [fetchStats]
  );

  const handleRetry = useCallback(() => {
    if (activeTab === TABS.DASHBOARD) {
      fetchStats();
    }
  }, [activeTab, fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case TABS.DASHBOARD:
        return <DashboardContent stats={stats} loading={loading && activeTab === TABS.DASHBOARD} error={error} onRetry={handleRetry} />;
      case TABS.USERS:
        return <UsersContent />;
      default:
        return (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">{TAB_CONFIG[activeTab]?.title}</h3>
            <p className="text-white/60">This section is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-black/50 backdrop-blur-lg border-r border-white/10 text-white relative z-10">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-sm text-white/60">Power Point Gym</p>
        </div>

        <nav className="mt-6">
          {Object.entries(TAB_CONFIG).map(([tabKey, config]) => (
            <SidebarLink
              key={tabKey}
              icon={config.icon}
              text={config.title.replace('Manage ', '')}
              active={activeTab === tabKey}
              onClick={() => handleTabChange(tabKey)}
            />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <div style={{ marginBottom: '32px' }}></div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {TAB_CONFIG[activeTab]?.title || 'Dashboard Overview'}
            </h2>
            <div className="text-sm text-white/60">
              Last updated: {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : 'Never'}
            </div>
          </div>
        </header>

        <main className="p-6">
          {error && activeTab === TABS.DASHBOARD && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-xl backdrop-blur-lg flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <p className="font-medium">Error loading admin stats</p>
                <p className="text-sm text-red-200">{error}</p>
                <button
                  onClick={handleRetry}
                  className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors focus:outline-none"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;