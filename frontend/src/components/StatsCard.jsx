export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500 transition">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-gray-400">
        {title}
      </h3>

      <p className="text-3xl font-bold text-white mt-2">
        {value}
      </p>

    </div>
  );
}