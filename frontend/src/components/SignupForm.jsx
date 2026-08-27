import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Signup Response:", res.data);

      if (res.data.success) {
        alert(res.data.message || "Signup Successful");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response) {
        console.error("Backend Response:", error.response.data);
        alert(
          error.response.data?.message ||
            error.response.data?.detail ||
            "Signup failed"
        );
      } else {
        alert("Cannot connect to backend");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 rounded-3xl p-10 border border-slate-700 shadow-2xl">
      <h1 className="text-4xl font-bold text-center text-white">
        👕 Wear<span className="text-blue-500">Fit</span>
      </h1>

      <p className="text-gray-400 text-center mt-3">
        Create your account
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 text-white font-semibold"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-gray-400 mt-8">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}