export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-[#0a2540] via-[#0D4B75] to-[#126094]">
      {/* Animated orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0a2540]/30 blur-2xl" />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          Join 2,50,000+ Students
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
          Start Your Preparation
          <br />
          <span className="text-cyan-300">Journey Today</span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Join APEX Coaching Institute and get access to India&rsquo;s best faculties, comprehensive study
          materials, and a proven system that turns aspirants into achievers.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-base px-8 py-3.5 rounded-xl transition-colors shadow-lg">
            Book Free Demo
          </button>
          <button className="border-2 border-white/40 text-white hover:bg-white/10 font-bold text-base px-8 py-3.5 rounded-xl transition-colors">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
}
