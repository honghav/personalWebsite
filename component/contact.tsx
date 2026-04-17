import Image from "next/image";
import { SOCIAL_LINKS } from "../constants/Socail";

export default function SocialLinks() {
  return (
    <section className="py-4">
      <div className="flex flex-wrap gap-4">
        {SOCIAL_LINKS.map((social) => (
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
              ${social.hoverBg}
            `}
          >
            {/* The Custom Icon Image */}
            <div className="relative w-6 h-6 grayscale group-hover:grayscale-0 transition-all">
              <Image
                src={social.iconPath}
                alt={social.alt}
                fill
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