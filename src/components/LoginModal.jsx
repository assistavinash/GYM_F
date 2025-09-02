import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      setError("");
      
      // Send the token to your backend
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        credential: credentialResponse.credential
      });

      const { token, user } = res.data;
      
      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);

      // Close modal and redirect based on role
      onClose();
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
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.response?.data?.message || "Failed to login with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password
      });

      const { token, user } = res.data;
      
      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);

      // Close modal and redirect based on role
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
      }, 500);

    } catch (error) {
      console.error("Login error:", error.response?.data);
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
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
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Login</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-sm disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute border-t border-gray-300 w-full"></div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              OR
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              shape="rectangular"
              theme="filled_black"
              text="signin_with"
              size="large"
              useOneTap={false}
              cookiePolicy={'single_host_origin'}
            />
          </div>

          <div className="text-center mt-3">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-gray-600 text-sm hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-gray-900 font-medium hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
