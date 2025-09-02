import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpMethod, setOtpMethod] = useState("email");
  const [step, setStep] = useState(1); // 1: contact info, 2: OTP verification
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (step === 1) {
        // Request OTP
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/request-reset`, {
          email: otpMethod === "email" ? email : undefined,
          phone: otpMethod === "phone" ? phone : undefined,
          method: otpMethod
        });
        
        setMessage(res.data.message);
        setStep(2);
      } else {
        // Verify OTP and reset password
  await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
          email: otpMethod === "email" ? email : undefined,
          phone: otpMethod === "phone" ? phone : undefined,
          otp,
          newPassword
        });
        
        setMessage("Password reset successful!");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error("Password reset error:", error.response?.data);
      setMessage(error.response?.data?.message || "Failed to process request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-gray-100/95 flex items-center justify-center">
      {/* Modal */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative border border-gray-200">
        {/* Close button */}
        <button 
          onClick={() => navigate('/login')} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Forgot Password</h2>
          
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes("error") 
                ? "bg-red-100 text-red-700" 
                : "bg-green-100 text-green-700"
            }`}>
              {message}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-4">
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setOtpMethod("email")}
                  className={`flex-1 p-2 rounded-lg border ${
                    otpMethod === "email"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Via Email
                </button>
                <button
                  type="button"
                  onClick={() => setOtpMethod("phone")}
                  className={`flex-1 p-2 rounded-lg border ${
                    otpMethod === "phone"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Via SMS
                </button>
              </div>

              {otpMethod === "email" ? (
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              ) : (
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-gray-50 text-gray-900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  required
                />
              )}

              <button 
                type="submit" 
                className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
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
                className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
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
        </form>
      </div>
    </div>
  );
};

export default ForgetForm;
