export default function Footer() {
  return (
    <footer className="w-full bg-pink-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">StriRise</h2>
          <p className="text-sm text-pink-100">
            Empowering women to turn passion into purpose and ideas into impact.
            Join our movement to uplift and inspire change.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-pink-100">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Skill Recommendation</a></li>
            <li><a href="#" className="hover:text-white transition">AI Roadmap</a></li>
            <li><a href="#" className="hover:text-white transition">Marketplace</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-pink-100 text-sm">
            Email: <a href="mailto:support@stririse.com" className="hover:text-white">support@stririse.com</a>
          </p>
          <p className="text-pink-100 text-sm mt-2">
            Together, let’s empower women to build, grow, and lead.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-pink-500 mt-10"></div>

      {/* Bottom Note */}
      <div className="text-center text-sm text-pink-100 mt-4">
        © {new Date().getFullYear()} <span className="font-semibold text-white">StriRise</span>.  
        All Rights Reserved.
      </div>
    </footer>
  );
}
