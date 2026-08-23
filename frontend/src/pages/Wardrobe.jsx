import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import WardrobeCard from "../components/WardrobeCard";

export default function Wardrobe() {
  const [clothes, setClothes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const fetchClothes = async () => {
    try {
      const res = await axios.get("https://wearfit-xlgs.onrender.com/clothes");
      setClothes(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  const filteredClothes = clothes.filter((cloth) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      String(cloth.category || "")
        .toLowerCase()
        .includes(query) ||
      String(cloth.color || "")
        .toLowerCase()
        .includes(query) ||
      String(cloth.brand || "")
        .toLowerCase()
        .includes(query) ||
      String(cloth.season || "")
        .toLowerCase()
        .includes(query) ||
      String(cloth.occasion || "")
        .toLowerCase()
        .includes(query)
    );
  });

  const handleSearch = (e) => {
    setSearchParams(
      e.target.value
        ? { search: e.target.value }
        : {}
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-white">
            My Wardrobe
          </h1>

          <p className="text-gray-400 mt-2">
            Organize and manage all your clothes in one place.
          </p>
        </div>

        {/* Wardrobe Search */}
        <div className="flex items-center bg-slate-800 rounded-xl px-4 py-3 w-full md:w-80">
          <span className="text-gray-400 mr-2">
            🔍
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search clothes..."
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

      </div>

      {/* Search Result */}
      {searchQuery && (
        <p className="text-gray-400 mt-6">
          Showing results for{" "}
          <span className="text-blue-400 font-semibold">
            "{searchQuery}"
          </span>
          {" "}— {filteredClothes.length} found
        </p>
      )}

      {/* Clothes */}
      {filteredClothes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

          {filteredClothes.map((cloth) => (
            <WardrobeCard
              key={cloth._id}
              id={cloth._id}
              image={`https://wearfit-xlgs.onrender.com/uploads/${cloth.image}`}
              category={cloth.category}
              color={cloth.color}
              season={cloth.season}
              brand={cloth.brand}
              occasion={cloth.occasion}
            />
          ))}

        </div>
      ) : (
        <div className="text-center mt-20">
          <div className="text-5xl mb-4">
            👕
          </div>

          <h2 className="text-2xl font-bold text-white">
            No clothes found
          </h2>

          <p className="text-gray-400 mt-2">
            Try searching for another color, brand, category or occasion.
          </p>
        </div>
      )}

    </div>
  );
}