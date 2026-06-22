"use client";

import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle2, Building, HelpCircle } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.phone.trim()) {
      if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
        newErrors.phone = 'Invalid phone number format';
      }
    }

    if (!formData.subject) newErrors.subject = 'Subject selection is required';
    if (!formData.message.trim()) newErrors.message = 'Message content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      {/* Page Header */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 text-xs font-semibold uppercase tracking-wider">
          Get In Touch
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mt-3">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Have questions or want to list your institution? Fill out the form and our support team will reach out to you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Contact Details Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0a2540] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full filter blur-xl"></div>
            
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-blue-300" />
                </div>
                <div>
                  <div className="text-xs text-gray-300 font-semibold uppercase tracking-wide">Email Us</div>
                  <div className="text-sm font-medium mt-0.5 break-all">support@justeducation.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-blue-300" />
                </div>
                <div>
                  <div className="text-xs text-gray-300 font-semibold uppercase tracking-wide">Call Us</div>
                  <div className="text-sm font-medium mt-0.5">+1 (800) 123-4567</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Building size={18} className="text-blue-300" />
                </div>
                <div>
                  <div className="text-xs text-gray-300 font-semibold uppercase tracking-wide">Headquarters</div>
                  <div className="text-sm font-medium mt-0.5">
                    100 Innovation Way, Tech Park,<br />
                    Suite 500, Pune, MH, India
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-300">
              Our average response time for general and listing requests is 24-48 business hours.
            </div>
          </div>


        </div>

        {/* Right Side: Form Container */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white border border-green-100 rounded-3xl p-8 md:p-12 shadow-xl text-center animate-fade-in h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-black text-[#0a2540]">Message Sent!</h2>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Thank you for contacting us. Your message has been received. Our team will review your inquiry and get back to you shortly.
              </p>

              {/* Message Details Preview */}
              <div className="mt-8 border-t border-gray-100 pt-6 text-left max-w-lg mx-auto bg-gray-50 rounded-2xl p-6 border w-full">
                <h3 className="font-sans font-bold text-sm text-[#0a2540] uppercase tracking-wide mb-4">Summary of Sent Query</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-gray-400 block font-semibold">Name</span>
                    <span className="text-gray-700 font-bold">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">Email</span>
                    <span className="text-gray-700 font-bold">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div>
                      <span className="text-gray-400 block font-semibold">Phone</span>
                      <span className="text-gray-700 font-bold">{formData.phone}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400 block font-semibold">Subject</span>
                    <span className="text-gray-700 font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded text-indigo-700 inline-block mt-0.5">
                      {formData.subject}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">Message</span>
                    <span className="text-gray-600 font-medium block mt-1 bg-white p-3 rounded-lg border border-gray-100 whitespace-pre-line">
                      {formData.message}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      subject: 'General Inquiry',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-xl space-y-6">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="janedoe@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone and Subject Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210 (Optional)"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Admission Support">Admission Support</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Partnership Request">Partnership Request</option>
                    <option value="Institution Listing">Institution Listing</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Message *</label>
                <div className="relative">
                  <span className="absolute top-3 left-0 pl-3.5 flex items-start text-gray-400">
                    <MessageSquare size={16} className="mt-0.5" />
                  </span>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your inquiry details..."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.message ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.message && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.message}</p>}
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.01] hover:shadow-blue-500/35 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                >
                  {loading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
