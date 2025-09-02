import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPage = () => {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: contact info, 2: otp + new password
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isPhoneNumber = (value) => {
    return /^[0-9]{10}$/.test(value);
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!isEmail(contactInfo) && !isPhoneNumber(contactInfo)) {
      setMessage("Please enter a valid email or 10-digit phone number");
      setIsLoading(false);
      return;
    }

    try {
      // First attempt with the original method
      const method = isEmail(contactInfo) ? "email" : "phone";
      try {
        const response = await axios.post("http://localhost:3000/api/auth/request-reset", {
          email: isEmail(contactInfo) ? contactInfo : undefined,
          phone: isPhoneNumber(contactInfo) ? contactInfo : undefined,
          method: method
        });
        
        // Show OTP in alert for testing
        if (response.data.otp) {
          alert(`Your OTP is: ${response.data.otp}`);
        }
        
        setMessage(response.data.message);
        setStep(2);
      } catch (error) {
        // If phone method failed, automatically try email
        if (method === "phone" && error.response?.data?.message?.includes("SMS failed")) {
          try {
            setMessage("SMS delivery failed. Attempting to send OTP via email...");
            const emailResponse = await axios.post("http://localhost:3000/api/auth/request-reset", {
              method: "email",
              phone: contactInfo, // Send phone number so backend can lookup associated email
              useEmailFallback: true // Signal backend to use email fallback
            });
            setMessage(emailResponse.data.message);
            setStep(2);
            return;
          } catch (emailError) {
            throw new Error("Both SMS and email delivery failed. Please try again later.");
          }
        }
        throw error; // Re-throw if it's not a SMS failure or if email method failed
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:3000/api/auth/reset-password", {
        email: isEmail(contactInfo) ? contactInfo : undefined,
        phone: isPhoneNumber(contactInfo) ? contactInfo : undefined,
        otp,
        newPassword
      });
      
      setMessage("Password reset successful!");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Password reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100/95 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative border border-gray-200">
        <button 
          onClick={() => navigate('/login')} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {message && (
          <div className={`p-3 rounded-lg text-sm mb-4 ${
            message.includes("successful") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter email or phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
              value={contactInfo}
              onChange={(e) => {
                setContactInfo(e.target.value);
                setMessage("");
              }}
              required
            />

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-700 mt-4">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-gray-900 hover:text-gray-800 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgetPage;
