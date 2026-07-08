import { useState } from "react";

export default function Upload() {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-8">

      <div className="bg-slate-900 w-full max-w-2xl rounded-3xl p-10 border border-slate-800">

        <h1 className="text-4xl font-bold text-white">
          Upload Clothes
        </h1>

        <p className="text-gray-400 mt-2">
          Add new clothes to your wardrobe.
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Cloth Name"
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none"
          />

          <select className="w-full p-4 rounded-xl bg-slate-800 text-white">
            <option>Category</option>
            <option>Casual</option>
            <option>Formal</option>
            <option>Footwear</option>
            <option>Winter Wear</option>
          </select>

          <select className="w-full p-4 rounded-xl bg-slate-800 text-white">
            <option>Season</option>
            <option>Summer</option>
            <option>Winter</option>
            <option>All Season</option>
          </select>

          <input
            type="file"
            onChange={handleImage}
            className="w-full text-white"
          />

          {image && (
            <img
              src={image}
              alt="preview"
              className="rounded-2xl w-60 mt-4"
            />
          )}

          <button className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-white font-semibold">
            Upload Cloth
          </button>

        </div>

      </div>

    </div>
  );
}