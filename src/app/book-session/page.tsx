"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar as CalendarIcon, Clock, Globe, Laptop, HelpCircle, Send, CheckCircle2, User, Phone, Mail, ShieldAlert } from 'lucide-react';

function BookSessionContent() {
  const searchParams = useSearchParams();

  // Hidden tracking fields
  const [hiddenFields, setHiddenFields] = useState({
    institutionId: '',
    consultantId: '',
    bookingSource: 'Web Directory',
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  });

  const [timeZone, setTimeZone] = useState('Asia/Kolkata');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata');
      setHiddenFields({
        institutionId: searchParams.get('institutionId') || 'N/A',
        consultantId: searchParams.get('consultantId') || 'N/A',
        bookingSource: searchParams.get('source') || 'Counselling Portal',
        utmSource: searchParams.get('utm_source') || 'N/A',
        utmMedium: searchParams.get('utm_medium') || 'N/A',
        utmCampaign: searchParams.get('utm_campaign') || 'N/A'
      });
    }
  }, [searchParams]);

  // Form Field State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    purpose: 'Admission Guidance',
    preferredMode: 'Google Meet',
    questions: ''
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
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date';
    if (!formData.preferredTime) newErrors.preferredTime = 'Please select a preferred time slot';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-xs font-semibold uppercase tracking-wider">
          Scheduler
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mt-3">
          Book a Counselling / Demo Session
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Reserve a private 1-on-1 slot with our certified academic advisors to map out your education journey.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white border border-purple-100 rounded-3xl p-8 md:p-12 shadow-xl text-center animate-fade-in">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-black text-[#0a2540]">Booking Confirmed!</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Your booking request has been successfully generated. An invite will be shared at your email shortly.
          </p>

          {/* Booking Summary */}
          <div className="mt-8 border-t border-gray-100 pt-6 text-left max-w-lg mx-auto bg-gray-50 rounded-2xl p-6 border">
            <h3 className="font-sans font-bold text-sm text-[#0a2540] uppercase tracking-wide mb-4">Reservation Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-semibold">Attendee</span>
                <span className="text-gray-700 font-bold">{formData.fullName}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Purpose</span>
                <span className="text-gray-700 font-bold">{formData.purpose}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Date & Time</span>
                <span className="text-gray-700 font-bold">{formData.preferredDate} at {formData.preferredTime}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Time Zone</span>
                <span className="text-gray-700 font-bold">{timeZone}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Meeting Mode</span>
                <span className="text-gray-700 font-bold">{formData.preferredMode}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Contact Email</span>
                <span className="text-gray-700 font-bold">{formData.email}</span>
              </div>
            </div>

            {/* Hidden Fields Tracking Preview */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-sans font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <ShieldAlert size={12} className="text-gray-400" />
                Hidden Analytics Data (Transmitted)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 font-mono">
                <div>Institution ID: <span className="font-semibold text-gray-700">{hiddenFields.institutionId}</span></div>
                <div>Consultant ID: <span className="font-semibold text-gray-700">{hiddenFields.consultantId}</span></div>
                <div>UTM Source: <span className="font-semibold text-gray-700">{hiddenFields.utmSource}</span></div>
                <div>Source: <span className="font-semibold text-gray-700">{hiddenFields.bookingSource}</span></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-md cursor-pointer"
          >
            Schedule Another Slot
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
          {/* Section 1: Personal Details */}
          <div>
            <h2 className="text-lg font-bold text-[#0a2540] border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all ${errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Phone Number *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
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
                    placeholder="johndoe@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Scheduling */}
          <div>
            <h2 className="text-lg font-bold text-[#0a2540] border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
              Scheduling Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Preferred Date *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <CalendarIcon size={16} />
                  </span>
                  <input
                    type="date"
                    name="preferredDate"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all ${errors.preferredDate ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.preferredDate && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.preferredDate}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Preferred Time *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Clock size={16} />
                  </span>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all ${errors.preferredTime ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  >
                    <option value="">Select Slot</option>
                    <option value="10:00 AM">10:00 AM - 10:30 AM</option>
                    <option value="11:30 AM">11:30 AM - 12:00 PM</option>
                    <option value="02:00 PM">02:00 PM - 02:30 PM</option>
                    <option value="03:30 PM">03:30 PM - 04:00 PM</option>
                    <option value="05:00 PM">05:00 PM - 05:30 PM</option>
                  </select>
                </div>
                {errors.preferredTime && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.preferredTime}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Time Zone</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Globe size={16} />
                  </span>
                  <input
                    type="text"
                    value={timeZone}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-100 text-gray-500 select-none outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Counseling Details */}
          <div>
            <h2 className="text-lg font-bold text-[#0a2540] border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
              Counseling Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Purpose</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                >
                  <option value="Admission Guidance">Admission Guidance</option>
                  <option value="Study Abroad Counseling">Study Abroad Counseling</option>
                  <option value="Scholarship Guidance">Scholarship Guidance</option>
                  <option value="Visa Assistance">Visa Assistance</option>
                  <option value="Career Counseling">Career Counseling</option>
                  <option value="Hostel Assistance">Hostel Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Preferred Mode</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Laptop size={16} />
                  </span>
                  <select
                    name="preferredMode"
                    value={formData.preferredMode}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  >
                    <option value="Phone Call">Phone Call</option>
                    <option value="Video Call">Video Call</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Questions / Expectations</label>
                <div className="relative">
                  <span className="absolute top-3 left-0 pl-3.5 flex items-start text-gray-400">
                    <HelpCircle size={16} />
                  </span>
                  <textarea
                    name="questions"
                    rows={4}
                    value={formData.questions}
                    onChange={handleInputChange}
                    placeholder="e.g. Can you explain the scholarship opportunities and average course packages?"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.01] hover:shadow-purple-500/35 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? (
                <>Reserving...</>
              ) : (
                <>
                  Confirm Booking
                  <Send size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function BookSessionPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 font-medium">Loading Booking Calendar...</p>
      </div>
    }>
      <BookSessionContent />
    </Suspense>
  );
}
