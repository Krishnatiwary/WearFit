export default function WardrobeCard({
  image,
  name,
  category,
  season,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500 hover:scale-105 transition duration-300">

      <div className="text-7xl text-center">
        {image}
      </div>

      <h2 className="text-white text-2xl font-bold mt-5">
        {name}
      </h2>

      <p className="text-gray-400 mt-2">
        {category}
      </p>

      <p className="text-blue-400 text-sm mt-1">
        {season}
      </p>

      <div className="flex gap-3 mt-6">

        <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-xl text-white">
          Edit
        </button>

        <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-xl text-white">
          Delete
        </button>

      </div>

    </div>
  );
}