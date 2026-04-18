import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { EXPERIENCES } from "../constants/Experience";
import { describe } from "node:test";
import { ABOUTME, FASTFACTS } from "../constants/aboutMe";

export default async function AboutAndWork() {
  return (
    <section id="about" className="py-4 px-6 max-w-6xl mx-auto space-y-24">
      {/* --- PART 1: STORY (Previous Section) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            {ABOUTME?.role} with <span className="text-blue-600">Purpose.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {ABOUTME?.describe}
          </p>
        </div>

        {/* Quick Stats Card (Simplified) */}
        <div className="p-1 bg-linear-to-br from-blue-500 to-cyan-400 rounded-3xl">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[calc(1.5rem-1px)]">
            <h3 className="text-xl font-bold mb-4">Fast Facts</h3>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              {FASTFACTS.facts.map((fact, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-blue-500" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- PART 2: WORK EXPERIENCE --- */}
      <div className="space-y-12">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Briefcase className="text-blue-600" size={24} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Experience</h3>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950" />

              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    {exp.role}
                  </h4>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                </div>
                <div className="flex items-center mt-1 md:mt-0 text-slate-500 text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit">
                  <Calendar size={14} className="mr-2" />
                  {exp.period_start} — {exp.period_end}
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.description.map((bullet, i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}