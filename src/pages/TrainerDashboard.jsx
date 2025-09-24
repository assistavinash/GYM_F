import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import Footer from '../components/layout/Footer';

function TrainerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [classes, setClasses] = useState([]);
  
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    type: '',
    duration: '',
    capacity: '',
    scheduleDate: '',
    scheduleTime: ''
  });
  // Edit modal state
  const [showEditClass, setShowEditClass] = useState(false);
  const [editClassData, setEditClassData] = useState({
    id: '',
    name: '',
    type: '',
    duration: '',
    capacity: '',
    scheduleDate: '',
    scheduleTime: ''
  });

  const [trainerProfile, setTrainerProfile] = useState({
    name: localStorage.getItem('userName') || 'Trainer',
    email: 'trainer@gym.com',
    specialty: 'Fitness Training',
    experience: '5+ Years',
    certifications: ['NASM-CPT', 'First Aid Certified'],
    bio: 'Passionate about helping clients achieve their fitness goals.',
    totalClasses: 3,
    totalStudents: 35,
    rating: 4.8
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || '';
        const response = await axios.get(`${API_BASE}/api/classes`);
        const data = response.data; // Extract data from response
        const mapped = Array.isArray(data) ? data.map(backendClass => ({
          id: backendClass._id || backendClass.id,
          name: backendClass.name,
          type: backendClass.description,
          duration: backendClass.duration,
          capacity: backendClass.capacity,
          enrolled: backendClass.enrolled || 0,
          schedule: Array.isArray(backendClass.schedule)
            ? backendClass.schedule.map(s => `${s.day} - ${s.startTime} to ${s.endTime}`).join(', ')
            : backendClass.schedule,
          status: backendClass.status || 'active'
        })) : [];
        setClasses(mapped);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };
    fetchClasses();
  }, []);

  const handleAddClass = async () => {
    if (newClass.name && newClass.type && newClass.duration && newClass.capacity && newClass.scheduleDate && newClass.scheduleTime) {
      try {
        // Calculate day from date
        const dateObj = new Date(newClass.scheduleDate);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[dateObj.getDay()];
        const startTime = newClass.scheduleTime;
        let endTime = startTime;
        let durationMinutes = 0;
        if (newClass.duration) {
          const [startHour, startMin] = startTime.split(':').map(Number);
          const [durHour, durMin] = newClass.duration.split(':').map(Number);
          durationMinutes = (durHour || 0) * 60 + (durMin || 0);
          let endHour = startHour + (durHour || 0);
          let endMin = startMin + (durMin || 0);
          if (endMin >= 60) {
            endHour += Math.floor(endMin / 60);
            endMin = endMin % 60;
          }
          endTime = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
        }
        const scheduleArr = [{
          day,
          startTime,
          endTime
        }];
        // Convert duration to "X minutes" string
        const durationStr = durationMinutes ? `${durationMinutes} minutes` : '';
        const classData = {
          name: newClass.name,
          description: newClass.type,
          schedule: scheduleArr,
          trainer: localStorage.getItem('userId'),
          duration: durationStr,
          capacity: parseInt(newClass.capacity)
        };
        console.log('Class payload:', classData);
  const API_BASE = import.meta.env.VITE_API_URL || '';
  const res = await axios.post(`${API_BASE}/api/classes`, classData, { withCredentials: true });
        setShowAddClass(false);
        setNewClass({
          name: '',
          type: '',
          duration: '',
          capacity: '',
          scheduleDate: '',
          scheduleTime: ''
        });
        // Refetch classes
        const updated = await axios.get(`${API_BASE}/api/classes`);
        const mapped = Array.isArray(updated.data) ? updated.data.map(backendClass => ({
          id: backendClass._id || backendClass.id,
          name: backendClass.name,
          type: backendClass.description,
          duration: backendClass.duration,
          capacity: backendClass.capacity,
          enrolled: backendClass.enrolled || 0,
          schedule: Array.isArray(backendClass.schedule)
            ? backendClass.schedule.map(s => `${s.day} - ${s.startTime} to ${s.endTime}`).join(', ')
            : backendClass.schedule,
          status: backendClass.status || 'active'
        })) : [];
        setClasses(mapped);
      } catch (error) {
        console.error('Create class error:', error);
        if (error.response) {
          console.error('Backend response:', error.response.data);
        }
        alert('Failed to create class: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleDeleteClass = (classId) => {
    setClasses(classes.filter(cls => cls.id !== classId));
  };

  const handleToggleClassStatus = (classId) => {
    setClasses(classes.map(cls => 
      cls.id === classId 
        ? { ...cls, status: cls.status === 'active' ? 'inactive' : 'active' }
        : cls
    ));
  };

  // Handler to open edit modal and populate data
  const handleOpenEditClass = (classItem) => {
    setEditClassData({
      id: classItem.id,
      name: classItem.name,
      type: classItem.type,
      duration: classItem.duration,
      capacity: classItem.capacity,
      scheduleDate: '', // You may want to parse from classItem.schedule
      scheduleTime: ''  // You may want to parse from classItem.schedule
    });
    setShowEditClass(true);
  };

  // Handler to update class
  const handleEditClass = async () => {
    if (editClassData.name && editClassData.type && editClassData.duration && editClassData.capacity) {
      try {
        // Prepare payload for backend
        const payload = {
          name: editClassData.name,
          description: editClassData.type,
          duration: editClassData.duration,
          capacity: parseInt(editClassData.capacity)
          // Add other fields as needed
        };
        const API_BASE = import.meta.env.VITE_API_URL || '';
        await axios.put(`${API_BASE}/api/classes/${editClassData.id}`, payload, { withCredentials: true });
        setShowEditClass(false);
        // Refetch classes
        const updated = await axios.get(`${API_BASE}/api/classes`);
        const mapped = Array.isArray(updated.data) ? updated.data.map(backendClass => ({
          id: backendClass._id || backendClass.id,
          name: backendClass.name,
          type: backendClass.description,
          duration: backendClass.duration,
          capacity: backendClass.capacity,
          enrolled: backendClass.enrolled || 0,
          schedule: Array.isArray(backendClass.schedule)
            ? backendClass.schedule.map(s => `${s.day} - ${s.startTime} to ${s.endTime}`).join(', ')
            : backendClass.schedule,
          status: backendClass.status || 'active'
        })) : [];
        setClasses(mapped);
      } catch (error) {
        alert('Failed to update class: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-20 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Trainer Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/5 backdrop-blur-lg rounded-2xl p-1 mb-8 border border-white/10">
          {[
            { id: 'profile', name: 'Profile', icon: '👨‍🏫' },
            { id: 'classes', name: 'My Classes', icon: '📚' },
            { id: 'students', name: 'Students', icon: '👥' },
            { id: 'schedule', name: 'Schedule', icon: '📅' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-yellow-400/50 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <span className="text-6xl">👨‍🏫</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{trainerProfile.name}</h2>
                    <p className="text-yellow-400 font-semibold mb-4">{trainerProfile.specialty}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.floor(trainerProfile.rating) ? 'text-yellow-400' : 'text-gray-400'}`}>⭐</span>
                        ))}
                      </div>
                      <span className="text-white text-sm font-medium">{trainerProfile.rating}</span>
                    </div>

                    <p className="text-white/80 text-sm mb-6">{trainerProfile.bio}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">{trainerProfile.totalClasses}</div>
                        <div className="text-xs text-white/60">Classes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-amber-400">{trainerProfile.totalStudents}</div>
                        <div className="text-xs text-white/60">Students</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">{trainerProfile.experience}</div>
                        <div className="text-xs text-white/60">Experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/60 text-sm">Email</label>
                      <p className="text-white">{trainerProfile.email}</p>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">Specialty</label>
                      <p className="text-white">{trainerProfile.specialty}</p>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">Experience</label>
                      <p className="text-white">{trainerProfile.experience}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {trainerProfile.certifications.map((cert, idx) => (
                      <span key={`speciality-${idx}`} className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm border border-yellow-400/30">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              {/* Add Class Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">My Classes</h2>
                <button
                  onClick={() => setShowAddClass(true)}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  + Add New Class
                </button>
              </div>

              {/* Classes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                  <div key={classItem.id} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{classItem.name}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleClassStatus(classItem.id)}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            classItem.status === 'active' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {classItem.status}
                        </button>
                        <button
                          onClick={() => handleDeleteClass(classItem.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-yellow-400 font-medium">{classItem.type}</p>
                      <p className="text-white/60 text-sm">⏱️ {classItem.duration}</p>
                      <p className="text-white/60 text-sm">📅 {classItem.schedule}</p>
                      <p className="text-white/60 text-sm">👥 {classItem.enrolled}/{classItem.capacity} enrolled</p>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                      ></div>
                    </div>

                    <button
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium transition-all duration-200"
                      onClick={() => handleOpenEditClass(classItem)}
                    >
                      Edit Class
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">My Students</h2>
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">👥</span>
                <p className="text-white/60">Student management feature coming soon!</p>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Weekly Schedule</h2>
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📅</span>
                <p className="text-white/60">Schedule management feature coming soon!</p>
              </div>
            </div>
          )}
        </div>

        {/* Add Class Modal */}
        {showAddClass && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Add New Class</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Class Name</label>
                  <input
                    type="text"
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
                    placeholder="Enter class name"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Class Type</label>
                  <select
                    value={newClass.type}
                    onChange={(e) => setNewClass({...newClass, type: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select type</option>
                    <option value="Yoga">Yoga</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Strength">Strength Training</option>
                    <option value="Cardio">Cardio</option>
                    <option value="CrossFit">CrossFit</option>
                    <option value="Pilates">Pilates</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Duration</label>
                  <input
                    type="time"
                    value={newClass.duration}
                    onChange={(e) => setNewClass({...newClass, duration: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Capacity</label>
                  <input
                    type="number"
                    min="1"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
                    placeholder="Maximum students"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Schedule Date</label>
                  <input
                    type="date"
                    value={newClass.scheduleDate}
                    onChange={(e) => setNewClass({...newClass, scheduleDate: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Schedule Time</label>
                  <input
                    type="time"
                    value={newClass.scheduleTime}
                    onChange={(e) => setNewClass({...newClass, scheduleTime: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddClass(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClass}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Class Modal (moved outside map) */}
        {showEditClass && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Edit Class</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Class Name</label>
                  <input
                    type="text"
                    value={editClassData.name}
                    onChange={(e) => setEditClassData({...editClassData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
                    placeholder="Enter class name"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Class Type</label>
                  <select
                    value={editClassData.type}
                    onChange={(e) => setEditClassData({...editClassData, type: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select type</option>
                    <option value="Yoga">Yoga</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Strength">Strength Training</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Duration</label>
                  <input
                    type="text"
                    value={editClassData.duration}
                    onChange={(e) => setEditClassData({...editClassData, duration: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
                    placeholder="e.g. 60 minutes"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Capacity</label>
                  <input
                    type="number"
                    value={editClassData.capacity}
                    onChange={(e) => setEditClassData({...editClassData, capacity: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
                    placeholder="Enter capacity"
                  />
                </div>
                {/* Add more fields as needed */}
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => setShowEditClass(false)}
                >Cancel</button>
                <button
                  className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold"
                  onClick={handleEditClass}
                >Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer (Home page style) */}
      <Footer />
    </div>
  );
}

export default TrainerDashboard;
