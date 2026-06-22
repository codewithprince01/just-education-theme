import Link from "next/link";
import { ArrowRight, CalendarCheck, Compass, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-[#f8fafc] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276] px-6 py-16 text-center shadow-2xl md:px-16">
          {/* Decorative layers */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_55%)]" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-orange-300 backdrop-blur-sm">
              <ShieldCheck size={14} /> 100% Free · No Obligation
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Ready to Begin Your{" "}
              <span className="text-orange-400">Study Abroad Journey?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-blue-100/80">
              Your dream university is closer than you think. Talk to an expert
              counselor today and take the first confident step toward a global
              education.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/book-session"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 sm:w-auto"
              >
                <CalendarCheck size={20} />
                Book Free Counseling
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/search"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
              >
                <Compass size={20} />
                Explore Universities
              </Link>
            </div>

            <p className="mt-6 text-sm text-blue-100/60">
              Join 15,000+ students who started right here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
