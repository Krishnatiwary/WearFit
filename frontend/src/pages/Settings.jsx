import React, { useEffect, useState } from "react";

const defaultSettings = {
  name: "Krishna Tiwary",
  email: "tiwarykrishna20@gmail.com",
  notifications: true,
  darkMode: true,
};

const Settings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("wearfit_settings");

      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [message, setMessage] = useState("");

  const { name, email, notifications, darkMode } = settings;

  // Apply theme immediately
  useEffect(() => {
    document.body.style.backgroundColor = darkMode
      ? "#020617"
      : "#f1f5f9";

    document.body.style.color = darkMode
      ? "#ffffff"
      : "#0f172a";

    // Save theme immediately
    localStorage.setItem(
      "wearfit_settings",
      JSON.stringify(settings)
    );

    // Tell the rest of the app that theme changed
    window.dispatchEvent(
      new CustomEvent("wearfit-theme-change", {
        detail: { darkMode },
      })
    );
  }, [darkMode]);

  const updateSetting = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));

    setMessage("");
  };

  const saveSettings = () => {
    localStorage.setItem(
      "wearfit_settings",
      JSON.stringify(settings)
    );
    window.dispatchEvent(
    new Event("wearfit-settings-change")
   );

    setMessage("Settings saved successfully! ✅");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode ? "#020617" : "#f1f5f9",
        color: darkMode ? "white" : "#0f172a",
        padding: "40px",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          Settings ⚙️
        </h1>

        <p
          style={{
            color: darkMode ? "#94a3b8" : "#64748b",
            fontSize: "17px",
            margin: 0,
          }}
        >
          Manage your WearFit preferences.
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div
          style={{
            background: darkMode ? "#132e24" : "#dcfce7",
            border: "1px solid #22c55e",
            color: darkMode ? "#4ade80" : "#15803d",
            padding: "15px 20px",
            borderRadius: "12px",
            marginBottom: "25px",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}

      {/* Profile */}
      <div
        style={{
          background: darkMode ? "#0f172a" : "#ffffff",
          border: `1px solid ${
            darkMode ? "#1e293b" : "#cbd5e1"
          }`,
          borderRadius: "18px",
          padding: "25px",
          marginBottom: "22px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          👤 Profile
        </h2>

        <label
          style={{
            display: "block",
            color: darkMode ? "#94a3b8" : "#64748b",
            marginBottom: "8px",
          }}
        >
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            updateSetting("name", e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            boxSizing: "border-box",
            borderRadius: "10px",
            border: "none",
            background: darkMode ? "#1e293b" : "#e2e8f0",
            color: darkMode ? "white" : "#0f172a",
            fontSize: "15px",
            marginBottom: "18px",
            outline: "none",
          }}
        />

        <label
          style={{
            display: "block",
            color: darkMode ? "#94a3b8" : "#64748b",
            marginBottom: "8px",
          }}
        >
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            updateSetting("email", e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            boxSizing: "border-box",
            borderRadius: "10px",
            border: "none",
            background: darkMode ? "#1e293b" : "#e2e8f0",
            color: darkMode ? "white" : "#0f172a",
            fontSize: "15px",
            outline: "none",
          }}
        />
      </div>

      {/* Preferences */}
      <div
        style={{
          background: darkMode ? "#0f172a" : "#ffffff",
          border: `1px solid ${
            darkMode ? "#1e293b" : "#cbd5e1"
          }`,
          borderRadius: "18px",
          padding: "25px",
          marginBottom: "22px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          🔔 Preferences
        </h2>

        {/* Notifications */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
            borderBottom: `1px solid ${
              darkMode ? "#1e293b" : "#e2e8f0"
            }`,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "600",
                marginBottom: "5px",
              }}
            >
              Outfit Notifications
            </div>

            <div
              style={{
                color: darkMode ? "#94a3b8" : "#64748b",
                fontSize: "14px",
              }}
            >
              Receive outfit suggestions and reminders.
            </div>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) =>
              updateSetting(
                "notifications",
                e.target.checked
              )
            }
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Dark Mode */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "600",
                marginBottom: "5px",
              }}
            >
              Dark Mode 🌙
            </div>

            <div
              style={{
                color: darkMode ? "#94a3b8" : "#64748b",
                fontSize: "14px",
              }}
            >
              Change the appearance of WearFit.
            </div>
          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) =>
              updateSetting("darkMode", e.target.checked)
            }
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* AI Stylist */}
      <div
        style={{
          background: darkMode ? "#0f172a" : "#ffffff",
          border: `1px solid ${
            darkMode ? "#1e293b" : "#cbd5e1"
          }`,
          borderRadius: "18px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          🤖 AI Stylist
        </h2>

        <p
          style={{
            color: darkMode ? "#94a3b8" : "#64748b",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          WearFit AI uses your wardrobe, occasion, season
          and weather to recommend suitable outfits.
        </p>
      </div>

      {/* Save */}
      <button
        onClick={saveSettings}
        style={{
          padding: "15px 30px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        💾 Save Settings
      </button>
    </div>
  );
};

export default Settings;