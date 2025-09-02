import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear messages on input change
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Phone number validation
      if (!/^[0-9]{10}$/.test(formData.phone)) {
        setError("Please enter a valid 10-digit phone number");
        return;
      }

      const res = await axios.post("http://localhost:3000/api/auth/register", formData);
      
      setSuccess("Registration successful! Logging you in...");
      
      // If registration returns token and user, auto-login
      if (res.data.token && res.data.user) {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.name);
        
        // Close modal and redirect
        onClose();
        setTimeout(() => {
          switch(user.role) {
            case 'admin':
              navigate('/admin');
              break;
            case 'trainer':
              navigate('/trainer');
              break;
            default:
              navigate('/user');
          }
        }, 1500);
      } else {
        // If no auto-login, show success and switch to login
        setTimeout(() => {
          onSwitchToLogin();
        }, 1500);
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    // Backdrop - Full screen overlay with blur
    <div className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50"
         onClick={onClose}>
      {/* Modal */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative border border-gray-200 max-h-[90vh] overflow-y-auto"
           onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white  bg-black hover:text-gray-900 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Register</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (10 digits)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* Role selection removed, default is 'user' */}
          </div>

          <p className="text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-white bg-black font-medium hover:text-black hover:bg-gray-100 hover:underline transition-colors duration-200 ml-10 px-2 py-1 rounded border border-gray-300"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
