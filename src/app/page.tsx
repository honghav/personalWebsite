// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import TechSkills from '../../component/TechSkills';
import AboutMe from '../../component/aboutMe';
import SocialLinks from '../../component/contact';

export default function Home() {
  const myseft = {
    name: "Leang Honghav",
    profession: "Full-Stack Developer",
    image: "next.svg", // Ensure you have this image in the public folder
    description: "I'm a passionate Full-Stack Developer specializing in building beautiful, functional, and user-centered digital experiences using Next.js, TypeScript, and Tailwind CSS."
  }
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack store built with Next.js and Stripe integration.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      link: "#"
    },
    {
      title: "AI Chat Dashboard",
      description: "Real-time chat interface using OpenAI API and WebSockets.",
      tags: ["React", "Node.js", "Socket.io"],
      link: "#"
    },
    {
      title: "Portfolio Template",
      description: "A minimalist, dark-themed portfolio for creative developers.",
      tags: ["Framer Motion", "Next.js"],
      link: "#"
    }
  ];
  return (
    <div className="flex flex-col gap-20">
      {/* HERO SECTION */}
      <section id="home" className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative h-32 w-32 sm:h-48 sm:w-48 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image src={myseft.image} alt={myseft.profession} fill className="object-contain" priority />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Hi, I'm <span className="text-blue-600">{myseft.name}</span> <br />
            <span className="text-gray-500 text-3xl lg:text-4xl">{myseft.profession}</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">{myseft.description}</p>
          <div className="mt-10 flex justify-center gap-x-6">
            <a href="#projects" className="rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-500 transition-all">
              See My Work
            </a>
          </div>
        </div>
      </section>

      <SocialLinks />
      <AboutMe />
      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl underline decoration-blue-600 underline-offset-8">
              Featured Projects
            </h2>
            <p className="mt-4 text-gray-600">A selection of things I've built recently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
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