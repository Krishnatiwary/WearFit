import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [season, setSeason] = useState("");
  const [brand, setBrand] = useState("");
  const [occasion, setOccasion] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("color", color);
    formData.append("season", season);
    formData.append("brand", brand);
    formData.append("occasion", occasion);

    try {
      const res = await axios.post(
  "https://wearfit-xlgs.onrender.com/upload",
  formData
);

      alert(res.data.message);
    } catch (err) {
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);
  alert(JSON.stringify(err.response?.data));
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 text-white"
          >
            <option value="">Select Category</option>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Footwear">Footwear</option>
            <option value="Winter Wear">Winter Wear</option>
          </select>

          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 text-white"
          >
            <option value="">Select Season</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="All Season">All Season</option>
          </select>
          <select
  value={occasion}
  onChange={(e) => setOccasion(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 text-white"
>
  <option value="">Select Occasion</option>
  <option value="College">College</option>
  <option value="Casual">Casual</option>
  <option value="Office">Office</option>
  <option value="Party">Party</option>
  <option value="Wedding">Wedding</option>
  <option value="Gym">Gym</option>
  <option value="Travel">Travel</option>
</select>

          <input
            type="text"
            placeholder="Brand (e.g. H&M, Nike)"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none"
          />

          <input
            type="text"
            placeholder="Color (e.g. Black, Blue)"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none"
          />

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

          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-white font-semibold"
          >
            Upload Cloth
          </button>

        </div>
      </div>
    </div>
  );
}