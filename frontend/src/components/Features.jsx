export default function Features() {
  const features = [
    {
      icon: "👕",
      title: "Wardrobe Management",
      desc: "Store and organize all your clothes digitally.",
    },
    {
      icon: "🤖",
      title: "AI Outfit Suggestions",
      desc: "Get AI-powered outfit recommendations instantly.",
    },
    {
      icon: "📅",
      title: "Weekly Planner",
      desc: "Plan your outfits for the whole week.",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      desc: "Receive reminders for events and outfits.",
    },
  ];

  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4">
          Features
        </h2>

        <p className="text-gray-400 text-center mb-14">
          Everything you need to manage your wardrobe.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 hover:bg-blue-600 duration-300"
            >
              <div className="text-5xl mb-5">{item.icon}</div>

              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-300">
                {item.desc}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}