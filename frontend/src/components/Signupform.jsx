import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <div className="w-full max-w-md bg-slate-900 rounded-3xl p-10 border border-slate-700 shadow-2xl">

      <h1 className="text-4xl font-bold text-center text-white">
        👕 Wear<span className="text-blue-500">Fit</span>
      </h1>

      <p className="text-gray-400 text-center mt-3">
        Create your account
      </p>

      <form className="mt-8 space-y-5">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 text-white font-semibold"
        >
          Create Account
        </button>

      </form>

      <p className="text-center text-gray-400 mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  );
}