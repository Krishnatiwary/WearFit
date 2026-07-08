export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>

          <span className="bg-blue-600 px-4 py-2 rounded-full text-sm">
            👕 AI Powered Fashion Assistant
          </span>

          <h1 className="text-6xl font-extrabold mt-8 leading-tight">
            Organize Your <br />
            Wardrobe with AI
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            Upload your clothes, get AI outfit suggestions,
            plan weekly outfits and manage your digital wardrobe.
          </p>

          <div className="mt-10 flex gap-5">
            <button className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold">
              Get Started
            </button>

            <button className="border border-gray-500 hover:border-blue-500 px-7 py-3 rounded-xl">
              Upload Clothes
            </button>
          </div>

        </div>

        {/* Right */}
        <div className="flex justify-center">
          <div className="w-96 h-96 rounded-3xl bg-slate-800 flex items-center justify-center text-8xl shadow-2xl">
            👔
          </div>
        </div>

      </div>

    </section>
  );
}