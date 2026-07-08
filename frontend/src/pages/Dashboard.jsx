import RecentUploads from "../components/RecentUploads";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import QuickAction from "../components/QuickAction";

import {
  FaTshirt,
  FaHeart,
  FaRobot,
  FaCalendarAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";

import { MdChecklist } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your wardrobe and AI suggestions here.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <StatsCard
              title="Total Clothes"
              value="124"
              icon={<FaTshirt className="text-blue-500" />}
            />

            <StatsCard
              title="Favorites"
              value="28"
              icon={<FaHeart className="text-red-500" />}
            />

            <StatsCard
              title="AI Suggestions"
              value="16"
              icon={<FaRobot className="text-green-500" />}
            />

            <StatsCard
              title="Planner"
              value="7 Days"
              icon={<FaCalendarAlt className="text-yellow-500" />}
            />
          </div>

          {/* Quick Actions */}
          <h2 className="text-3xl font-bold text-white mt-12 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickAction
              title="Upload Clothes"
              desc="Add new outfits to your wardrobe."
              icon={<FaCloudUploadAlt className="text-blue-500" />}
            />

            <QuickAction
              title="My Wardrobe"
              desc="View all your uploaded clothes."
              icon={<FaTshirt className="text-green-500" />}
            />

            <QuickAction
              title="AI Stylist"
              desc="Get AI outfit recommendations."
              icon={<FaRobot className="text-pink-500" />}
            />

            <QuickAction
              title="Weekly Planner"
              desc="Plan outfits for the week."
              icon={<MdChecklist className="text-yellow-500" />}
            />
          </div>

          {/* Recent Uploads */}
          <RecentUploads />
        </div>
      </div>
    </div>
  );
}