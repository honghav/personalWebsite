// constants/socials.ts

import { socialService } from "../services/socaillink";

export type SocialLink = {
  id: string;
  name: string;
  href: string;
  image: string; // The path to your SVG/PNG in the /public folder
  alt: string;
  hover_bg: string; // Optional: custom hover background color
};
export const SOCIAL_LINKS = await socialService.getAll();
// export const SOCIAL_LINKS: SocialLink[] = [
//   {
//     name: "GitHub",
//     href: "https://github.com/yourusername",
//     image: "/icons/github.svg", 
//     alt: "GitHub logo",
//     hoverBg: "hover:bg-slate-100 dark:hover:bg-slate-800",
//   },
//   {
//     name: "LinkedIn",
//     href: "https://linkedin.com/in/yourusername",
//     image: "/icons/linkedin.svg",
//     alt: "LinkedIn logo",
//     hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
//   },
//   {
//     name: "X / Twitter",
//     href: "https://x.com/yourusername",
//     image: "/icons/x-logo.svg",
//     alt: "X logo",
//     hoverBg: "hover:bg-slate-50 dark:hover:bg-slate-800",
//   },
// ];