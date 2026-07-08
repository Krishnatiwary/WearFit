export default function LoginForm() {
  return (
    <div className="w-full max-w-md bg-slate-900 rounded-3xl p-10 border border-slate-700 shadow-2xl">

      <h1 className="text-4xl font-bold text-center text-white">
        👕 Wear<span className="text-blue-500">Fit</span>
      </h1>

      <p className="text-center text-gray-400 mt-2">
        Welcome back!
      </p>

      <form className="mt-8 space-y-5">

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 text-white font-semibold"
        >
          Login
        </button>

      </form>

      <p className="text-center text-gray-400 mt-8">
        Don't have an account?{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">
          Sign Up
        </span>
      </p>

    </div>
  );
}