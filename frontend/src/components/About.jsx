export default function About() {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
            alt="Wardrobe"
            className="w-80 mx-auto"
          />
        </div>

        <div>
          <span className="text-blue-400 font-semibold">
            ABOUT WEARFIT
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Your Smart Digital Wardrobe
          </h2>

          <p className="text-gray-300 mt-6 leading-8">
            WearFit helps you organize your wardrobe digitally and receive
            AI-powered outfit suggestions based on weather, occasion and
            your personal style.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">

            <div>
              <h3 className="text-3xl font-bold text-blue-500">100+</h3>
              <p className="text-gray-400">Outfit Suggestions</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-500">24/7</h3>
              <p className="text-gray-400">AI Assistant</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}