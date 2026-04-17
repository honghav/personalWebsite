export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    company: "TechNova Solutions",
    role: "Senior Frontend Developer",
    period: "2024 — Present",
    description: [
      "Architected the migration of a legacy dashboard to Next.js 15, improving load speeds by 40%.",
      "Led a team of 4 developers to implement a type-safe design system using Tailwind and Radix UI.",
    ],
    skills: ["Next.js", "TypeScript", "Tailwind", "Zustand"],
  },
  {
    company: "Pixel Perfect Agency",
    role: "Web Developer",
    period: "2022 — 2024",
    description: [
      "Developed high-conversion landing pages for international e-commerce clients.",
      "Optimized SEO and accessibility scores to reach a consistent 100 on Google Lighthouse.",
    ],
    skills: ["React", "Node.js", "Figma", "PostgreSQL"],
  },
];