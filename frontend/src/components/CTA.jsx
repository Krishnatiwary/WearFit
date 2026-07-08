export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-24">
      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold text-white">
          Ready to Build Your Digital Wardrobe?
        </h2>

        <p className="text-blue-100 text-xl mt-6">
          Upload your clothes, receive AI-powered outfit suggestions and
          organize your wardrobe smarter than ever.
        </p>

        <div className="mt-10 flex justify-center gap-5">

          <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
            Get Started
          </button>

          <button className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition">
            Learn More
          </button>

        </div>

      </div>
    </section>
  );
}