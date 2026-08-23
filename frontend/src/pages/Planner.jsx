import React, { useEffect, useState } from "react";
import axios from "axios";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const occasions = [
  "College",
  "Casual",
  "Office",
  "Formal",
  "Party",
  "Wedding",
  "Gym",
  "Travel",
];

const API = "http://127.0.0.1:8000";

const Planner = () => {
  const [plans, setPlans] = useState(() => {
    try {
      const saved = localStorage.getItem("wearfit_weekly_plan");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [savedMessage, setSavedMessage] = useState("");
  const [clothes, setClothes] = useState([]);
  const [loadingClothes, setLoadingClothes] = useState(true);

  // ==========================================
  // FETCH REAL WARDROBE
  // ==========================================

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      setLoadingClothes(true);

      const res = await axios.get(`${API}/clothes`);

      setClothes(res.data.data || []);
    } catch (error) {
      console.log("Error fetching wardrobe:", error);
    } finally {
      setLoadingClothes(false);
    }
  };

  // ==========================================
  // SAVE PLANS
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "wearfit_weekly_plan",
      JSON.stringify(plans)
    );
  }, [plans]);

  // ==========================================
  // CLOTHING TYPE
  // ==========================================

  const getType = (cloth) => {
    const name = (
      cloth.name ||
      cloth.category ||
      ""
    ).toLowerCase();

    if (
      name.includes("tshirt") ||
      name.includes("t-shirt") ||
      name.includes("shirt") ||
      name.includes("top") ||
      name.includes("kurti") ||
      name.includes("hoodie") ||
      name.includes("sweatshirt") ||
      name.includes("jacket")
    ) {
      return "top";
    }

    if (
      name.includes("jeans") ||
      name.includes("pant") ||
      name.includes("trouser") ||
      name.includes("track") ||
      name.includes("short") ||
      name.includes("lower") ||
      name.includes("jogger")
    ) {
      return "bottom";
    }

    if (
      name.includes("shoe") ||
      name.includes("sneaker") ||
      name.includes("slipper") ||
      name.includes("boot") ||
      name.includes("loafer")
    ) {
      return "shoes";
    }

    return "other";
  };

  // ==========================================
  // GET CLOTHES FOR OCCASION
  // ==========================================

  const getMatchingClothes = (occasion) => {
    return clothes.filter((cloth) => {
      const clothOccasion =
        cloth.occasion?.toLowerCase().trim();

      return (
        clothOccasion === occasion.toLowerCase().trim()
      );
    });
  };

  // ==========================================
  // CREATE OUTFIT NAME
  // ==========================================

  const createOutfit = (
    top,
    bottom,
    shoes
  ) => {
    const items = [
      top,
      bottom,
      shoes,
    ].filter(Boolean);

    return {
      id: items
        .map((item) => item._id)
        .join("-"),

      name: items
        .map(
          (item) =>
            item.name ||
            item.category ||
            "Cloth"
        )
        .join(" + "),

      occasion:
        top?.occasion ||
        bottom?.occasion ||
        shoes?.occasion ||
        "",

      description: items
        .map(
          (item) =>
            `${item.color || ""} ${
              item.name ||
              item.category ||
              ""
            }`
        )
        .join(" + "),

      items,
    };
  };

  // ==========================================
  // GENERATE REAL WARDROBE OUTFITS
  // ==========================================

  const getAvailableOutfits = (occasion) => {
    const matching =
      getMatchingClothes(occasion);

    const tops = matching.filter(
      (cloth) =>
        getType(cloth) === "top"
    );

    const bottoms = matching.filter(
      (cloth) =>
        getType(cloth) === "bottom"
    );

    const shoes = matching.filter(
      (cloth) =>
        getType(cloth) === "shoes"
    );

    const generated = [];

    // Complete outfits
    if (
      tops.length > 0 &&
      bottoms.length > 0
    ) {
      tops.forEach((top) => {
        bottoms.forEach((bottom) => {
          if (shoes.length > 0) {
            shoes.forEach((shoe) => {
              generated.push(
                createOutfit(
                  top,
                  bottom,
                  shoe
                )
              );
            });
          } else {
            generated.push(
              createOutfit(
                top,
                bottom,
                null
              )
            );
          }
        });
      });
    }

    // Partial outfits
    if (generated.length === 0) {
      matching.forEach((cloth) => {
        generated.push(
          createOutfit(
            cloth,
            null,
            null
          )
        );
      });
    }

    return generated;
  };

  // ==========================================
  // UPDATE PLAN
  // ==========================================

  const updatePlan = (
    day,
    field,
    value
  ) => {
    setPlans((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [field]: value,
      },
    }));

    setSavedMessage("");
  };

  // ==========================================
  // AI SUGGEST OUTFIT
  // ==========================================

  const suggestOutfit = (day) => {
    const currentOccasion =
      plans[day]?.occasion ||
      "Casual";

    const availableOutfits =
      getAvailableOutfits(
        currentOccasion
      );

    if (
      availableOutfits.length === 0
    ) {
      setSavedMessage(
        `No ${currentOccasion} clothes found in your wardrobe.`
      );

      return;
    }

    // Pick a real wardrobe outfit
    const selected =
      availableOutfits[
        Math.floor(
          Math.random() *
            availableOutfits.length
        )
      ];

    setPlans((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        occasion:
          currentOccasion,
        outfit: selected.id,
        outfitName: selected.name,
        outfitDescription:
          selected.description,
      },
    }));

    setSavedMessage("");
  };

  // ==========================================
  // SAVE PLAN
  // ==========================================

  const savePlan = () => {
    localStorage.setItem(
      "wearfit_weekly_plan",
      JSON.stringify(plans)
    );

    setSavedMessage(
      "Weekly plan saved successfully! ✅"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  // ==========================================
  // CLEAR PLAN
  // ==========================================

  const clearPlan = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the weekly plan?"
      )
    ) {
      setPlans({});

      localStorage.removeItem(
        "wearfit_weekly_plan"
      );

      setSavedMessage(
        "Weekly plan cleared."
      );
    }
  };

  // ==========================================
  // CURRENT SELECTED OUTFIT
  // ==========================================

  const getSelectedOutfit = (day) => {
    const plan = plans[day];

    if (!plan?.outfit) {
      return null;
    }

    const availableOutfits =
      getAvailableOutfits(
        plan.occasion || "Casual"
      );

    return (
      availableOutfits.find(
        (outfit) =>
          outfit.id === plan.outfit
      ) || null
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          Weekly Planner 📅
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "17px",
            margin: 0,
          }}
        >
          Plan your outfits for the entire
          week using your wardrobe.
        </p>
      </div>

      {/* LOADING */}

      {loadingClothes && (
        <div
          style={{
            background: "#0f172a",
            border:
              "1px solid #1e293b",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "25px",
            color: "#94a3b8",
          }}
        >
          👕 Loading your wardrobe...
        </div>
      )}

      {/* SAVED MESSAGE */}

      {savedMessage && (
        <div
          style={{
            background:
              "#132e24",
            border:
              "1px solid #22c55e",
            color: "#4ade80",
            padding: "15px 20px",
            borderRadius: "12px",
            marginBottom: "25px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {savedMessage}
        </div>
      )}

      {/* WEEKLY CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "22px",
        }}
      >
        {days.map((day) => {
          const plan =
            plans[day] || {};

          const selectedOutfit =
            getSelectedOutfit(day);

          const availableOutfits =
            plan.occasion
              ? getAvailableOutfits(
                  plan.occasion
                )
              : [];

          return (
            <div
              key={day}
              style={{
                background:
                  "#0f172a",
                border:
                  "1px solid #1e293b",
                borderRadius: "18px",
                padding: "22px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              {/* DAY */}

              <h2
                style={{
                  fontSize: "23px",
                  marginBottom:
                    "20px",
                  color: "#f8fafc",
                }}
              >
                {day}
              </h2>

              {/* OCCASION */}

              <label
                style={{
                  display: "block",
                  color: "#94a3b8",
                  marginBottom:
                    "8px",
                  fontSize: "14px",
                }}
              >
                Occasion
              </label>

              <select
                value={
                  plan.occasion ||
                  ""
                }
                onChange={(e) =>
                  updatePlan(
                    day,
                    "occasion",
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius:
                    "10px",
                  border: "none",
                  background:
                    "#1e293b",
                  color: "white",
                  fontSize: "15px",
                  marginBottom:
                    "18px",
                  outline: "none",
                }}
              >
                <option value="">
                  Select Occasion
                </option>

                {occasions.map(
                  (occasion) => (
                    <option
                      key={occasion}
                      value={occasion}
                    >
                      {occasion}
                    </option>
                  )
                )}
              </select>

              {/* OUTFIT */}

              <label
                style={{
                  display: "block",
                  color: "#94a3b8",
                  marginBottom:
                    "8px",
                  fontSize: "14px",
                }}
              >
                Outfit
              </label>

              <select
                value={
                  plan.outfit ||
                  ""
                }
                onChange={(e) =>
                  updatePlan(
                    day,
                    "outfit",
                    e.target.value
                  )
                }
                disabled={
                  !plan.occasion ||
                  availableOutfits.length ===
                    0
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius:
                    "10px",
                  border: "none",
                  background:
                    "#1e293b",
                  color: "white",
                  fontSize: "15px",
                  marginBottom:
                    "18px",
                  outline: "none",
                  opacity:
                    !plan.occasion ||
                    availableOutfits.length ===
                      0
                      ? 0.6
                      : 1,
                }}
              >
                <option value="">
                  Select Outfit
                </option>

                {availableOutfits.map(
                  (outfit) => (
                    <option
                      key={outfit.id}
                      value={outfit.id}
                    >
                      {outfit.name}
                    </option>
                  )
                )}
              </select>

              {/* NO CLOTHES */}

              {plan.occasion &&
                availableOutfits.length ===
                  0 && (
                  <div
                    style={{
                      background:
                        "#3f1d1d",
                      color:
                        "#fca5a5",
                      borderRadius:
                        "10px",
                      padding:
                        "12px",
                      marginBottom:
                        "18px",
                      fontSize:
                        "13px",
                    }}
                  >
                    ⚠️ No{" "}
                    {plan.occasion}{" "}
                    clothes found
                    in your wardrobe.
                  </div>
                )}

              {/* SELECTED OUTFIT */}

              {selectedOutfit && (
                <div
                  style={{
                    background:
                      "#172554",
                    borderRadius:
                      "10px",
                    padding:
                      "13px",
                    marginBottom:
                      "18px",
                  }}
                >
                  <div
                    style={{
                      color:
                        "#60a5fa",
                      fontWeight:
                        "600",
                      marginBottom:
                        "7px",
                    }}
                  >
                    👕{" "}
                    {
                      selectedOutfit.name
                    }
                  </div>

                  <div
                    style={{
                      color:
                        "#94a3b8",
                      fontSize:
                        "13px",
                      lineHeight:
                        "1.5",
                    }}
                  >
                    {
                      selectedOutfit.description
                    }
                  </div>

                  <div
                    style={{
                      color:
                        "#a78bfa",
                      fontSize:
                        "12px",
                      marginTop:
                        "8px",
                    }}
                  >
                    {selectedOutfit.items
                      .map(
                        (item) =>
                          item.name ||
                          item.category
                      )
                      .join(
                        " + "
                      )}
                  </div>
                </div>
              )}

              {/* AI BUTTON */}

              <button
                onClick={() =>
                  suggestOutfit(day)
                }
                disabled={
                  !plan.occasion ||
                  availableOutfits.length ===
                    0
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius:
                    "10px",
                  background:
                    "#ec4899",
                  color: "white",
                  fontSize: "15px",
                  fontWeight:
                    "600",
                  cursor:
                    !plan.occasion ||
                    availableOutfits.length ===
                      0
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    !plan.occasion ||
                    availableOutfits.length ===
                      0
                      ? 0.5
                      : 1,
                }}
              >
                🤖 AI Suggest Outfit
              </button>
            </div>
          );
        })}
      </div>

      {/* BOTTOM BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "35px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={savePlan}
          style={{
            padding:
              "15px 28px",
            border: "none",
            borderRadius:
              "10px",
            background:
              "#2563eb",
            color: "white",
            fontSize:
              "16px",
            fontWeight:
              "600",
            cursor:
              "pointer",
          }}
        >
          💾 Save Weekly Plan
        </button>

        <button
          onClick={clearPlan}
          style={{
            padding:
              "15px 28px",
            border: "none",
            borderRadius:
              "10px",
            background:
              "#dc2626",
            color: "white",
            fontSize:
              "16px",
            fontWeight:
              "600",
            cursor:
              "pointer",
          }}
        >
          🗑️ Clear Plan
        </button>
      </div>
    </div>
  );
};

export default Planner;