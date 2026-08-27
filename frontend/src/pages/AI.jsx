import { useEffect, useState } from "react";
import axios from "axios";

export default function AI() {
  const [clothes, setClothes] = useState([]);
  const [occasion, setOccasion] = useState("College");
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(false);

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const API = "http://127.0.0.1:8000";

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) return "";

    // Support both a plain filename and common image field formats.
    if (typeof image === "object") {
      image =
        image.url ||
        image.path ||
        image.filename ||
        image.fileName ||
        image.name ||
        "";
    }

    let value = String(image).trim();
    if (!value) return "";

    // If an old localhost URL was saved, keep only its path and rebuild it
    // using the deployed Render backend.
    if (value.startsWith("http://") || value.startsWith("https://")) {
      if (value.includes("localhost") || value.includes("127.0.0.1")) {
        try {
          value = new URL(value).pathname;
        } catch {
          return value;
        }
      } else {
        return value;
      }
    }

    // Normalize Windows-style paths and leading slashes.
    value = value.replace(/\\/g, "/");
    value = value.replace(/^\/+/, "");

    // Handle values such as /uploads/file.jpg or uploads/file.jpg.
    const uploadsIndex = value.toLowerCase().indexOf("uploads/");
    if (uploadsIndex !== -1) {
      value = value.slice(uploadsIndex + "uploads/".length);
    }

    // If a path still contains directories, use the actual filename.
    if (value.includes("/")) {
      value = value.split("/").pop();
    }

    return `${API}/uploads/${encodeURIComponent(value)}`;
  };

  // =========================================================
  // FETCH CLOTHES + WEATHER
  // =========================================================

  useEffect(() => {
    fetchClothes();
    fetchWeather();
  }, []);

  const fetchClothes = async () => {
    try {
      const res = await axios.get(`${API}/clothes`);

      console.log("WARDROBE CLOTHES:", res.data.data);

      setClothes(res.data.data || []);
    } catch (err) {
      console.log("Error fetching clothes:", err);
    }
  };

  const fetchWeather = async () => {
    try {
      setWeatherLoading(true);

      const res = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FKolkata"
      );

      const current = res.data.current;

      setWeather({
        temperature: Number(current.temperature_2m),
        humidity: Number(current.relative_humidity_2m),
        weatherCode: current.weather_code,
      });
    } catch (err) {
      console.log("Weather error:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  // =========================================================
  // WEATHER
  // =========================================================

  const getWeatherType = () => {
    if (!weather) return "Unknown";

    const temperature = weather.temperature;

    if (temperature >= 32) return "Very Hot";
    if (temperature >= 30) return "Hot";
    if (temperature >= 24) return "Warm";
    if (temperature >= 18) return "Pleasant";
    if (temperature >= 12) return "Cool";

    return "Cold";
  };

  const getWeatherAdvice = () => {
    if (!weather) {
      return "Weather information unavailable";
    }

    const temperature = weather.temperature;
    const humidity = weather.humidity;

    if (temperature >= 30 && humidity >= 80) {
      return "☀️ Hot and humid weather — lightweight, breathable clothes are recommended.";
    }

    if (temperature >= 30) {
      return "☀️ Hot weather — light and breathable clothes are recommended.";
    }

    if (temperature >= 24 && humidity >= 80) {
      return "🌤️ Warm and humid weather — comfortable and breathable clothes are recommended.";
    }

    if (temperature >= 24) {
      return "🌤️ Warm weather — comfortable and lightweight clothes are recommended.";
    }

    if (temperature >= 18) {
      return "😊 Pleasant weather — normal comfortable clothing should work well.";
    }

    if (temperature >= 12) {
      return "🌥️ Cool weather — consider slightly warmer clothes.";
    }

    return "❄️ Cold weather — warm clothing is recommended.";
  };

  // =========================================================
  // CLOTHING TYPE
  // =========================================================

  const getType = (cloth) => {
    const name = (
      cloth.name ||
      cloth.category ||
      cloth.type ||
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

  // =========================================================
  // SEASON
  // =========================================================

  const isSeasonCompatible = (cloth) => {
    const season = (cloth.season || "").toLowerCase().trim();

    if (!season) return false;

    if (
      season === "all" ||
      season === "all season" ||
      season === "all-season"
    ) {
      return true;
    }

    if (!weather) {
      return season === "summer";
    }

    const temperature = weather.temperature;

    if (temperature >= 28) {
      return season === "summer";
    }

    if (temperature <= 18) {
      return season === "winter";
    }

    return (
      season === "summer" ||
      season === "spring" ||
      season === "autumn" ||
      season === "fall"
    );
  };

  // =========================================================
  // WEATHER COMPATIBILITY
  // =========================================================

  const isWeatherCompatible = (cloth) => {
    if (!weather) return false;

    const temperature = weather.temperature;
    const type = getType(cloth);
    const season = (cloth.season || "").toLowerCase().trim();

    if (temperature >= 32) {
      if (
        season === "summer" ||
        season === "all season" ||
        season === "all-season" ||
        season === "all"
      ) {
        return true;
      }

      return type === "top" || type === "shoes";
    }

    if (temperature >= 30) {
      if (
        season === "summer" ||
        season === "all season" ||
        season === "all-season" ||
        season === "all"
      ) {
        return true;
      }

      return type === "top";
    }

    if (temperature >= 24) {
      if (
        season === "summer" ||
        season === "all season" ||
        season === "all-season" ||
        season === "all"
      ) {
        return true;
      }

      return true;
    }

    if (temperature >= 18) {
      return true;
    }

    if (temperature < 18) {
      return (
        season === "winter" ||
        season === "all season" ||
        season === "all-season" ||
        season === "all"
      );
    }

    return false;
  };

  // =========================================================
  // HUMIDITY
  // =========================================================

  const isHumidityCompatible = (cloth) => {
    if (!weather) return false;

    const humidity = Number(weather.humidity || 0);
    const season = (cloth.season || "").toLowerCase().trim();
    const type = getType(cloth);

    if (humidity >= 80) {
      if (
        season === "summer" ||
        season === "all season" ||
        season === "all-season" ||
        season === "all"
      ) {
        return true;
      }

      return type === "top";
    }

    return true;
  };

  // =========================================================
  // COLOR
  // =========================================================

  const normalizeColor = (color) => {
    return (color || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  };

  const areColorsCompatible = (color1, color2) => {
    const a = normalizeColor(color1);
    const b = normalizeColor(color2);

    if (!a || !b) return false;

    if (a === b) return true;

    const neutrals = [
      "black",
      "white",
      "grey",
      "gray",
      "beige",
      "cream",
      "navy",
    ];

    if (neutrals.includes(a) || neutrals.includes(b)) {
      return true;
    }

    const combinations = [
      ["blue", "white"],
      ["blue", "black"],
      ["blue", "grey"],
      ["blue", "gray"],
      ["blue", "beige"],
      ["blue", "cream"],
      ["red", "black"],
      ["red", "white"],
      ["green", "black"],
      ["green", "white"],
      ["yellow", "black"],
      ["yellow", "white"],
      ["brown", "black"],
      ["brown", "white"],
      ["pink", "black"],
      ["pink", "white"],
      ["purple", "black"],
      ["purple", "white"],
      ["orange", "black"],
      ["orange", "white"],
    ];

    return combinations.some(
      ([x, y]) =>
        (a === x && b === y) ||
        (a === y && b === x)
    );
  };

  // =========================================================
  // OCCASION / TYPE SUITABILITY
  // =========================================================

  const isTypeSuitable = (type) => {
    const selected = occasion.toLowerCase();

    if (selected === "gym") {
      return (
        type === "top" ||
        type === "bottom" ||
        type === "shoes"
      );
    }

    if (
      selected === "college" ||
      selected === "casual" ||
      selected === "travel"
    ) {
      return (
        type === "top" ||
        type === "bottom" ||
        type === "shoes"
      );
    }

    if (selected === "office") {
      return type === "top" || type === "bottom";
    }

    if (
      selected === "party" ||
      selected === "wedding" ||
      selected === "formal"
    ) {
      return type === "top" || type === "bottom";
    }

    return true;
  };

  // =========================================================
  // INDIVIDUAL CLOTH SCORE
  // =========================================================

  const calculateScore = (cloth) => {
    let score = 0;

    const clothOccasion =
      (cloth.occasion || "").toLowerCase().trim();

    const selectedOccasion =
      occasion.toLowerCase().trim();

    const type = getType(cloth);

    if (clothOccasion === selectedOccasion) {
      score += 30;
    }

    if (isSeasonCompatible(cloth)) {
      score += 20;
    }

    if (isWeatherCompatible(cloth)) {
      score += 15;
    }

    if (isHumidityCompatible(cloth)) {
      score += 10;
    }

    if (isTypeSuitable(type)) {
      score += 10;
    }

    const goodColors = [
      "black",
      "white",
      "blue",
      "grey",
      "gray",
      "navy",
      "beige",
      "cream",
    ];

    if (goodColors.includes(normalizeColor(cloth.color))) {
      score += 5;
    }

    if (cloth.brand) {
      score += 5;
    }

    if (cloth.image) {
      score += 5;
    }

    return Math.min(Math.round(score), 90);
  };

  // =========================================================
  // COMPLETE OUTFIT SCORE
  // =========================================================

  const calculateOutfitScore = (
    top,
    bottom,
    shoes
  ) => {
    if (!top || !bottom) {
      return 0;
    }

    let score = 0;

    const individualScores = [
      top.score,
      bottom.score,
      shoes?.score,
    ].filter(
      (value) => typeof value === "number"
    );

    const individualAverage =
      individualScores.reduce(
        (sum, value) => sum + value,
        0
      ) / individualScores.length;

    score += individualAverage * 0.30;

    const occasionMatches =
      top.occasion?.toLowerCase() ===
        occasion.toLowerCase() &&
      bottom.occasion?.toLowerCase() ===
        occasion.toLowerCase();

    if (occasionMatches) {
      score += 20;
    }

    const seasonMatches =
      isSeasonCompatible(top) &&
      isSeasonCompatible(bottom);

    if (seasonMatches) {
      score += 15;
    }

    const weatherMatches =
      isWeatherCompatible(top) &&
      isWeatherCompatible(bottom);

    if (weatherMatches) {
      score += 10;
    }

    const humidityMatches =
      isHumidityCompatible(top) &&
      isHumidityCompatible(bottom);

    if (humidityMatches) {
      score += 5;
    }

    if (
      areColorsCompatible(
        top.color,
        bottom.color
      )
    ) {
      score += 10;
    }

    if (shoes) {
      if (
        areColorsCompatible(
          bottom.color,
          shoes.color
        )
      ) {
        score += 3;
      }

      if (
        areColorsCompatible(
          top.color,
          shoes.color
        )
      ) {
        score += 2;
      }

      if (
        occasion.toLowerCase() === "gym"
      ) {
        score += 3;
      }
    }

    if (top && bottom && shoes) {
      score += 2;
    }

    return Math.min(Math.round(score), 92);
  };

  // =========================================================
  // WHY THIS OUTFIT?
  // =========================================================

  const getOutfitReasons = (
    top,
    bottom,
    shoes
  ) => {
    const reasons = [];

    reasons.push(
      `✅ ${occasion} occasion matched`
    );

    if (weather) {
      reasons.push(
        `🌡️ Current temperature: ${weather.temperature}°C (${getWeatherType()})`
      );

      reasons.push(
        `💧 Humidity: ${weather.humidity}%`
      );
    }

    if (
      isSeasonCompatible(top) &&
      isSeasonCompatible(bottom)
    ) {
      reasons.push(
        "☀️ Top and bottom are season compatible"
      );
    }

    if (
      isWeatherCompatible(top) &&
      isWeatherCompatible(bottom)
    ) {
      reasons.push(
        "🌤️ Clothes are suitable for the current weather"
      );
    }

    if (
      isHumidityCompatible(top) &&
      isHumidityCompatible(bottom)
    ) {
      reasons.push(
        "💧 Clothing is suitable for the current humidity"
      );
    }

    if (
      areColorsCompatible(
        top?.color,
        bottom?.color
      )
    ) {
      reasons.push(
        `🎨 ${top.color} + ${bottom.color} colors work well together`
      );
    } else {
      reasons.push(
        "🎨 Top and bottom have limited color compatibility"
      );
    }

    if (shoes) {
      if (
        areColorsCompatible(
          bottom?.color,
          shoes?.color
        )
      ) {
        reasons.push(
          `👟 ${shoes.color} shoes complement the outfit`
        );
      }

      if (occasion === "Gym") {
        reasons.push(
          "💪 Shoes are suitable for Gym"
        );
      }
    }

    if (occasion === "Gym") {
      reasons.push(
        "🏋️ Top and bottom are suitable for workout"
      );
    }

    if (occasion === "College") {
      reasons.push(
        "🎓 Outfit is suitable for College"
      );
    }

    if (occasion === "Casual") {
      reasons.push(
        "😎 Outfit works well for Casual wear"
      );
    }

    if (occasion === "Office") {
      reasons.push(
        "💼 Outfit is suitable for Office"
      );
    }

    if (occasion === "Party") {
      reasons.push(
        "🎉 Outfit is suitable for Party"
      );
    }

    if (occasion === "Wedding") {
      reasons.push(
        "💍 Outfit is suitable for Wedding"
      );
    }

    if (occasion === "Travel") {
      reasons.push(
        "✈️ Outfit is suitable for Travel"
      );
    }

    return reasons;
  };

  // =========================================================
  // GET SUGGESTIONS
  // =========================================================

  const getSuggestions = () => {
    setLoading(true);
    setOutfit(null);

    const matchingClothes = clothes
      .filter((cloth) => {
        const clothOccasion =
          cloth.occasion?.toLowerCase().trim();

        return (
          clothOccasion ===
          occasion.toLowerCase().trim()
        );
      })
      .map((cloth) => ({
        ...cloth,
        type: getType(cloth),
        score: calculateScore(cloth),
      }))
      .sort(
        (a, b) => b.score - a.score
      );

    const tops = matchingClothes.filter(
      (cloth) => cloth.type === "top"
    );

    const bottoms = matchingClothes.filter(
      (cloth) => cloth.type === "bottom"
    );

    const shoes = matchingClothes.filter(
      (cloth) => cloth.type === "shoes"
    );

    let bestOutfit = null;
    let bestScore = -1;

    if (
      tops.length > 0 &&
      bottoms.length > 0
    ) {
      tops.forEach((top) => {
        bottoms.forEach((bottom) => {
          if (shoes.length > 0) {
            shoes.forEach((shoe) => {
              const score =
                calculateOutfitScore(
                  top,
                  bottom,
                  shoe
                );

              if (score > bestScore) {
                bestScore = score;

                bestOutfit = {
                  items: [
                    {
                      ...top,
                      role: "Top",
                    },
                    {
                      ...bottom,
                      role: "Bottom",
                    },
                    {
                      ...shoe,
                      role: "Shoes",
                    },
                  ],
                  complete: true,
                  score,
                  reasons:
                    getOutfitReasons(
                      top,
                      bottom,
                      shoe
                    ),
                };
              }
            });
          } else {
            const score =
              calculateOutfitScore(
                top,
                bottom,
                null
              );

            if (score > bestScore) {
              bestScore = score;

              bestOutfit = {
                items: [
                  {
                    ...top,
                    role: "Top",
                  },
                  {
                    ...bottom,
                    role: "Bottom",
                  },
                ],
                complete: true,
                score,
                reasons:
                  getOutfitReasons(
                    top,
                    bottom,
                    null
                  ),
              };
            }
          }
        });
      });
    }

    // =====================================================
    // PARTIAL OUTFIT
    // =====================================================

    if (!bestOutfit) {
      const selectedTop =
        tops[0] || null;

      const selectedBottom =
        bottoms[0] || null;

      const selectedShoes =
        shoes[0] || null;

      const items = [
        selectedTop
          ? {
              ...selectedTop,
              role: "Top",
            }
          : null,

        selectedBottom
          ? {
              ...selectedBottom,
              role: "Bottom",
            }
          : null,

        selectedShoes
          ? {
              ...selectedShoes,
              role: "Shoes",
            }
          : null,
      ].filter(Boolean);

      if (items.length > 0) {
        const averageScore =
          items.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) / items.length;

        bestOutfit = {
          items,

          complete: false,

          score: Math.min(
            Math.round(averageScore),
            85
          ),

          reasons: [
            `⚠️ Only ${items.length} suitable clothing item(s) found`,
            `👕 Add more ${occasion} clothes to improve the outfit`,
          ],
        };
      }
    }

    // =====================================================
    // NOTHING FOUND
    // =====================================================

    if (!bestOutfit) {
      setOutfit({
        items: [],
        complete: false,
        score: 0,
        reasons: [],
      });
    } else {
      bestOutfit.score = Math.min(
        Number(bestOutfit.score) || 0,
        92
      );

      bestOutfit.items =
        bestOutfit.items.map((item) => ({
          ...item,
          score: Math.min(
            Number(item.score) || 0,
            90
          ),
        }));

      setOutfit(bestOutfit);
    }

    setLoading(false);
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <h1 className="text-4xl font-bold text-white">
          AI Outfit Suggestions 🤖
        </h1>

        <p className="text-gray-400 mt-2">
          Choose an occasion and get a complete
          outfit based on your wardrobe and weather.
        </p>

        {/* WEATHER */}

        {!weatherLoading && weather && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>
                <h2 className="text-white text-2xl font-bold">
                  🌤️ Current Weather
                </h2>

                <p className="text-gray-400 mt-1">
                  Delhi, India
                </p>
              </div>

              <div className="flex gap-8">

                <div>
                  <p className="text-gray-400">
                    Temperature
                  </p>

                  <p className="text-blue-400 text-3xl font-bold">
                    {weather.temperature}°C
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Humidity
                  </p>

                  <p className="text-purple-400 text-3xl font-bold">
                    {weather.humidity}%
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Weather
                  </p>

                  <p className="text-green-400 text-xl font-bold mt-2">
                    {getWeatherType()}
                  </p>
                </div>

              </div>

            </div>

            <p className="text-gray-300 mt-5">
              {getWeatherAdvice()}
            </p>

          </div>
        )}

        {/* WEATHER LOADING */}

        {weatherLoading && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-8">
            <p className="text-gray-400">
              🌤️ Loading current weather...
            </p>
          </div>
        )}

        {/* OCCASION */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-6">

          <label className="text-white font-semibold">
            Select Occasion
          </label>

          <select
            value={occasion}
            onChange={(e) => {
              setOccasion(e.target.value);
              setOutfit(null);
            }}
            className="w-full mt-3 p-3 rounded-xl bg-slate-800 text-white"
          >

            <option value="College">
              College
            </option>

            <option value="Casual">
              Casual
            </option>

            <option value="Office">
              Office
            </option>

            <option value="Formal">
              Formal
            </option>

            <option value="Party">
              Party
            </option>

            <option value="Wedding">
              Wedding
            </option>

            <option value="Gym">
              Gym
            </option>

            <option value="Travel">
              Travel
            </option>

          </select>

          <button
            onClick={getSuggestions}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
          >
            {loading
              ? "Creating Best Outfit..."
              : "Get Outfit Suggestions ✨"}
          </button>

        </div>

        {/* OUTFIT */}

        {outfit &&
          outfit.items.length > 0 && (

          <div className="mt-10">

            <h2 className="text-3xl font-bold text-white mb-2">
              AI Outfit for {occasion} 🤖
            </h2>

            <p className="text-gray-400 mb-6">
              AI selected the best matching clothes
              using your wardrobe, occasion,
              season and current weather.
            </p>

            {/* OVERALL SCORE */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">

              <p className="text-green-400 text-2xl font-bold">
                🎯 Overall Outfit Score:{" "}
                {Math.min(
                  Number(outfit.score) || 0,
                  92
                )}
                %
              </p>

              <p className="text-gray-400 mt-2">
                Occasion + season + weather +
                humidity + color compatibility +
                wardrobe matching.
              </p>

            </div>

            {/* WHY THIS OUTFIT */}

            {outfit.reasons &&
              outfit.reasons.length > 0 && (

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

                <h3 className="text-2xl font-bold text-white mb-4">
                  💡 Why this outfit?
                </h3>

                <div className="space-y-3">

                  {outfit.reasons.map(
                    (reason, index) => (
                      <p
                        key={index}
                        className="text-gray-300 text-lg"
                      >
                        {reason}
                      </p>
                    )
                  )}

                </div>

              </div>
            )}

            {/* COMPLETE / PARTIAL */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8">

              {outfit.complete ? (

                <p className="text-green-400 font-semibold text-lg">
                  ✅ Complete Outfit Found
                </p>

              ) : (

                <p className="text-yellow-400 font-semibold text-lg">
                  ⚠️ Partial Outfit — Add more
                  clothes to your wardrobe
                </p>

              )}

            </div>

            {/* CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {outfit.items.map((cloth) => (

                <div
                  key={cloth._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                >

                  <img
                    src={getImageUrl(
                      cloth.image ||
                      cloth.imageUrl ||
                      cloth.image_url ||
                      cloth.photo ||
                      cloth.photoUrl ||
                      cloth.file
                    )}
                    alt={
                      cloth.name ||
                      cloth.category ||
                      "Cloth"
                    }
                    onError={(e) => {
                      console.log(
                        "IMAGE FAILED:",
                        {
                          image: cloth.image,
                          imageUrl: cloth.imageUrl,
                          image_url: cloth.image_url,
                          photo: cloth.photo,
                          photoUrl: cloth.photoUrl,
                          finalUrl: getImageUrl(
                            cloth.image ||
                            cloth.imageUrl ||
                            cloth.image_url ||
                            cloth.photo ||
                            cloth.photoUrl ||
                            cloth.file
                          ),
                        }
                      );
                      e.currentTarget.style.display =
                        "none";
                    }}
                    className="w-full h-64 object-cover rounded-xl"
                  />

                  <h3 className="text-white text-xl font-bold mt-4">
                    {cloth.name ||
                      cloth.category}
                  </h3>

                  <p className="text-blue-300 mt-2 font-semibold">
                    👕 Role: {cloth.role}
                  </p>

                  <p className="text-gray-400">
                    Type: {cloth.type}
                  </p>

                  <p className="text-gray-400">
                    Color: {cloth.color}
                  </p>

                  <p className="text-gray-400">
                    Brand: {cloth.brand}
                  </p>

                  <p className="text-blue-400">
                    Season: {cloth.season}
                  </p>

                  <p className="text-purple-400">
                    Occasion: {cloth.occasion}
                  </p>

                  <div className="mt-4 bg-slate-800 rounded-lg p-3">

                    <p className="text-green-400 font-semibold">
                      AI Match Score:{" "}
                      {Math.min(
                        Number(cloth.score) || 0,
                        90
                      )}
                      %
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* NO RESULT */}

        {outfit &&
          outfit.items.length === 0 && (

          <div className="bg-slate-900 rounded-2xl p-10 mt-10 text-center">

            <p className="text-gray-400 text-lg">
              No suitable clothes found for{" "}
              <span className="text-white font-semibold">
                {occasion}
              </span>.
            </p>

            <p className="text-gray-500 mt-2">
              Try another occasion or add more
              clothes.
            </p>

          </div>
        )}

        {/* INITIAL */}

        {!outfit && !loading && (

          <div className="bg-slate-900 rounded-2xl p-10 mt-10 text-center">

            <p className="text-gray-400 text-lg">
              Select an occasion and click{" "}
              <span className="text-white font-semibold">
                Get Outfit Suggestions
              </span>
            </p>

          </div>
        )}

      </div>
    </div>
  );
}