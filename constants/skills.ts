import { 
  Code2, 
  Terminal, 
  Database, 
  Layout, 
  Cpu, 
  Cloud 
} from "lucide-react";

export type Skill = {
  name: string;
  icon: any;
  level: string; // e.g., "Advanced", "Intermediate"
  category: "Frontend" | "Backend" | "Tools";
};

export const SKILLS: Skill[] = [
  { name: "Next.js", icon: Code2, level: "Advanced", category: "Frontend" },
  { name: "TypeScript", icon: Terminal, level: "Advanced", category: "Frontend" },
  { name: "PostgreSQL", icon: Database, level: "Intermediate", category: "Backend" },
  { name: "Tailwind CSS", icon: Layout, level: "Advanced", category: "Frontend" },
  { name: "Docker", icon: Cpu, level: "Intermediate", category: "Tools" },
  { name: "AWS", icon: Cloud, level: "Basic", category: "Tools" },
];