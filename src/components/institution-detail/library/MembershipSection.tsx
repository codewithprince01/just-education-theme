'use client';

import { CheckCircle2, Star } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

export default function MembershipSection() {
  const institution = useInstitution();
  const membership = institution.sections.membership;

  if (!membership || membership.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-gray-50/60" id="section-membership">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading — centered */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Membership
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Choose Your Membership
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            Flexible plans to suit individuals, families, and corporates. Unlock unlimited access today.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {membership.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col overflow-hidden relative ${
                plan.isPopular
                  ? 'border-2 border-blue-600 ring-4 ring-blue-100'
                  : 'border border-gray-100'
              }`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                  <Star size={11} className="fill-white" />
                  Most Popular
                </div>
              )}

              {/* Top accent */}
              <div
                className={`h-1 ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-400'
                    : 'bg-gradient-to-r from-gray-200 to-gray-300'
                }`}
              />

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name */}
                <h3 className="font-extrabold text-[#0a2540] text-xl mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-5">{plan.duration}</p>

                {/* Fee */}
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-[#0a2540] tabular-nums">
                    ₹{plan.fee.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-gray-400 ml-1">/ {plan.duration}</span>
                </div>

                {/* Features checklist */}
                <ul className="flex flex-col gap-2.5 flex-1 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2
                        size={16}
                        className={`shrink-0 mt-0.5 ${
                          plan.isPopular ? 'text-blue-600' : 'text-emerald-500'
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    plan.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                      : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Get Membership
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
