export default function QuickAction({ title, desc, icon }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:scale-105 transition cursor-pointer">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h2 className="text-white text-xl font-semibold">
        {title}
      </h2>

      <p className="text-gray-400 mt-2">
        {desc}
      </p>

    </div>
  );
}