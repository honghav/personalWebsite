// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import TechSkills from '../../component/TechSkills';
import AboutMe from '../../component/aboutMe';
import SocialLinks from '../../component/contact';
import { PROJECTS } from '../../constants/feature';
import { MYSELF } from '../../constants/general';

export default async function Home() {
  // const MYSELF = await getProfile();

  if (!MYSELF) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <p className="text-gray-600">Profile data is unavailable.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20">
      {/* HERO SECTION */}
      <section id="home" className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative h-32 w-32 sm:h-48 sm:w-48 overflow-hidden rounded-full border-4 border-white shadow-xl">
              {/* <p>{MYSELF.image}</p> */}
              <Image src={MYSELF.image} alt={MYSELF.profession} fill className="object-contain" priority />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Hi, I'm <span className="text-blue-600">{MYSELF.name}</span> <br />
            <span className="text-gray-500 text-3xl lg:text-4xl">{MYSELF.profession}</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">{MYSELF.description}</p>
          <div className="mt-10 flex justify-center gap-x-6">
            <a href="#projects" className="rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-500 transition-all">
              See My Work
            </a>
          </div>
          <SocialLinks />
        </div>
      </section>

      <AboutMe />
      {/* PROJECTS SECTION */}
      <section id="projects" className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-start mb-16 mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl underline decoration-blue-600 underline-offset-8">
              Featured Projects
            </h2>
            <p className="mt-4 text-gray-600">A selection of things I've built recently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="text-sm font-semibold text-blue-600 group-hover:text-blue-800">
                  View Case Study <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Technical Skill */}
      <TechSkills />
    </div>
  );

}