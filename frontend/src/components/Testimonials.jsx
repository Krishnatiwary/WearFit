const reviews = [
  {
    name: "Rahul Sharma",
    role: "College Student",
    review:
      "WearFit makes choosing outfits super easy. I save so much time every morning.",
    image: "👨‍🎓",
  },
  {
    name: "Priya Singh",
    role: "Fashion Enthusiast",
    review:
      "The AI suggestions are surprisingly accurate. The interface is beautiful too.",
    image: "👩",
  },
  {
    name: "Aman Verma",
    role: "Software Engineer",
    review:
      "I finally organized my wardrobe digitally. Amazing experience!",
    image: "👨‍💻",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <span className="text-blue-500 font-semibold">
            TESTIMONIALS
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Loved by Our Users
          </h2>

          <p className="text-gray-400 mt-4">
            Thousands of fashion lovers trust WearFit every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {reviews.map((user, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-3xl p-8 hover:scale-105 transition duration-300"
            >
              <div className="text-5xl">{user.image}</div>

              <h3 className="text-2xl font-bold mt-5">
                {user.name}
              </h3>

              <p className="text-blue-400">
                {user.role}
              </p>

              <p className="text-gray-300 mt-5 leading-7">
                "{user.review}"
              </p>

              <div className="text-yellow-400 text-2xl mt-5">
                ⭐⭐⭐⭐⭐
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}