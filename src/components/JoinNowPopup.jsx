
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import enquiryService from "../services/enquiryService";

const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "General Fitness",
  "Personal Trainer",
  "Diet Plan"
];
const TIMES = ["Morning", "Evening"];

const initialState = {
  name: "",
  whatsapp: "",
  email: "",
  goal: "",
  time: "",
  consent: false
};

const validate = (fields) => {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Full Name is required";
  if (!fields.whatsapp.match(/^\d{10}$/)) errors.whatsapp = "Enter a valid 10-digit WhatsApp number";
  if (!fields.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Enter a valid email address";
  if (!fields.goal) errors.goal = "Select your fitness goal";
  if (!fields.time) errors.time = "Select preferred time";
  if (!fields.consent) errors.consent = "Consent is required";
  return errors;
};

const JoinNowPopup = ({ show: showProp, onClose }) => {

  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOtp] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [show, setShow] = useState(() => {
    // Only show if not closed before in this session
    return sessionStorage.getItem('gymPopupClosed') === 'true' ? false : true;
  });

  useEffect(() => {
    // If showProp is true and popup not closed, show popup
    if (showProp && sessionStorage.getItem('gymPopupClosed') !== 'true') {
      setShow(true);
    }
  }, [showProp]);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('gymPopupClosed', 'true');
    if (onClose) onClose();
  };

  useEffect(() => {
    if (show) {
      setFields(initialState);
      setErrors({});
      setSubmitted(false);
    }
  }, [show]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with fields:', fields);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) {
      console.log('Validation errors:', errs);
      return;
    }
    setSubmitted(true);
    try {
      console.log('Sending enquiry to server...');
      const result = await enquiryService.sendGymEnquiry({
        name: fields.name,
        whatsapp: fields.whatsapp,
        email: fields.email,
        goal: fields.goal,
        time: fields.time
      });
      console.log('Enquiry sent successfully:', result);
      
      if (result.requiresVerification) {
        setUserEmail(fields.email);
        setShowOTPField(true);
        setSubmitted(false);
        alert('Verification code sent to your email! Please check your inbox and enter the code below.');
      } else {
        alert('Thank you! Your enquiry has been submitted successfully.');
        handleClose();
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitted(false);
      setErrors({ form: error?.response?.data?.error || error?.response?.data?.message || "Failed to submit. Please try again." });
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit verification code' });
      return;
    }
    
    setSubmitted(true);
    try {
      const result = await enquiryService.verifyOTP(userEmail, otp);
      console.log('OTP verified successfully:', result);
      alert('Thank you! Your email has been verified and enquiry sent to our team.');
      handleClose();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setSubmitted(false);
      setErrors({ otp: error?.response?.data?.error || "Invalid verification code. Please try again." });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative z-[10000]"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold focus:outline-none"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
              {showOTPField ? 'Verify Your Email' : 'Join Our Gym'}
            </h2>
            
            {!showOTPField ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-gray-900 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                  value={fields.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-gray-900 ${errors.whatsapp ? 'border-red-400' : 'border-gray-300'}`}
                  value={fields.whatsapp}
                  onChange={handleChange}
                  required
                  maxLength={10}
                />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-gray-900 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                  value={fields.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <select
                  name="goal"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-gray-900 ${errors.goal ? 'border-red-400' : 'border-gray-300'}`}
                  value={fields.goal}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Fitness Goal</option>
                  {FITNESS_GOALS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal}</p>}
              </div>
              <div>
                <select
                  name="time"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-gray-900 ${errors.time ? 'border-red-400' : 'border-gray-300'}`}
                  value={fields.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Preferred Time</option>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="consent"
                  checked={fields.consent}
                  onChange={handleChange}
                  className="mr-2 accent-gray-900"
                  required
                />
                <label htmlFor="consent" className="text-gray-700 text-sm">
                  I agree to receive updates on WhatsApp & Email
                </label>
              </div>
              {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
              {errors.form && <p className="text-red-500 text-xs mb-2 text-center">{errors.form}</p>}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-white hover:text-black font-semibold shadow-md transition-all duration-200"
                disabled={submitted}
              >
                {submitted ? "Submitting..." : "Join Now"}
              </button>
            </form>
            ) : (
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <p className="text-gray-700 text-center mb-4">
                We've sent a 6-digit verification code to <strong>{userEmail}</strong>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit verification code"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-gray-900 ${errors.otp ? 'border-red-400' : 'border-gray-300'}`}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setErrors(prev => ({ ...prev, otp: undefined }));
                  }}
                  maxLength={6}
                  required
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-white hover:text-black font-semibold shadow-md transition-all duration-200"
                disabled={submitted || otp.length !== 6}
              >
                {submitted ? "Verifying..." : "Verify Email"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOTPField(false);
                  setOtp('');
                  setErrors({});
                }}
                className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Form
              </button>
            </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinNowPopup;
