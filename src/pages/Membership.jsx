"use client";
import React, { useState } from 'react';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

 // This file is for membership plans.

 // Icons replaced with inline SVGs to avoid dependencies
 const FaCheck = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path></svg>
 );

 const FaCrown = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.728 5.761l-4.225-.613c-1.3-.189-1.802-.916-2.152-2.154L9.897 1.096c-.234-.781-1.378-.781-1.612 0L6.649 2.994c-.35.1.002-1.233-.298-2.154-1.282-.123-1.625.59-2.152 2.154l-1.026 3.421c-.35.1-.002-1.233-.298-2.154-1.282-.123-1.625.59-2.152 2.154L0 5.761c-.3.044-.424.41-.215.631l3.056 2.978-.722 4.204c-.052.305.267.502.535.372l3.784-1.99c.35-.184.81-.184 1.16 0l3.784 1.99c.268.13.587-.067.535-.372l-.722-4.204 3.056-2.978c.21-.22.086-.587-.215-.631z"/></svg>
 );

 const FaStar = () => (
   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545-4.739-4.618 6.572-.955L10 0l2.823 6.072 6.572.955-4.739 4.618 1.122 6.545z"/></svg>
 );

 const FaArrowRight = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.172 9l-5.586-5.586-1.414 1.414L12.172 9H0v2h12.172l-3 3 1.414 1.414L16.172 11H20V9z"></path></svg>
 );

 const FaUsers = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
 );

 const FaClock = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 20a10 10 0 110-20 10 10 0 010 20zm-.648-15.34l.296.223V11h3a1 1 0 010 2h-4a1 1 0 01-1-1V4.659a1 1 0 112 0v5.526l2.352-1.764a1 1 0 11.648.79z"/></svg>
 );

 const FaDumbbell = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM17.5 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-15 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/></svg>
 );

 const FaFire = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 20a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zm.707-13.293a1 1 0 00-1.414 1.414L10 10.414l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 10.414z"/></svg>
 );

 const FaGem = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M12.928 2.072L10 0l-2.928 2.072L5.072 5.072l2.928 2.928-2.928 2.928-2.928-2.072L0 10l2.072-2.928L5.072 5.072 8 2.072l2.072 2.928 2.928 2.072L15 10l-2.072-2.928L10 5.072l2.928-2.928z"/></svg>
 );

 const FaUsersGroup = () => (
   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3zM16 11a3 3 0 100-6 3 3 0 000 6zm-12 7a7 7 0 1114 0H4z"/></svg>
 );

 const MAPPED_ICONS = {
   FaCheck: FaCheck,
   FaCrown: FaCrown,
   FaStar: FaStar,
   FaFire: FaFire,
   FaGem: FaGem,
   FaArrowRight: FaArrowRight,
   FaUsers: FaUsers,
   FaClock: FaClock,
   FaDumbbell: FaDumbbell,
   FaUsersGroup: FaUsersGroup,
 };

 // Enhanced membership data with more details
 const sampleMemberships = [
   {
     id: 1,
     name: 'Basic Plan',
     title: 'Starter',
     price: 1999,
     originalPrice: 2999,
     duration: 1,
     description: 'Perfect for starters looking to begin their fitness journey',
     isPopular: false,
     icon: 'FaDumbbell',
     gradient: 'from-blue-400 to-blue-600',
     bgGradient: 'from-blue-50 to-blue-100',
     features: [
       'Access to gym equipment',
       'Locker facility',
       '2 Group classes/week',
       'Basic workout plan',
       'Mobile app access'
     ],
     benefits: '5+ Equipment Access',
     users: '1.2K+ Members'
   },
   {
     id: 2,
     name: 'Pro Plan',
     title: 'Most Popular',
     price: 4999,
     originalPrice: 7999,
     duration: 3,
     description: 'Best value for regular trainers with extra benefits',
     isPopular: true,
     icon: 'FaFire',
     gradient: 'from-amber-400 to-rose-500',
     bgGradient: 'from-amber-50 to-rose-100',
     features: [
       'All Basic features',
       'Unlimited group classes',
       'Personal trainer consultation',
       'Advanced workout plans',
       'Sauna access',
       'Nutrition tracking',
       'Priority booking'
     ],
     benefits: '15+ Premium Features',
     users: '2.8K+ Members'
   },
   {
     id: 3,
     name: 'Premium Plan',
     title: 'Elite',
     price: 8999,
     originalPrice: 12999,
     duration: 6,
     description: 'Ultimate package for serious fitness enthusiasts',
     isPopular: false,
     icon: 'FaGem',
     gradient: 'from-purple-400 to-pink-600',
     bgGradient: 'from-purple-50 to-pink-100',
     features: [
       'All Pro features',
       '24/7 gym access',
       'Monthly body analysis',
       'Nutrition planning',
       'Free guest passes',
       'VIP lounge access',
       'Personal diet coach',
       'Recovery sessions'
     ],
     benefits: '25+ Premium Features',
     users: '500+ Elite Members'
   },
   {
     id: 4,
     name: 'Corporate Membership',
     title: 'Group',
     price: 15999,
     originalPrice: 19999,
     duration: 12,
     description: 'Tailored for companies promoting employee wellness',
     isPopular: false,
     icon: 'FaUsersGroup',
     gradient: 'from-green-400 to-teal-600',
     bgGradient: 'from-green-50 to-teal-100',
     features: [
       'All Premium features',
       'Customizable group access',
       'Dedicated wellness workshops',
       'Team-building fitness events',
       'On-site health checkups',
       'Corporate discounts on supplements'
     ],
     benefits: '10+ Corporate Benefits',
     users: '20+ Organizations'
   },
   {
     id: 5,
     name: 'Family Package',
     title: 'Family',
     price: 12999,
     originalPrice: 15999,
     duration: 12,
     description: 'A complete fitness solution for the entire family',
     isPopular: false,
     icon: 'FaUsers',
     gradient: 'from-orange-400 to-red-600',
     bgGradient: 'from-orange-50 to-red-100',
     features: [
       'Access for up to 4 family members',
       'All Premium features',
       'Personalized family workout plans',
       'Kids\' fitness classes',
       'Monthly family health checkups',
       'Shared personal trainer sessions'
     ],
     benefits: 'Family-Oriented Benefits',
     users: '100+ Families'
   }
 ];

 // Modal for the join form
 const JoinFormModal = ({ onClose, planName }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', question: '' });
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    // Indian email format (standard email)
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
  
  const validatePhone = (phone) => {
    // Indian mobile: 10 digits, starts with 6-9
    if (countryCode === '+91') {
      return /^([6-9][0-9]{9})$/.test(phone);
    }
    return true; // Other country codes: skip validation for now
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Validate on change
    let newErrors = { ...errors };
    if (name === 'email') {
      newErrors.email = validateEmail(value) ? '' : 'Valid email required';
    }
    if (name === 'phone') {
      if (countryCode === '+91') {
        newErrors.phone = validatePhone(value) ? '' : 'Valid 10-digit Indian mobile required';
      } else {
        newErrors.phone = '';
      }
    }
    setErrors(newErrors);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    // Re-validate phone when country changes
    let newErrors = { ...errors };
    if (e.target.value === '+91') {
      newErrors.phone = validatePhone(formData.phone) ? '' : 'Valid 10-digit Indian mobile required';
    } else {
      newErrors.phone = '';
    }
    setErrors(newErrors);
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    // Validate before submit
    let newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Valid 10-digit Indian mobile required';
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    setIsSubmitting(true);
    try {
      const res = await sendMembershipVerificationEmail(formData);
      setVerificationSent(true);
      setVerificationCode(res.code);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      alert('Verification email send failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleVerifyCodeAndSubmit = async (e) => {
    e.preventDefault();
    if (userCode === verificationCode.toString()) {
      setVerified(true);
      setIsSubmitting(true);
      // Find selected plan price
      let selectedPlan = null;
      if (planName) {
        selectedPlan = sampleMemberships.find(plan => plan.name === planName);
      }
      const planPrice = selectedPlan ? selectedPlan.price : '';
      try {
        await submitMembershipForm({ ...formData, code: verificationCode, userCode, planName, planPrice });
        setIsSubmitting(false);
        setIsSubmitted(true);
        // No setTimeout, modal stays open until user closes it
      } catch (err) {
        setIsSubmitting(false);
        alert('Membership form send failed: ' + (err.response?.data?.message || err.message));
      }
    } else {
      alert('Verification code incorrect.');
    }
  };   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-gray-900 rounded-3xl p-8 max-w-lg w-full border border-white/10 shadow-2xl animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {!isSubmitted ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Join {planName}</h2>
            <p className="text-gray-400 text-center mb-6">Enter your details to get started on your fitness journey.</p>
            {!verificationSent ? (
              <form onSubmit={handleVerifyEmail} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
                {errors.email && <div className="text-red-400 text-xs font-semibold pl-2">{errors.email}</div>}
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    className="px-3 py-3 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    style={{ minWidth: '100px'}}
                  >
                    <option className='bg-white/10' value="+91">🇮🇳 +91</option>
                    <option className='bg-white/10' value="+1">🇺🇸 +1</option>
                    <option className='bg-white/10' value="+44">🇬🇧 +44</option>
                    <option className='bg-white/10' value="+61">🇦🇺 +61</option>
                    <option className='bg-white/10' value="+971">🇦🇪 +971</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Contact Number *"
                    required
                    className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>
                {errors.phone && <div className="text-red-400 text-xs font-semibold pl-2">{errors.phone}</div>}
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Any questions? (Optional)"
                  rows="4"
                  className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-400 to-rose-500 text-white font-bold py-3 rounded-xl hover:from-amber-500 hover:to-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? 'Sending Verification...' : 'Send Verification Email'}
                </button>
              </form>
            ) : !verified ? (
              <form onSubmit={handleVerifyCodeAndSubmit} className="space-y-4">
                <label className="block text-sm font-medium text-white mb-2">Enter Verification Code (Check your email)</label>
                <input
                  type="text"
                  value={userCode}
                  onChange={e => setUserCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                  placeholder="Enter code"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-rose-500 text-white font-bold py-3 rounded-xl hover:from-amber-500 hover:to-rose-600 transition-all duration-300"
                >Verify & Join</button>
              </form>
            ) : (
              <div className="text-center">
                <div className="bg-green-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                <p className="text-gray-400">Thank you for joining. We've sent a confirmation email to your address.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="bg-green-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 animate-fade-in-up">Welcome to the Fitness Family!</h3>
            <p className="text-gray-300 text-lg mb-6 animate-fade-in-up animation-delay-100">Your journey to a healthier you starts now.</p>
            <p className="text-gray-400 animate-fade-in-up animation-delay-200">
              We have received your request and will be in touch with you shortly to finalize your membership.
            </p>
            <button
              onClick={onClose}
              className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 animate-fade-in-up animation-delay-300"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MembershipPage() {
   const [hoveredPlanId, setHoveredPlanId] = useState(null);
   const [showJoinForm, setShowJoinForm] = useState(false);
   const [selectedPlanName, setSelectedPlanName] = useState('');
   const [isLoggedIn, setIsLoggedIn] = useState(true); // Hardcoded for single file, a real app would use a state management solution.
   const CrownIcon = MAPPED_ICONS.FaCrown;
   const ArrowRightIcon = MAPPED_ICONS.FaArrowRight;
   const StarIcon = MAPPED_ICONS.FaStar;
   const UsersIcon = MAPPED_ICONS.FaUsers;
   const ClockIcon = MAPPED_ICONS.FaClock;
   const CheckIcon = MAPPED_ICONS.FaCheck;
   const UsersGroupIcon = MAPPED_ICONS.FaUsersGroup;

   const handleJoin = (planName) => {
     if (!isLoggedIn) {
       alert('Please log in to select a plan.');
       return;
     }
     setSelectedPlanName(planName);
     setShowJoinForm(true);
   };

   return (
     <>
       <Header />
       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 relative font-sans">
       {/* Background Effects */}
       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
       
       <div className="container mx-auto px-4 relative z-10">
         {/* Header Section */}
         <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-rose-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
             <CrownIcon className="text-amber-400" />
             <span className="text-white font-semibold">Premium Memberships</span>
           </div>
           
           <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
             Choose Your
             <span className="block bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 bg-clip-text text-transparent">
               Fitness Journey
             </span>
           </h1>
           
           <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
             Transform your body and mind with our world-class facilities, expert trainers, and comprehensive wellness programs designed to help you achieve your fitness goals.
           </p>
           
           {/* Stats */}
           <div className="flex justify-center gap-8 mt-10 flex-wrap">
             <div className="text-center">
               <div className="text-3xl font-bold text-white">5K+</div>
               <div className="text-gray-400">Happy Members</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-bold text-white">50+</div>
               <div className="text-gray-400">Expert Trainers</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-bold text-white">24/7</div>
               <div className="text-gray-400">Access Available</div>
             </div>
           </div>
         </div>

   {/* Membership Cards */}
   <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
           {sampleMemberships.map((plan, index) => {
             const IconComponent = MAPPED_ICONS[plan.icon];
             return (
               <div 
                 key={plan.id}
                 onMouseEnter={() => setHoveredPlanId(plan.id)}
                 onMouseLeave={() => setHoveredPlanId(null)}
                 className={`
                   relative group cursor-pointer transition-all duration-500 transform
                   ${hoveredPlanId === plan.id ? 'scale-105 -translate-y-2' : ''}
                   ${plan.isPopular ? 'lg:scale-110 lg:-translate-y-4' : ''}
                 `}
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 {/* Popular Badge */}
                 {plan.isPopular && (
                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                     <div className="bg-gradient-to-r from-amber-400 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                       <StarIcon className="text-xs" />
                       {plan.title}
                       <StarIcon className="text-xs" />
                     </div>
                   </div>
                 )}

                 {/* Card */}
                 <div className={`
                   relative bg-black/20 backdrop-blur-xl rounded-3xl overflow-hidden
                   shadow-[0_10px_25px_rgba(0,0,0,0.8)] border border-white/20
                   transition-all duration-500
                   ${hoveredPlanId === plan.id ? 'shadow-[0_15px_40px_rgba(0,0,0,0.8)] border-white/30' : ''}
                   ${plan.isPopular ? 'ring-2 ring-amber-400/50' : ''}
                 `}>
                   {/* Background Gradient */}
                   <div className="absolute inset-0 bg-black/10 opacity-5"></div>
                   
                   {/* Header */}
                   <div className="relative p-8 text-center">
                     <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4 shadow-lg`}>
                       <IconComponent className="text-2xl text-white" />
                     </div>
                     
                     <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                     
                     {/* Price */}
                     <div className="mb-4">
                       <div className="flex items-center justify-center gap-2 mb-1">
                         <span className="text-gray-400 line-through text-lg">₹{plan.originalPrice}</span>
                         <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                           {Math.round((1 - plan.price / plan.originalPrice) * 100)}% OFF
                         </div>
                       </div>
                       <div className="text-4xl font-black text-white">
                         ₹{plan.price}
                         <span className="text-gray-300 text-lg font-normal">
                           /{plan.duration} month{plan.duration > 1 ? 's' : ''}
                         </span>
                       </div>
                     </div>
                     
                     <p className="text-gray-300 mb-6 leading-relaxed">{plan.description}</p>
                     
                     {/* Stats */}
                     <div className="flex justify-center gap-4 mb-6">
                       <div className="flex items-center gap-1 text-gray-300 text-sm">
                         <UsersIcon className="text-amber-400" />
                         {plan.users}
                       </div>
                       <div className="flex items-center gap-1 text-gray-300 text-sm">
                         <ClockIcon className="text-blue-400" />
                         {plan.benefits}
                       </div>
                     </div>
                   </div>

                   {/* Features */}
                   <div className="px-8 pb-8">
                     <ul className="space-y-3 mb-8">
                       {plan.features.map((feature, idx) => (
                         <li key={feature + idx} className="flex items-start gap-3 group">
                           <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                             <CheckIcon className="text-white text-xs" />
                           </div>
                           <span className="text-gray-200 group-hover:text-white transition-colors">
                             {feature}
                           </span>
                         </li>
                       ))}
                     </ul>

                     {/* CTA Button */}
                     <button
                       onClick={() => handleJoin(plan.name)}
                       className={`
                         w-full py-4 rounded-2xl font-bold text-white transition-all duration-300
                         bg-gradient-to-r ${plan.gradient}
                         hover:shadow-2xl hover:scale-105
                         transform active:scale-95
                         relative overflow-hidden group
                       `}
                     >
                       <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                       <span className="relative flex items-center justify-center gap-2">
                         Join Now
                         <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
                       </span>
                     </button>
                   </div>

                   {/* Hover Effect Overlay */}
                   {hoveredPlanId === plan.id && (
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
                   )}
               </div>
             </div>
             );
           })}
         </div>
         
         {/* Bottom CTA Section */}
         <div className="text-center mt-16">
           <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-2xl mx-auto border border-white/10">
             <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
             <p className="text-gray-300 mb-6">Our fitness experts are here to help you choose the perfect plan</p>
             <button className="bg-gradient-to-r from-amber-400 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
               Contact Our Team
             </button>
           </div>
         </div>
       </div>
       {showJoinForm && (
         <JoinFormModal onClose={() => setShowJoinForm(false)} planName={selectedPlanName} />
       )}
       </div>
       <Footer />
     </>
   );
}
