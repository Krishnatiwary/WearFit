import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditCloth() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [season, setSeason] = useState("");
  const [brand, setBrand] = useState("");
  const [occasion, setOccasion] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchCloth();
  }, []);

  const fetchCloth = async () => {
    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/cloth/${id}`
      );

      const cloth = res.data.data;

      setCategory(cloth.category);
      setColor(cloth.color);
      setSeason(cloth.season);
      setBrand(cloth.brand);
      setOccasion(cloth.occasion || "");

      setPreview(
        `http://127.0.0.1:8000/uploads/${cloth.image}`
      );

    } catch (err) {
      console.log(err);
    }
  };

  const updateCloth = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("category", category);
      formData.append("color", color);
      formData.append("season", season);
      formData.append("brand", brand);
      formData.append("occasion", occasion);
      console.log("Occasion being sent:", occasion);

      if (image) {
        formData.append("file", image);
      }

      await axios.put(
        `http://127.0.0.1:8000/cloth/${id}`,
        formData
      );

      alert("Cloth Updated Successfully.");

      navigate("/wardrobe");

    } catch (err) {
      console.log(err);
      alert("Update Failed.");
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-10">

      <form
        onSubmit={updateCloth}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-xl"
      >

        <h1 className="text-white text-3xl font-bold mb-8">
          Edit Cloth
        </h1>

        {preview && (
          <img
            src={preview}
            alt=""
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
        )}

        <input
          type="text"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white"
        />

        <select
  value={occasion}
  onChange={(e) => setOccasion(e.target.value)}
  className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white"
>
  <option value="">Select Occasion</option>
  <option value="College">College</option>
  <option value="Casual">Casual</option>
  <option value="Office">Office</option>
  <option value="formal">Formal</option>
  <option value="Party">Party</option>
  <option value="Wedding">Wedding</option>
  <option value="Gym">Gym</option>
  <option value="Travel">Travel</option>
</select>

        <input
          type="text"
          value={color}
          onChange={(e)=>setColor(e.target.value)}
          placeholder="Color"
          className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white"
        />

        <input
          type="text"
          value={season}
          onChange={(e)=>setSeason(e.target.value)}
          placeholder="Season"
          className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white"
        />

        <input
          type="text"
          value={brand}
          onChange={(e)=>setBrand(e.target.value)}
          placeholder="Brand"
          className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white"
        />

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
          className="text-white mb-6"
        />

        <button
          className="w-full bg-blue-600 py-3 rounded-xl text-white font-semibold hover:bg-blue-700"
        >
          Save Changes
        </button>

      </form>

    </div>

  );
}
