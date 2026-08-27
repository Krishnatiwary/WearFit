import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WardrobeCard({
  id,
  image,
  category,
  color,
  season,
  brand,
  occasion,
}) {
  const navigate = useNavigate();

  const deleteCloth = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cloth?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/cloth/${id}`
      );

      alert("Cloth deleted successfully.");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500 transition">

      <img
        src={image}
        alt={category || "cloth"}
        className="w-full h-64 object-cover rounded-xl"
        onError={(e) => {
          console.log("Image failed:", image);
          e.currentTarget.style.display = "none";
        }}
      />

      <h2 className="text-white text-xl font-bold mt-4">
        {category}
      </h2>

      <p className="text-gray-400">
        Color : {color}
      </p>

      <p className="text-gray-400">
        Brand : {brand}
      </p>

      <p className="text-blue-400">
        Season : {season}
      </p>

      <p className="text-purple-400">
        Occasion : {occasion}
      </p>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-xl text-white"
        >
          Edit
        </button>

        <button
          onClick={deleteCloth}
          className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-xl text-white"
        >
          Delete
        </button>

      </div>

    </div>
  );
}