import { SKILLS } from "../constants/skills";


export default function TechSkills() {
  return (
    <section id="technical" className="py-4 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
        Technical Arsenal
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SKILLS.map((skill) => (
          <div
            key={skill.name}
            className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <img src={skill.image} alt={skill.name} className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  {skill.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {skill.level} • {skill.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}