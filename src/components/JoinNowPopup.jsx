
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendGymEnquiry } from "../services/api";

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
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitted(true);
    try {
      await sendGymEnquiry({
        name: fields.name,
        whatsapp: fields.whatsapp,
        email: fields.email,
        goal: fields.goal,
        time: fields.time
      });
      onClose();
    } catch (error) {
      setSubmitted(false);
      setErrors({ form: error?.response?.data?.error || "Failed to submit. Please try again." });
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
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Join Our Gym</h2>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinNowPopup;
