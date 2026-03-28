export default function Footer() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/business_suggestion", label: "AI Advisor" },
    { href: "/market_place", label: "Marketplace" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative w-full bg-[#0d0208] text-white overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-600/50 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-pink-700/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-600 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-900/40">
              <span className="text-xs font-extrabold">S</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight">StriRise</span>
          </div>
          <p className="text-sm text-white/45 leading-relaxed max-w-xs">
            Empowering women to turn passion into purpose and ideas into impact.
            Join our movement to uplift and inspire change.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 mt-1">
            {["twitter", "instagram", "linkedin"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 rounded-lg border border-pink-900/40 bg-pink-950/30 flex items-center justify-center text-white/40 hover:text-pink-300 hover:border-pink-600/50 hover:bg-pink-900/20 transition-all duration-300"
              >
                {s === "twitter" && (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )}
                {s === "instagram" && (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                )}
                {s === "linkedin" && (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-pink-400/70">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-200"
                >
                  <span className="w-0 h-px bg-gradient-to-r from-pink-500 to-rose-400 group-hover:w-4 transition-all duration-300 rounded-full" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-pink-400/70">
            Contact Us
          </h3>
          <a
            href="mailto:support@stririse.com"
            className="flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-200 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-500/60 group-hover:text-pink-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@stririse.com
          </a>
          <p className="text-sm text-white/35 leading-relaxed max-w-xs">
            Together, let's empower women to build, grow, and lead.
          </p>

          {/* Newsletter hint */}
          <div className="mt-2 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-pink-900/30 bg-pink-950/20 w-full max-w-xs">
            <input
              type="email"
              placeholder="Your email..."
              className="flex-1 bg-transparent text-sm text-white/60 placeholder-white/25 outline-none"
            />
            <button className="text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors whitespace-nowrap">
              Subscribe →
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-900/40 to-transparent mx-auto max-w-7xl" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
        <span>
          © {new Date().getFullYear()}{" "}
          <span className="text-white/50 font-semibold">StriRise</span>.
          All Rights Reserved.
        </span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
