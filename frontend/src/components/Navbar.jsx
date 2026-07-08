export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">👕</span>
          <h1 className="text-2xl font-bold text-white">
            Wear<span className="text-blue-500">Fit</span>
          </h1>
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          <li className="cursor-pointer hover:text-blue-400 transition">
            Home
          </li>
          <li className="cursor-pointer hover:text-blue-400 transition">
            Features
          </li>
          <li className="cursor-pointer hover:text-blue-400 transition">
            About
          </li>
          <li className="cursor-pointer hover:text-blue-400 transition">
            Contact
          </li>
        </ul>

        {/* Login Button */}
        <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl text-white font-medium">
          Login
        </button>

      </div>
    </nav>
  );
}