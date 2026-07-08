import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome, Krishna 👋
        </h2>
        <p className="text-gray-400 text-sm">
          Here's your wardrobe overview.
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder-gray-400"
          />
        </div>

        <FaBell className="text-2xl text-gray-300 cursor-pointer hover:text-blue-500" />

        <FaUserCircle className="text-4xl text-blue-500 cursor-pointer" />

      </div>

    </div>
  );
}