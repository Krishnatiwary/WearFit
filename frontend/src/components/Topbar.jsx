import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";

export default function Topbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);

  // Load notification preference
  useEffect(() => {
    const loadNotificationSetting = () => {
      try {
        const saved = localStorage.getItem(
          "wearfit_settings"
        );

        if (saved) {
          const settings = JSON.parse(saved);

          setNotificationsEnabled(
            settings.notifications !== false
          );
        } else {
          setNotificationsEnabled(true);
        }
      } catch {
        setNotificationsEnabled(true);
      }
    };

    loadNotificationSetting();

    // Listen for changes from Settings page
    const handleSettingsChange = () => {
      loadNotificationSetting();
    };

    window.addEventListener(
      "wearfit-settings-change",
      handleSettingsChange
    );

    window.addEventListener(
      "storage",
      handleSettingsChange
    );

    return () => {
      window.removeEventListener(
        "wearfit-settings-change",
        handleSettingsChange
      );

      window.removeEventListener(
        "storage",
        handleSettingsChange
      );
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = search.trim();

      if (query) {
        navigate(
          `/wardrobe?search=${encodeURIComponent(query)}`
        );
      } else {
        navigate("/wardrobe");
      }
    }
  };

  const showBrowserNotification = async () => {
  if (!notificationsEnabled) {
    return;
  }

  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return;
  }

  try {
    // Get notification message from backend
    const res = await fetch(
      "http://127.0.0.1:8000/notifications/daily"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch notification");
    }

    const data = await res.json();

    // Ask browser permission
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }

    // Show browser notification
    if (Notification.permission === "granted") {
      new Notification(data.title, {
        body: data.message,
        icon: "/vite.svg",
      });
    }
  } catch (error) {
    console.error("Notification Error:", error);
  }
};

   const notifications = [
{
      id: 1,
      title: "AI Outfit Suggestion",
      message:
        "Your wardrobe is ready for a new outfit suggestion.",
      icon: "🤖",
      path: "/ai",
    },
    {
      id: 2,
      title: "Weekly Planner",
      message:
        "Plan your outfits for the upcoming week.",
      icon: "📅",
      path: "/planner",
    },
    {
      id: 3,
      title: "Wardrobe Update",
      message:
        "Check your wardrobe and explore your latest clothes.",
      icon: "👕",
      path: "/wardrobe",
    },
  ];

  const handleNotificationClick = (path) => {
    setShowNotifications(false);
    navigate(path);
  };

  const handleBellClick = () => {
  setShowNotifications(!showNotifications);

  if (!showNotifications) {
    showBrowserNotification();
  }
};

  return (
    <div className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 relative">

      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome, Krishna 👋
        </h2>

        <p className="text-gray-400 text-sm">
          Here's your wardrobe overview.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2">

          <FaSearch className="text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleSearch}
            className="bg-transparent outline-none text-white placeholder-gray-400 w-40"
          />

        </div>

        {/* Notification */}
        <div className="relative">

          <button
            onClick={() => {
            handleBellClick();
            showBrowserNotification();
            }}
             className="relative"
          >
            <FaBell
              className={`text-2xl cursor-pointer transition ${
                notificationsEnabled
                  ? "text-gray-300 hover:text-blue-500"
                  : "text-gray-600"
              }`}
            />

            {/* Badge only when enabled */}
            {notificationsEnabled && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">

                <h3 className="text-white font-semibold text-lg">
                  Notifications 🔔
                </h3>

                <button
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>

              </div>

              {/* Disabled */}
              {!notificationsEnabled && (
                <div className="px-5 py-8 text-center">

                  <div className="text-4xl mb-3">
                    🔕
                  </div>

                  <p className="text-white font-semibold">
                    Notifications are disabled
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    Enable Outfit Notifications from Settings.
                  </p>

                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate("/settings");
                    }}
                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    Open Settings
                  </button>

                </div>
              )}

              {/* Notifications */}
              {notificationsEnabled && (
                <div className="max-h-96 overflow-y-auto">

                  {notifications.map(
                    (notification) => (
                      <button
                        key={notification.id}
                        onClick={() =>
                          handleNotificationClick(
                            notification.path
                          )
                        }
                        className="w-full text-left px-5 py-4 flex gap-4 hover:bg-slate-800 transition border-b border-slate-800"
                      >

                        <div className="text-2xl">
                          {notification.icon}
                        </div>

                        <div>
                          <p className="text-white font-semibold">
                            {notification.title}
                          </p>

                          <p className="text-gray-400 text-sm mt-1">
                            {notification.message}
                          </p>
                        </div>

                      </button>
                    )
                  )}

                </div>
              )}

              {/* Footer */}
              <div className="px-5 py-3 bg-slate-950">

                <button
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Close notifications
                </button>

              </div>

            </div>
          )}

        </div>

        {/* Profile */}
        <FaUserCircle
          onClick={() =>
            navigate("/settings")
          }
          className="text-4xl text-blue-500 cursor-pointer hover:text-blue-400 transition"
        />

      </div>

    </div>
  );
}