'use client';
import Image from "next/image";
import { SOCIAL_LINKS, SocialLink } from "../constants/Socail";
import { useEffect, useState } from "react";

export default function SocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const load = async () => setLinks(SOCIAL_LINKS);
  useEffect(() => { load(); }, []);
  return (
    <section id="contact" className="py-4">
      <div className="flex flex-wrap gap-4">

        {links.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group flex items-center gap-3 px-5 py-3 
              rounded-2xl border border-slate-200 dark:border-slate-800 
              bg-white dark:bg-slate-950 transition-all duration-300 
              hover:shadow-md hover:-translate-y-1
              ${social.hover_bg}
            `}
          >
            {/* The Custom Icon Image */}
            <div className="relative w-6 h-6 grayscale group-hover:grayscale-0 transition-all">
              <img
                src={social.image}
                alt={social.alt}
                className="object-contain"
              />
            </div>

            <span className="font-medium text-slate-700 dark:text-slate-200">
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}