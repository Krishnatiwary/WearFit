import { useEffect, useState } from "react";
import axios from "axios";

import RecentUploads from "../components/RecentUploads";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import QuickAction from "../components/QuickAction";
import { useNavigate } from "react-router-dom";

import {
  FaTshirt,
  FaHeart,
  FaRobot,
  FaCalendarAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";

import { MdChecklist } from "react-icons/md";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    shirts: 0,
    tshirts: 0,
    pants: 0,
  });
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }
}, [navigate]);


  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
  try {

    const res = await axios.get(
      "http://127.0.0.1:8000/dashboard/stats"
    );

    console.log("✅ Dashboard API Response:", res.data);
    console.log("✅ Stats Data:", res.data.data);

    setStats(res.data.data);

  } catch (err) {

    console.error("❌ Dashboard Error:", err);

  }
};

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
              value={stats.total}
              icon={<FaTshirt className="text-blue-500" />}
            />

            <StatsCard
              title="Shirts"
              value={stats.shirts}
              icon={<FaHeart className="text-red-500" />}
            />

            <StatsCard
              title="T-Shirts"
              value={stats.tshirts}
              icon={<FaRobot className="text-green-500" />}
            />

            <StatsCard
              title="Pants"
              value={stats.pants}
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
  path="/upload"
/>

            <QuickAction
  title="My Wardrobe"
  desc="View all your uploaded clothes."
  icon={<FaTshirt className="text-green-500" />}
  path="/wardrobe"
/>

            <QuickAction
  title="AI Stylist"
  desc="Get AI outfit recommendations."
  icon={<FaRobot className="text-pink-500" />}
  path="/ai"
/>

            <QuickAction
  title="Weekly Planner"
  desc="Plan outfits for the week."
  icon={<MdChecklist className="text-yellow-500" />}
  path="/planner"
/>

          </div>

          {/* Recent Uploads */}
          <RecentUploads />

        </div>

      </div>

    </div>
  );
}