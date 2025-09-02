"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { sendVerificationEmail, sendContactForm } from '../services/contactApi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [verified, setVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Send verification email
      const res = await sendVerificationEmail(formData);
      setVerificationSent(true);
      setVerificationCode(res.code);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      alert('Verification email send failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (userCode === verificationCode.toString()) {
      setVerified(true);
      // Send contact form
      setIsSubmitting(true);
      try {
        await sendContactForm({
          ...formData,
          code: verificationCode,
          userCode: userCode
        });
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            inquiryType: 'general'
          });
          setVerificationSent(false);
          setVerified(false);
          setUserCode('');
        }, 3000);
      } catch (err) {
        setIsSubmitting(false);
        alert('Contact form send failed: ' + (err.response?.data?.message || err.message));
      }
    } else {
      alert('Verification code incorrect.');
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91-1234567890',
      subtext: 'Mon-Fri 9AM-6PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@powerpoint.com',
      subtext: 'We reply within 24hrs'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Fitness Street, Delhi',
      subtext: 'Visit our main branch'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'membership', label: 'Membership Plans' },
    { value: 'support', label: 'Customer Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'partnership', label: 'Partnership' }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Background Animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative z-10 container mx-auto py-16 px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Get In 
              <span className="block bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Have questions about our services? Want to start your fitness journey? 
              We're here to help you every step of the way.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                        <p className="text-yellow-400 font-medium">{info.details}</p>
                        <p className="text-white text-sm">{info.subtext}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Quick Response Promise</h3>
                </div>
                <p className="text-white">
                  We respond to all inquiries within 24 hours. For urgent matters, 
                  call us directly at <span className="text-yellow-400 font-semibold">+91-1234567890</span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              {!isSubmitted ? (
                <>
                  <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
                  {!verificationSent ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Inquiry Type */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Inquiry Type
                        </label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                        >
                          {inquiryTypes.map((type) => (
                            <option key={type.value} value={type.value} className="bg-gray-800">
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Name and Email Row */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              required
                              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              required
                              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone and Subject Row */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91-1234567890"
                              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Brief subject line"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Message *
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us more about your inquiry..."
                            required
                            rows={5}
                            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none"
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send Verification Email</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : !verified ? (
                    <form onSubmit={handleVerify} className="space-y-6">
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
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300 transform hover:scale-105"
                      >Verify & Send Message</button>
                    </form>
                  ) : (
                    /* Success Message */
                    <div className="text-center py-12">
                      <div className="bg-rose-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                      <p className="text-white mb-6">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <div className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-xl p-4 border border-yellow-400/30">
                        <p className="text-yellow-400 font-medium">
                          Check your email for a confirmation message.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Success Message */
                <div className="text-center py-12">
                  <div className="bg-rose-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                  <p className="text-white mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <div className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-xl p-4 border border-yellow-400/30">
                    <p className="text-yellow-400 font-medium">
                      Check your email for a confirmation message.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-white mb-8">
              Can't find what you're looking for? Check our FAQ section or give us a call.
            </p>
            <a 
              href="/faq" 
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              View FAQ
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
