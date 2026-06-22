import { ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import type { LanguageCenter } from '@/data/languageCenterData';
import EnquiryForm from './EnquiryForm';

interface EnquirySidebarProps {
  center: LanguageCenter;
}

/** Desktop-only sticky enquiry sidebar. Hidden on mobile (replaced by bottom CTA). */
export default function EnquirySidebar({ center }: EnquirySidebarProps) {
  return (
    <aside id="enquiry" className="hidden lg:block scroll-mt-24">
      <div className="sticky top-24">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-[#0a2540]/5">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#0a2540] to-[#1a5276] px-6 py-5 text-white">
            <h3 className="text-lg font-extrabold">Book a Free Demo</h3>
            <p className="mt-1 text-sm text-blue-100/80">
              Get a callback within 24 hours from our language counselor.
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-5">
            <EnquiryForm />
          </div>

          {/* Quick contact */}
          <div className="grid grid-cols-2 gap-px border-t border-gray-100 bg-gray-100">
            <a
              href={`tel:${center.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 bg-white py-3 text-sm font-bold text-[#0a2540] transition-colors hover:bg-blue-50"
            >
              <Phone size={15} className="text-blue-600" /> Call
            </a>
            <a
              href={`https://wa.me/${center.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white py-3 text-sm font-bold text-[#0a2540] transition-colors hover:bg-emerald-50"
            >
              <MessageCircle size={15} className="text-emerald-600" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Trust note */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-xs font-semibold text-gray-500 shadow-sm">
          <ShieldCheck size={15} className="text-emerald-500" />
          Verified institute · 100% safe &amp; secure
        </div>
      </div>
    </aside>
  );
}
