"use client";
import Link from 'next/link';
import { ChevronRight, Shield, FileText, Eye, AlertCircle, Users, Scale, RefreshCw, Mail, Phone, MapPin, Lock, Database, Globe, UserCheck, Clock, Share2 } from 'lucide-react';

const sections = [
  {
    id: 'intro',
    icon: <Shield size={20} className="text-blue-600" />,
    title: 'Website Privacy Policy & Personal Data',
    content: `Just Education Pvt. Ltd. (referred to as "We," "Us," "Our Company," or "Just Education") and our affiliated entities are fully committed to safeguarding your digital privacy. This privacy policy explains how we collect, use, store, manage, and protect your personally identifiable information ("Personal Data") when you interact with our platform, ensuring compliance with relevant data protection laws and regulations.

This Policy is fully integrated with the terms of our Site Policy (Terms of Use) for justeducation.in and its associated applications (the "Platform"). It applies to all users who register, sign up, or whose information we receive in connection with providing our services.

Personal Data (PD): Refers to any information that can identify an individual, directly or indirectly. This may include:
• Name, email address, mobile number
• Location data and device identifiers
• Educational background and preferences
• Documents submitted for services (e.g., transcripts)
• Any information defined as Personal Data under applicable law

We do not intentionally collect biometric, health, or sensitive personal information unless required for verification or service delivery.`
  },
  {
    id: 'purpose',
    icon: <Users size={20} className="text-blue-600" />,
    title: 'Core Operational Purpose',
    content: `The Platform functions as a comprehensive resource for students, exploring colleges, courses, entrance exams, and study-abroad opportunities.

We process Personal Data to:
• Connect prospective students with colleges, coaching centres, and educational partners
• Provide personalised recommendations, search results, and content
• Facilitate application processing, including domestic and international admissions

Notably, your contactable information is shared with Colleges/Educational Institutes/Coaching Centres only if:
• You have actively expressed interest in them.
• They have shortlisted you as a viable candidate for admission or communication.

For users interested in global education, the Study Abroad section assists in the university application process and related services ("The Purpose").`
  },
  {
    id: 'collection',
    icon: <Database size={20} className="text-blue-600" />,
    title: 'Data Collection Methods',
    content: `We gather information about you and your usage to continually enhance our services. Data is collected in the following ways:

• Account Registration: When creating or updating an account on Just Education, we request essential Personal Data, including your full name, email address, and contact telephone number.
• Profile Enhancement: For us to offer specialised services, we may collect deeper profile details such as your academic history, professional experience, and date of birth.
• Usage and Location Data: We track how you interact with our services, collecting technical information (like log data) and location details to understand preferences.
• Study Abroad Services: For international application assistance, we may require sensitive documents like bank statements, passport details, or academic transcripts to support services such as LORs (Letters of Recommendation), profile building, visa processing, and university applications.
• Communication Records: When you communicate with Just Education or use the Platform's features to connect with other members (e.g., advertisers, colleges), we log information regarding that communication and any additional details you volunteer.`
  },
  {
    id: 'processing',
    icon: <RefreshCw size={20} className="text-blue-600" />,
    title: 'How We Process Personal Data',
    content: `Just Education utilises your Personal Data to achieve the Purpose and for the following legitimate business activities:

• Service Optimisation: We use data from cookies and similar technologies (like pixel tags) to improve site performance, user experience, and overall service quality.
• Content Customisation: Our systems analyse your activity to deliver personalised search results, relevant recommendations, and targeted promotions or offers.
• Communication: We send you necessary alerts and promotional newsletters (you can manage subscriptions in your account settings).
• Product Improvement: We conduct internal market research and surveys to enhance and refine our offerings.
• Marketing: We use your data to send you information about new products, features, and relevant promotions.
• Security & Legal Compliance: We process data for fraud prevention, identity verification, compliance with government sanctions, and due diligence checks.
• Dispute Resolution: Data may be used to establish, exercise, or defend our legal rights in connection with any current or prospective legal proceedings.`
  },
  {
    id: 'cookies',
    icon: <Eye size={20} className="text-blue-600" />,
    title: 'Cookies and Tracking Technologies',
    content: `Our web pages employ "cookies" and other tracking methods. A cookie is a small text file used to collect data about website activity. These technologies help us recall your previous preferences.

Most browsers allow you to manage your cookie settings. You can choose to be notified when a cookie is received or block them entirely.

Be Aware: Blocking cookies may require you to re-enter login details for certain sections and could impair the functionality of some site features.

Tracking tools may log technical information such as IP addresses, browser types, operating systems, click paths, and access times.`
  },
  {
    id: 'third-party',
    icon: <Share2 size={20} className="text-blue-600" />,
    title: 'Third-Party Collaboration and Data Transfer',
    content: `We work with third-party service providers and partners to support various functionalities on Just Education. We may share necessary information, including Personal Data, with these partners solely to enable them to deliver programs, products, and services on our behalf. All such partners operate under strict confidentiality agreements.

We do not transfer your Personal Data to third parties without your explicit consent, unless it is required to provide the requested services or for mandatory legal compliance.

International Transfers: When you engage with Just Education, your information may be transferred to or stored in locations outside of India for the purposes described herein or for necessary service support. All such transfers are governed by standard data protection clauses.

External Links: Our Platform may contain links to external sites (e.g., partner institutions, advertisers, social media). This Policy does not govern the data practices of those third-party sites.`
  },
  {
    id: 'age',
    icon: <UserCheck size={20} className="text-blue-600" />,
    title: 'Minimum Age Requirement',
    content: `To use the Platform, you must be of the minimum age as specified below, or older.

• European Union Residents: The minimum age is 16 years. If local laws mandate an older age for lawful service provision, that older age applies.
• All Other Jurisdictions: If you are under 18 years old or the age of majority in your region, you must access and use Just Education under the direct supervision of a parent, legal guardian, or responsible adult.`
  },
  {
    id: 'sharing',
    icon: <Globe size={20} className="text-blue-600" />,
    title: 'Data Sharing Practices',
    content: `Access to your Personal Data is restricted to employees who require it to perform their job functions. Just Education does not rent, sell, or trade your Personal Data with unaffiliated companies, except:

• With Your Consent: When you have given us explicit permission.
• For Requested Services: To deliver the specific products or services you have requested.
• Trusted Partners: We may share limited Personal Data with verified partners who help us deliver communication, advertising, analytics, or support services.
• Legal Mandates: In response to court orders, subpoenas, or to establish/defend legal claims, or as required by law.
• Safety/Security: Personal Data may be shared when necessary to investigate fraud, prevent illegal activity, or address threats to user safety.
• Corporate Transition: In the event Just Education is acquired by or merges with another entity.
• Educational Institutions: We share your information with colleges and institutions based on your expressed interest or application behaviour. They may contact you for admission-related communication.`
  },
  {
    id: 'retention',
    icon: <Clock size={20} className="text-blue-600" />,
    title: 'Data Retention Policy',
    content: `Your Personal Data will be retained by Just Education only for the duration necessary to fulfil the purposes for which it was collected, in line with our legal, regulatory, contractual, or statutory obligations. Once the retention period expires, your data will be securely archived or fully anonymised/deleted.

Study Abroad Documentation: Sensitive documents submitted for international application services are retained only for the duration of service processing and are securely deleted afterwards unless legal retention is mandatory.`
  },
  {
    id: 'rights',
    icon: <Scale size={20} className="text-blue-600" />,
    title: 'Your Privacy Rights and Consent (TRAI/DLT)',
    content: `Under applicable laws (such as GDPR), you may have the right to exercise certain control over your Personal Data, including Access, Rectification, Erasure (Right to be Forgotten), Restriction, Data Portability, and the right to Withdraw Consent.

Communications Consent:
By using this website and/or registering with us, and by accepting this Privacy Policy, you explicitly consent to receive communications from Just Education related to educational services, and admission offers via phone calls, SMS, WhatsApp, or email.

You understand and agree that this consent applies even if your mobile number is registered under the Do Not Disturb (DND/NCPR) list, as permitted under TRAI regulations, provided such consent is recorded and maintained in accordance with the Distributed Ledger Technology (DLT) framework. This consent will remain valid for a period of 365 days from the date of registration and may be withdrawn at any time by contacting us.`
  },
  {
    id: 'security',
    icon: <Lock size={20} className="text-blue-600" />,
    title: 'Data Security and Confidentiality',
    content: `We are deeply committed to the security of your Personal Data. Just Education employs robust physical, electronic, and procedural safeguards in compliance with Indian law (including the Information Technology Act, 2000) and global best practices. We ensure that our external service providers also adhere to stringent security standards.

Only authorised personnel with a legitimate business requirement are granted access to Personal Data. All employees are trained on confidentiality and data protection obligations.`
  },
  {
    id: 'social',
    icon: <Mail size={20} className="text-blue-600" />,
    title: 'Social Media & Policy Amendments',
    content: `Social Media Interactions:
Just Education maintains official accounts on various social media platforms to inform, support, and engage with our users. You must never use social media channels to communicate sensitive Personal Data (e.g., health data, financial details). Just Education is only responsible for the information posted by our authorised employees on these platforms.

Policy Amendments:
We may update or modify this Privacy Policy at any time to reflect changes in legal requirements, service offerings, or operational processes. Any changes will become effective immediately upon posting the revised policy.

Disclaimer:
Just Education is not liable for any loss or damage arising from the inadvertent or unauthorised disclosure of user account information, including financial details (as we do not store Credit/Debit card details). Any Personal Data you voluntarily provide outside of the mandatory fields is considered a willful disclosure, and we bear no liability for any subsequent breach related to that self-furnished information.`
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276] py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <nav className="flex items-center justify-center gap-2 text-blue-200/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Privacy Policy</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-5">
            <Lock size={14} className="text-cyan-300" />
            <span>Data Protection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Policy</span>
          </h1>
          <p className="text-blue-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            We are fully committed to safeguarding your digital privacy. Learn how we collect, protect, and use your data.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-blue-200/60">
            <span className="flex items-center gap-1.5"><FileText size={13} />Last Updated: June 20, 2026</span>
            <span className="flex items-center gap-1.5"><Scale size={13} />Compliance: GDPR &amp; IT Act 2000</span>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-3 flex items-start gap-3">
          <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 font-medium">
            <strong>Data Protection Notice:</strong> This policy is integrated with our Terms of Use. By interacting with our platform, you consent to the practices described below.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <main className="w-full">
          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              return (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  <div className="flex items-center gap-3 px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600">
                      {section.icon}
                    </span>
                    <h3 className="font-bold text-lg text-[#0a2540]">
                      {section.title}
                    </h3>
                  </div>

                  <div className="px-6 py-5">
                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Card */}
          <div className="mt-8 bg-gradient-to-br from-[#0a2540] to-[#1a5276] rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Mail size={18} className="text-cyan-300" />
              Contact Our Privacy Team
            </h3>
            <p className="text-blue-200/80 text-sm mb-4">For any questions, concerns, or requests regarding this Privacy Policy or the protection of your Personal Data.</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 rounded-xl p-4 space-y-2">
                <div className="font-bold text-white">Just Education Pvt. Ltd.</div>
                <div className="flex items-start gap-2 text-blue-200/80">
                  <MapPin size={13} className="flex-shrink-0 mt-0.5 text-cyan-300" />
                  <span>4th Floor, Tower A, Cyber City<br />Gurugram, Haryana — 122002</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 space-y-2">
                <a href="mailto:privacy@justeducation.in" className="flex items-center gap-2 text-blue-200/80 hover:text-white transition-colors">
                  <Shield size={13} className="text-cyan-300" />
                  privacy@justeducation.in
                </a>
                <a href="mailto:contact@justeducation.in" className="flex items-center gap-2 text-blue-200/80 hover:text-white transition-colors">
                  <Mail size={13} className="text-cyan-300" />
                  contact@justeducation.in
                </a>
                <a href="tel:+911800001234" className="flex items-center gap-2 text-blue-200/80 hover:text-white transition-colors">
                  <Phone size={13} className="text-cyan-300" />
                  1800-000-1234 (Toll Free)
                </a>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs text-blue-200/60">
              <span className="flex items-center gap-1.5"><RefreshCw size={11} />Policy last updated: June 20, 2026</span>
              <span className="flex items-center gap-1.5"><Eye size={11} />Effective from: June 1, 2024</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
