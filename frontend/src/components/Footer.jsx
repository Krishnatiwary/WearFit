export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            👕 Wear<span className="text-blue-500">Fit</span>
          </h2>

          <p className="mt-4 text-gray-400 leading-7">
            AI Powered Smart Wardrobe that helps you organize clothes,
            plan outfits and get fashion recommendations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>Home</li>
            <li>Features</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Features
          </h3>

          <ul className="space-y-3">
            <li>AI Suggestions</li>
            <li>Wardrobe</li>
            <li>Planner</li>
            <li>Marketplace</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Connect
          </h3>

          <div className="flex gap-4 text-3xl">
            📷 💼 🐙
          </div>
        </div>

      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm">
        © 2026 WearFit. All Rights Reserved.
      </div>
    </footer>
  );
}