import {
  FaHome,
  FaTshirt,
  FaUpload,
  FaRobot,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        👕 Wear<span className="text-blue-500">Fit</span>
      </h1>

      <nav className="space-y-4">

        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-500">
          <FaHome />
          Dashboard
        </a>

        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-500">
          <FaTshirt />
          Wardrobe
        </a>

        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-500">
          <FaUpload />
          Upload
        </a>

        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-500">
          <FaRobot />
          AI Stylist
        </a>

        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-500">
          <FaCalendarAlt />
          Planner
        </a>

        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-500">
          <FaCog />
          Settings
        </a>

      </nav>

      <button className="mt-16 flex items-center gap-3 text-red-400 hover:text-red-500">
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}