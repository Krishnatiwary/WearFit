export default function RecentUploads() {
  const clothes = [
    {
      name: "Blue Hoodie",
      image: "👕",
      type: "Casual",
    },
    {
      name: "Black Shirt",
      image: "👔",
      type: "Formal",
    },
    {
      name: "Sneakers",
      image: "👟",
      type: "Footwear",
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">
        Recent Uploads
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {clothes.map((cloth, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500 transition"
          >
            <div className="text-6xl">{cloth.image}</div>

            <h3 className="text-white text-xl mt-4 font-semibold">
              {cloth.name}
            </h3>

            <p className="text-gray-400">
              {cloth.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}