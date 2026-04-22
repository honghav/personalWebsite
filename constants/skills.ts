import { skillService } from "../services/skills";

export type Skill = {
  id?: string;
  name: string;
  level: string; // e.g., "Advanced", "Intermediate"
  category: "Frontend" | "Backend" | "Tools";
  image_url?: string;
};
export const SKILLS = await skillService.getAll();
// export const SKILLS: Skill[] = [
//   { name: "Next.js", level: "Advanced", category: "Frontend" , image_url: "/skills/nextjs.png"},
//   { name: "TypeScript", level: "Advanced", category: "Frontend" , image_url: "/skills/typescript.png"},
//   { name: "PostgreSQL", level: "Intermediate", category: "Backend" , image_url: "/skills/postgresql.png"},
//   { name: "Tailwind CSS", level: "Advanced", category: "Frontend" , image_url: "/skills/tailwindcss.png"},
//   { name: "Docker", level: "Intermediate", category: "Tools" , image_url: "/skills/docker.png"},
//   { name: "AWS", level: "Basic", category: "Tools" , image_url: "/skills/aws.png"},
// ];