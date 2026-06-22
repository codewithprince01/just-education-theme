"use client";
import Link from 'next/link';
import { ChevronRight, Shield, FileText, AlertCircle, Scale, Mail, Phone, MapPin, AlertTriangle, Info, ShieldAlert, Link as LinkIcon } from 'lucide-react';

const sections = [
  {
    id: 'general-info',
    icon: <Info size={20} className="text-blue-600" />,
    title: 'General Information Purposes Only',
    content: `The information contained on justeducation.in (the "Platform") is for general information purposes only. Just Education provides the information and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. 

Any reliance you place on such information is therefore strictly at your own risk. Users are advised to independently verify all details such as course fees, syllabus, admission dates, and ranking directly with the respective educational institution before making any decisions.`
  },
  {
    id: 'no-professional-advice',
    icon: <Scale size={20} className="text-blue-600" />,
    title: 'No Professional Advice',
    content: `The content on our Platform is not intended to be a substitute for professional educational, financial, or legal advice. Always seek the advice of qualified professionals with any questions you may have regarding your career, educational path, or financial aid. 

Just Education is an informational platform and does not guarantee admission to any institution, nor do we guarantee the outcome of any examinations, placements, or academic pursuits.`
  },
  {
    id: 'external-links',
    icon: <LinkIcon size={20} className="text-blue-600" />,
    title: 'External Links & Third Parties',
    content: `Through this website, you are able to link to other websites which are not under the control of Just Education. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.

Just Education does not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising.`
  },
  {
    id: 'errors',
    icon: <AlertTriangle size={20} className="text-blue-600" />,
    title: 'Errors and Omissions',
    content: `While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Just Education is not responsible for any errors or omissions, or for the results obtained from the use of this information. 

All information in this site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.`
  },
  {
    id: 'liability',
    icon: <ShieldAlert size={20} className="text-blue-600" />,
    title: 'Limitation of Liability',
    content: `In no event will Just Education, its affiliates, directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the website or our services, even if we have been advised of the possibility of such damages.

Every effort is made to keep the website up and running smoothly. However, Just Education takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.`
  }
];

export default function DisclaimerPage() {
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
            <span className="text-white font-medium">Disclaimer</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-5">
            <AlertCircle size={14} className="text-cyan-300" />
            <span>Legal Notice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Disclaimer</span>
          </h1>
          <p className="text-blue-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Please read this disclaimer carefully before using the Just Education platform.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-blue-200/60">
            <span className="flex items-center gap-1.5"><FileText size={13} />Last Updated: June 20, 2026</span>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-3 flex items-start gap-3">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 font-medium">
            <strong>Important:</strong> The information provided by Just Education is for general informational purposes only. We are not an educational institution nor are we officially affiliated with the government.
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
              Contact Us
            </h3>
            <p className="text-blue-200/80 text-sm mb-4">If you require any more information or have any questions about our site's disclaimer, please feel free to contact us.</p>
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
                  <Shield size={13} className="text-cyan-300" />
                  legal@justeducation.in
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
