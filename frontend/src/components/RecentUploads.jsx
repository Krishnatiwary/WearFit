import { useEffect, useState } from "react";
import axios from "axios";

export default function RecentUploads() {

  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    fetchRecentUploads();
  }, []);

  const fetchRecentUploads = async () => {
    try {

      const res = await axios.get(
        "https://wearfit-xlgs.onrender.com/clothes"
      );

      // Latest 3 uploads
      const latest = res.data.data.reverse().slice(0, 3);

      setClothes(latest);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold text-white mb-6">
        Recent Uploads
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {clothes.map((cloth) => (

          <div
            key={cloth._id}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500 transition"
          >

            <img
              src={`https://wearfit-xlgs.onrender.com/uploads/${cloth.image}`}
              alt={cloth.category}
              className="w-full h-52 object-cover rounded-xl"
            />

            <h3 className="text-white text-xl mt-4 font-semibold">
              {cloth.category}
            </h3>

            <p className="text-gray-400">
              {cloth.brand}
            </p>

            <p className="text-blue-400">
              {cloth.season}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}