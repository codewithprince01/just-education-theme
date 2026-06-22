"use client";
import Link from 'next/link';
import { ChevronRight, Shield, FileText, Eye, AlertCircle, Scale, RefreshCw, Mail, Phone, MapPin, Cookie, Settings, Settings2, Trash2 } from 'lucide-react';

const sections = [
  {
    id: 'intro',
    icon: <Cookie size={20} className="text-blue-600" />,
    title: 'What Are Cookies?',
    content: `A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences (such as login, language, font size, and other display preferences) over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.

At Just Education, we use cookies and similar tracking technologies (like web beacons and pixels) to enhance your browsing experience, deliver personalised content, and analyse our website traffic.`
  },
  {
    id: 'how-we-use',
    icon: <Settings size={20} className="text-blue-600" />,
    title: 'How We Use Cookies',
    content: `We use cookies for several critical purposes to ensure the Just Education platform functions optimally:

• Essential Cookies: These are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas (user login, saved colleges).
• Performance & Analytics Cookies: These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customise our website for you.
• Functionality Cookies: These cookies are used to recognise you when you return to our website. This enables us to personalise our content for you and remember your preferences (for example, your choice of language or region).
• Targeting & Advertising Cookies: These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your educational interests.`
  },
  {
    id: 'third-party',
    icon: <Share2 size={20} className="text-blue-600" />,
    title: 'Third-Party Cookies',
    content: `In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site:

• Analytics: We use Google Analytics, which is one of the most widespread and trusted analytics solutions on the web, to help us understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit.
• Advertising Partners: We use third-party advertising companies to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about educational goods and services of interest to you.
• Social Media: We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, social media sites will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold.`
  },
  {
    id: 'manage',
    icon: <Settings2 size={20} className="text-blue-600" />,
    title: 'How to Manage Cookies',
    content: `You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided by third-party services, or by setting or amending your web browser controls to accept or refuse cookies.

If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted (such as keeping your session logged in). As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.

Do Not Track (DNT) Signals: Please note that we do not alter our Site's data collection and use practices when we see a Do Not Track signal from your browser.`
  },
  {
    id: 'changes',
    icon: <RefreshCw size={20} className="text-blue-600" />,
    title: 'Changes to This Cookie Policy',
    content: `We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. 

Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies. The date at the bottom of this Cookie Policy indicates when it was last updated.`
  }
];

export default function CookiePolicyPage() {
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
            <span className="text-white font-medium">Cookie Policy</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-5">
            <Cookie size={14} className="text-cyan-300" />
            <span>Tracking Technologies</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Policy</span>
          </h1>
          <p className="text-blue-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Understand how Just Education uses cookies and similar technologies to improve your browsing experience.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-blue-200/60">
            <span className="flex items-center gap-1.5"><FileText size={13} />Last Updated: June 20, 2026</span>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-3 flex items-start gap-3">
          <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 font-medium">
            <strong>Cookie Notice:</strong> This policy supplements our Privacy Policy. By continuing to use Just Education, you consent to our use of cookies as described below.
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
              Cookie Policy Enquiries
            </h3>
            <p className="text-blue-200/80 text-sm mb-4">If you have any questions about our use of cookies or other technologies, please email us.</p>
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
// Required icon component that was missing in import
function Share2(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
}
