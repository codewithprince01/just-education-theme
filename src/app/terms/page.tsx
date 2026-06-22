"use client";
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Shield, FileText, Eye, AlertCircle, Users, Scale, RefreshCw, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

const sections = [
  {
    id: 'overview',
    icon: '🌐',
    title: 'Website Overview',
    content: `Just Education ("we", "us", "our") is the manager, moderator, and operator of justeducation.in and all its versions including mobile and applications. Just Education is an education discovery and search platform that helps students find the best universities, colleges, schools, coaching institutes, libraries, training centers, and other educational institutions across India.

Just Education assists students by providing information on admission processes, course details, fees, placements, and rankings of educational institutions. We guide students through the application process and acquaint them with all available study options.

Just Education does not submit applications or registrations on behalf of any institution, irrespective of whether they are a partner institution or another listed institution. By using our platform to express interest in any institution, the student is deemed to have requested assistance from the Just Education team only.`
  },
  {
    id: 'eligibility',
    icon: '✅',
    title: 'Eligibility',
    content: `This website is not designed to attract users below 13 years of age, and we do not intentionally collect data from users below the specified age. By accessing or using the portal, the user is deemed to have warranted and represented that he/she fulfils the aforesaid minimum age requirement.

Upon receipt of any information indicating a user is below 13 years of age, the user account and all associated information shall be promptly deleted from our systems. Parents or guardians who believe their child has provided us with personal information should contact us immediately at privacy@justeducation.in.`
  },
  {
    id: 'account',
    icon: '👤',
    title: 'Creating a User Account',
    content: `Just Education intends to protect the private information provided by the user while creating a user account, as per the terms and conditions specified herein. By creating an account, the user agrees to:

• Maintain the confidentiality of their username and password and shall be solely liable for any activity conducted using the user account.
• Accept all risk and responsibilities for activity conducted under their username.
• Provide accurate, complete, and current information during registration.
• Receive SMS, RCS, WhatsApp, and email communications containing information about institutions, courses, and related educational services they have applied to or shown interest in.
• Notify Just Education immediately of any unauthorized use of their account.

Just Education reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent, abusive, or otherwise harmful activity.`
  },
  {
    id: 'privacy',
    icon: '🔒',
    title: 'Privacy Policy',
    content: `The privacy policy is applicable only for Just Education and not for websites linked through our platform, which shall be governed by their respective privacy policies and/or terms of use. The website utilizes cookies and other tracking technologies. Some cookies and other technologies may serve to recall Personal Information previously indicated by a web user. Most browsers allow you to control cookies, including whether or not to accept them and how to remove them.

Information Collected:
• Contact Forms: Forms on the website collect user interests, educational qualifications, and contact details to simplify the institution discovery process.
• Login/Signup: By creating a user account, visitors agree to our terms and conditions. The data collected may consist of personal or non-personal information.

We may store, collect, use, and process your information in India subject to compliance under applicable laws. The website collects user information to provide suggestions tailored to the student's profile and keep them informed about ongoing application processes, entrance exams, and admission deadlines.`
  },
  {
    id: 'data-usage',
    icon: '📊',
    title: 'Use of Collected Data',
    content: `Just Education may use the data collected through the website in the following ways:

a) Opt-in Communications: We send customized emails and messages to users who opt in for newsletters, admission updates, or entrance test notifications. Users can unsubscribe at any time.

b) Feedback and Surveys: We may contact visitors or users for feedback on new features, services, or to improve the platform experience.

c) Geographical Data: We use geographical and demographical data to provide location-specific, customized results and institution recommendations.

d) Cookies and IP Data: Used to deliver the most relevant search results, personalized recommendations, and improve the overall user experience.

e) Analytics and Trends: Data collected through our platform may be used in trend analysis and may be aggregated and shared with educational service providers depending on usage patterns and user consent.

f) Communications: Email, SMS, and phone communications for administrative purposes including informing users of admission deadlines, course changes, or institution updates they are interested in.

g) Targeted Advertising: Display of relevant banner and similar advertising to users in connection with the site based on their stated educational interests.

By using this website and/or registering with us, you explicitly consent to receive communications from Just Education related to educational services and admission offers via phone calls, SMS, WhatsApp, or email. You understand and agree that this consent applies even if your mobile number is registered under the Do Not Disturb (DND/NCPR) list, as permitted under TRAI regulations, provided such consent is recorded and maintained in accordance with the DLT framework. This consent will remain valid for a period of 365 days from the date of registration.`
  },
  {
    id: 'opt-out',
    icon: '🚫',
    title: 'Opt-Out of Communications',
    content: `You have the right to opt out of receiving promotional emails, SMS, phone calls, or any other marketing communications from Just Education at any time. To exercise this right:

• Email Opt-Out: Click the "Unsubscribe" link included in every marketing email or follow the opt-out instructions provided in the communication.
• SMS/Phone Opt-Out: Contact us directly at privacy@justeducation.in to request removal from our contact list.
• Targeted Ads: Adjust your preferences on the website or through the opt-out options provided in our communications.

Please note that it may take up to 7 business days for all communications to stop, and some messages may be delivered during this transition period. Please note that opting out of promotional communications does not opt you out of transactional or administrative messages (such as application status updates or deadline reminders) which are essential to the service.`
  },
  {
    id: 'third-party',
    icon: '🔗',
    title: 'Third-Party Content & Links',
    content: `Just Education is not liable for any loss caused due to external links available on the website. We strongly advise users to verify all information with primary sources before making any decisions based on advertisements or content on linked websites.

User-Generated Content: Users providing testimonials, reviews, or ratings are entitled to public display of such content and it may also be shared with our partner institutions. By using this website, users agree not to use any foul, offensive, or defamatory language in any forum or publicly available comment section.

We are not responsible for, and do not endorse, any third-party content, including information and reviews about any institution provided by other users. We make no guarantees about the accuracy, currency, suitability, reliability, or quality of such information and assume no responsibility for unintended, objectionable, inaccurate, misleading, or unlawful content made available by users, advertisers, and third parties.

Review Policy: Just Education's review policy ensures that student reviews are based on honest personal experiences. Incentives, if offered, are solely for participation and not for favorable opinions. All content is moderated for quality and compliance with data privacy and consumer protection laws.

Affiliate Links: Some external links may be affiliate or referral links, which means we may earn a commission if you click through or apply via them — at no additional cost to you. Such links will be identified where possible.`
  },
  {
    id: 'intellectual-property',
    icon: '©️',
    title: 'Intellectual Property Rights',
    content: `Unless stated otherwise, Just Education holds all rights to the digital content available throughout the website, including site layout, software, images, photographs, text, services, and other similar materials.

Trademarks, logos, and service marks of Just Education cannot be used or displayed for any commercial or non-commercial purpose without prior written permission from the company.

However, materials and content including data, text, graphics, images, audio and video clips, logos, icons, and links used on this website that belong to third parties and/or institutions — collected from the public domain under fair usage policy — are published strictly for informational and/or identification purposes only and are not the intellectual property of Just Education.

All data mining activities including scraping, crawling, and republishing are strictly prohibited without obtaining prior written permission from Just Education. Content downloaded from the website does not confer any rights or title to use it for commercial purposes.`
  },
  {
    id: 'liability',
    icon: '⚖️',
    title: 'Limitation of Liability',
    content: `By using Just Education, you agree that we will not be liable under any legal theory for any issues caused by third parties. The website is also not liable to verify or independently justify information provided by participants, including educational institutions, coaching institutes, or individual comments and reviews.

To protect users, we highly recommend that every piece of information available on the website be independently verified before being acted upon. Just Education is not liable for any misinformation, data theft, any kind of loss, or system damage occurring due to the use of external links.

Just Education declares that it will not be used to propagate any malicious or harmful software. In any case of program loss or system damage arising from the use of our website, Just Education cannot be held responsible.

The terms and policies of Just Education do not govern the use of third-party websites, applications, or services accessed through links on our platform.

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, JUST EDUCATION AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, AND LICENSORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, OR GOODWILL.`
  },
  {
    id: 'refund',
    icon: '💳',
    title: 'Refund & Cancellation Policy',
    content: `All monetary transactions conducted by users of the site are processed through our payment gateway partners, and we take no responsibility for any payment discrepancies arising from third-party payment systems.

Just Education reserves the right to consider and review refund requests if the amount paid by the user is in excess of the services or applications they have subscribed to. We have complete authority to review preferences as filled by the user if there is a shortfall or excess of payment.

Users are required to note their Transaction ID and receipt number as provided by the payment gateway to furnish information or track the payment status of any transaction. Any pending amount to be paid by the user will need to be settled before applicable deadlines.

Just Education cannot be held liable for non-acceptance of applications due to late payment, and no refund will be entertained in such cases. For all refund requests, please contact us at billing@justeducation.in within 7 days of the transaction.`
  },
  {
    id: 'governing-law',
    icon: '🏛️',
    title: 'Governing Law & Jurisdiction',
    content: `These Terms and Conditions shall be governed by and construed in accordance with the Laws of India. Any dispute, claim, or controversy arising out of or relating to these Terms or the use of Just Education shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.

If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions will continue in full force and effect. The failure of Just Education to enforce any right or provision of these Terms will not be considered a waiver of those rights.`
  },
  {
    id: 'amendments',
    icon: '📝',
    title: 'Changes to Terms & Privacy Policy',
    content: `Just Education reserves the right to amend or modify these Terms of Use and Privacy Policy at any time, as and when the need arises. We will make reasonable efforts to notify users of significant changes via email or a prominent notice on the website.

We request you to regularly check this page to keep yourself apprised of any changes. Your continued use of the platform following the posting of changes constitutes your unconditional acceptance of such changes.

These Terms were last updated on June 20, 2026. If you have any questions or concerns about changes to our Terms and Privacy Policy, please contact us at legal@justeducation.in before continuing to use our services.`
  },
];

export default function TermsPage() {
  const [openSection, setOpenSection] = useState<string | null>('overview');

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
            <span className="text-white font-medium">Terms & Conditions</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-5">
            <Shield size={14} className="text-cyan-300" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Terms &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Conditions</span>
          </h1>
          <p className="text-blue-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Please read carefully before using the Just Education portal. By accessing and using our services, you accept these Terms in full.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-blue-200/60">
            <span className="flex items-center gap-1.5"><FileText size={13} />Last Updated: June 20, 2026</span>
            <span className="flex items-center gap-1.5"><Scale size={13} />Governing Law: India</span>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-3 flex items-start gap-3">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 font-medium">
            <strong>Important:</strong> If you disagree with any of these conditions, you must not use this website. By continuing to use Just Education, you unconditionally accept all terms stated herein.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        {/* Main Content */}
        <main className="w-full">
          {/* Intro */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#0a2540] mb-3 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                Website Usage Policy
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Welcome to <strong>Just Education</strong> — your trusted platform for discovering the best educational institutions across India. These Terms and Conditions cover every individual visiting this website. It is assumed that by accessing and using Just Education, you accept this "Terms of Use" in full and have read and consented, univocally and irrevocably, to the same.
              </p>
            </div>

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
                      <span className="text-xl">{section.icon}</span>
                      <h3 className="font-bold text-base text-[#0a2540]">
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
            <div className="mt-8 bg-gradient-to-br from-[#0a2540] to-[#1a5276] rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Mail size={18} className="text-cyan-300" />
                For Any Clarification
              </h3>
              <p className="text-blue-200/80 text-sm mb-4">Reach out to our legal or support team for any queries regarding these terms.</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-white">Just Education Pvt. Ltd.</div>
                  <div className="flex items-start gap-2 text-blue-200/80">
                    <MapPin size={13} className="flex-shrink-0 mt-0.5 text-cyan-300" />
                    <span>4th Floor, Tower A, Cyber City<br />Gurugram, Haryana — 122002</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 space-y-2">
                  <a href="mailto:legal@justeducation.in" className="flex items-center gap-2 text-blue-200/80 hover:text-white transition-colors">
                    <Mail size={13} className="text-cyan-300" />
                    legal@justeducation.in
                  </a>
                  <a href="mailto:privacy@justeducation.in" className="flex items-center gap-2 text-blue-200/80 hover:text-white transition-colors">
                    <Shield size={13} className="text-cyan-300" />
                    privacy@justeducation.in
                  </a>
                  <a href="tel:+911800001234" className="flex items-center gap-2 text-blue-200/80 hover:text-white transition-colors">
                    <Phone size={13} className="text-cyan-300" />
                    1800-000-1234 (Toll Free)
                  </a>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs text-blue-200/60">
                <span className="flex items-center gap-1.5"><RefreshCw size={11} />Terms last updated: June 20, 2026</span>
                <span className="flex items-center gap-1.5"><Scale size={11} />Jurisdiction: New Delhi, India</span>
                <span className="flex items-center gap-1.5"><Eye size={11} />Effective from: June 1, 2024</span>
              </div>
            </div>
          </main>
      </div>
    </div>
  );
}
