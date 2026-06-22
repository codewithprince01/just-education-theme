"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Building2, Mail, Phone, MapPin, Globe, GraduationCap, DollarSign, Calendar, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

function EnquiryFormContent() {
  const searchParams = useSearchParams();

  // Hidden fields state parsed from search params
  const [hiddenFields, setHiddenFields] = useState({
    institutionId: '',
    institutionName: '',
    pageUrl: '',
    leadSource: 'Direct',
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHiddenFields({
        institutionId: searchParams.get('institutionId') || 'N/A',
        institutionName: searchParams.get('institutionName') || 'N/A',
        pageUrl: window.location.href,
        leadSource: searchParams.get('source') || 'Web Portal',
        utmSource: searchParams.get('utm_source') || 'N/A',
        utmMedium: searchParams.get('utm_medium') || 'N/A',
        utmCampaign: searchParams.get('utm_campaign') || 'N/A'
      });
    }
  }, [searchParams]);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'India',
    state: '',
    city: '',
    interestedCategory: 'University',
    interestedCourse: '',
    preferredStream: '',
    preferredDegree: '',
    preferredStudyDestination: '',
    currentQualification: '',
    expectedAdmissionYear: '2026',
    budgetRange: '',
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
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

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
        <span className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold uppercase tracking-wider">
          Lead Portal
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mt-3">
          Admission & Course Enquiry
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Get in touch with our admissions experts to choose the right program and destination for your career.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white border border-green-100 rounded-3xl p-8 md:p-12 shadow-xl text-center animate-fade-in">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-black text-[#0a2540]">Enquiry Submitted Successfully!</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Thank you for registering. Our counsellor will contact you shortly to guide you with details.
          </p>

          {/* Lead Summary Preview */}
          <div className="mt-8 border-t border-gray-100 pt-6 text-left max-w-lg mx-auto bg-gray-50 rounded-2xl p-6 border">
            <h3 className="font-sans font-bold text-sm text-[#0a2540] uppercase tracking-wide mb-4">Submitted Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-semibold">Name</span>
                <span className="text-gray-700 font-bold">{formData.fullName}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Email</span>
                <span className="text-gray-700 font-bold">{formData.email}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Phone</span>
                <span className="text-gray-700 font-bold">{formData.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Location</span>
                <span className="text-gray-700 font-bold">{formData.city}, {formData.state}, {formData.country}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Academic Interest</span>
                <span className="text-gray-700 font-bold">{formData.interestedCategory} - {formData.interestedCourse || 'Not Specified'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Expected Year</span>
                <span className="text-gray-700 font-bold">{formData.expectedAdmissionYear}</span>
              </div>
            </div>

            {/* Hidden Metadata Preview */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-sans font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-gray-400" />
                Hidden Tracking Metadata (Captured)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 font-mono">
                <div>Institution ID: <span className="font-semibold text-gray-700">{hiddenFields.institutionId}</span></div>
                <div>Institution Name: <span className="font-semibold text-gray-700">{hiddenFields.institutionName}</span></div>
                <div className="col-span-2 truncate">Page URL: <span className="text-gray-700">{hiddenFields.pageUrl}</span></div>
                <div>Lead Source: <span className="font-semibold text-gray-700">{hiddenFields.leadSource}</span></div>
                <div>UTM Source: <span className="font-semibold text-gray-700">{hiddenFields.utmSource}</span></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md cursor-pointer"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
          {/* Institution Info Badge if present */}
          {hiddenFields.institutionName !== 'N/A' && (
            <div className="flex items-center gap-3 bg-blue-50/55 border border-blue-100 rounded-2xl p-4">
              <Building2 className="text-blue-600" size={20} />
              <div>
                <div className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Enquiring For</div>
                <div className="text-sm font-bold text-[#0a2540]">{hiddenFields.institutionName}</div>
              </div>
            </div>
          )}

          {/* Section 1: Personal Details */}
          <div>
            <h2 className="text-lg font-bold text-[#0a2540] border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                />
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
                    placeholder="johndoe@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.email}</p>}
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
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Country *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Globe size={16} />
                  </span>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="India"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.country ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.country && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">State *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Maharashtra"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.state ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.state && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">City *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Pune"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.city ? 'border-red-500 bg-red-50/30' : 'border-gray-200'}`}
                  />
                </div>
                {errors.city && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.city}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Academic Interest */}
          <div>
            <h2 className="text-lg font-bold text-[#0a2540] border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Academic Interest
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Interested Category</label>
                <select
                  name="interestedCategory"
                  value={formData.interestedCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="University">University</option>
                  <option value="College">College</option>
                  <option value="School">School</option>
                  <option value="Coaching Center">Coaching Center</option>
                  <option value="Training Center">Training Center</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Interested Course</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <GraduationCap size={16} />
                  </span>
                  <input
                    type="text"
                    name="interestedCourse"
                    value={formData.interestedCourse}
                    onChange={handleInputChange}
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Preferred Stream</label>
                <input
                  type="text"
                  name="preferredStream"
                  value={formData.preferredStream}
                  onChange={handleInputChange}
                  placeholder="e.g. Engineering, Management"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Preferred Degree</label>
                <input
                  type="text"
                  name="preferredDegree"
                  value={formData.preferredDegree}
                  onChange={handleInputChange}
                  placeholder="e.g. Bachelor's, Master's"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Additional Information */}
          <div>
            <h2 className="text-lg font-bold text-[#0a2540] border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Preferred Study Destination</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    name="preferredStudyDestination"
                    value={formData.preferredStudyDestination}
                    onChange={handleInputChange}
                    placeholder="e.g. Pune, Bangalore, USA"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Current Qualification</label>
                <input
                  type="text"
                  name="currentQualification"
                  value={formData.currentQualification}
                  onChange={handleInputChange}
                  placeholder="e.g. Class 12, Graduate"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Expected Admission Year</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Calendar size={16} />
                  </span>
                  <select
                    name="expectedAdmissionYear"
                    value={formData.expectedAdmissionYear}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Budget Range</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <DollarSign size={16} />
                  </span>
                  <input
                    type="text"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    placeholder="e.g. 2 - 5 Lakhs per year"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Message / Query</label>
                <div className="relative">
                  <span className="absolute top-3 left-0 pl-3.5 flex items-start text-gray-400">
                    <MessageSquare size={16} />
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write details about your queries here..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.01] hover:shadow-blue-500/35 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  Submit Enquiry
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

export default function EnquiryPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 font-medium">Loading Form Fields...</p>
      </div>
    }>
      <EnquiryFormContent />
    </Suspense>
  );
}
