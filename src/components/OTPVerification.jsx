import { useState, useEffect } from 'react';
import axios from 'axios';

const OTPVerification = ({ userId, verificationCode, onVerificationComplete }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [timer, setTimer] = useState(60);

  // Timer for resend button
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Handle OTP input
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);
    }
  };

  // Handle keydown for backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && e.target.previousSibling) {
        e.preventDefault();
        e.target.previousSibling.focus();
      }
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    const enteredOTP = otp.join('');
    setError('');
    setVerifying(true);

    try {
      // For development, directly compare with verification code
      if (enteredOTP === verificationCode) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-phone`, {
          userId,
          code: enteredOTP
        });

        onVerificationComplete(response.data);
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-code`, { userId });
      setTimer(60);
      setError('');
      // Note: In development, new OTP will be shown in console
    } catch (err) {
      setError('Failed to resend verification code');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Phone Verification</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <p className="text-center text-gray-600 mb-6">
          Enter the verification code to verify your phone number
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 border-2 rounded-lg text-center text-xl font-bold"
              style={{ appearance: 'textfield' }}
            />
          ))}
        </div>

        <button
          onClick={verifyOTP}
          disabled={verifying || otp.join('').length !== 6}
          className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 
                   disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {verifying ? 'Verifying...' : 'Verify'}
        </button>

        <div className="text-center">
          <button
            onClick={resendOTP}
            disabled={timer > 0}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-50 
                     disabled:cursor-not-allowed text-sm"
          >
            {timer > 0 ? `Resend code in ${timer}s` : 'Resend code'}
          </button>
        </div>

        {/* For development only */}
        <div className="mt-4 p-2 bg-gray-100 rounded text-sm text-gray-600">
          Development OTP: {verificationCode}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
