import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-3xl font-bold text-white mb-10">
        👕 Wear<span className="text-blue-500">Fit</span>
      </h1>

      <nav className="space-y-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-blue-500 text-left"
        >
          <FaHome />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/wardrobe")}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-blue-500 text-left"
        >
          <FaTshirt />
          Wardrobe
        </button>

        <button
          onClick={() => {
            console.log("Upload clicked");
            navigate("/upload");
          }}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-blue-500 text-left"
        >
          <FaUpload />
          Upload
        </button>

        <button
          onClick={() => navigate("/ai")}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-blue-500 text-left"
        >
          <FaRobot />
          AI Stylist
        </button>

        <button
          onClick={() => navigate("/planner")}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-blue-500 text-left"
        >
          <FaCalendarAlt />
          Planner
        </button>

        <button
          onClick={() => navigate("/settings")}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-blue-500 text-left"
        >
          <FaCog />
          Settings
          </button>

        
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="mt-16 flex items-center gap-3 text-red-400 hover:text-red-500"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}