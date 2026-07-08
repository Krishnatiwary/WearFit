import WardrobeCard from "../components/WardrobeCard";

export default function Wardrobe() {

  const clothes = [
    {
      id: 1,
      image: "👕",
      name: "Blue Hoodie",
      category: "Casual",
      season: "Winter",
    },
    {
      id: 2,
      image: "👔",
      name: "Black Shirt",
      category: "Formal",
      season: "All Season",
    },
    {
      id: 3,
      image: "👖",
      name: "Jeans",
      category: "Bottom Wear",
      season: "Winter",
    },
    {
      id: 4,
      image: "👟",
      name: "Sneakers",
      category: "Footwear",
      season: "All Season",
    },
    {
      id: 5,
      image: "🧥",
      name: "Jacket",
      category: "Winter Wear",
      season: "Winter",
    },
    {
      id: 6,
      image: "🩳",
      name: "Shorts",
      category: "Casual",
      season: "Summer",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-10">

      <h1 className="text-4xl font-bold text-white">
        My Wardrobe
      </h1>

      <p className="text-gray-400 mt-2">
        Organize and manage all your clothes in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

        {clothes.map((cloth) => (
          <WardrobeCard
            key={cloth.id}
            image={cloth.image}
            name={cloth.name}
            category={cloth.category}
            season={cloth.season}
          />
        ))}

      </div>

    </div>
  );
}