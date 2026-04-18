
export type Skill = {
  name: string;
  level: string; // e.g., "Advanced", "Intermediate"
  category: "Frontend" | "Backend" | "Tools";
  image?: string;
};

export const SKILLS: Skill[] = [
  { name: "Next.js", level: "Advanced", category: "Frontend" , image: "/skills/nextjs.png"},
  { name: "TypeScript", level: "Advanced", category: "Frontend" , image: "/skills/typescript.png"},
  { name: "PostgreSQL", level: "Intermediate", category: "Backend" , image: "/skills/postgresql.png"},
  { name: "Tailwind CSS", level: "Advanced", category: "Frontend" , image: "/skills/tailwindcss.png"},
  { name: "Docker", level: "Intermediate", category: "Tools" , image: "/skills/docker.png"},
  { name: "AWS", level: "Basic", category: "Tools" , image: "/skills/aws.png"},
];