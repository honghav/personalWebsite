// constants/socials.ts

export type SocialLink = {
  name: string;
  href: string;
  iconPath: string; // The path to your SVG/PNG in the /public folder
  alt: string;
  hoverBg: string; // Optional: custom hover background color
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    iconPath: "/icons/github.svg", 
    alt: "GitHub logo",
    hoverBg: "hover:bg-slate-100 dark:hover:bg-slate-800",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    iconPath: "/icons/linkedin.svg",
    alt: "LinkedIn logo",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  {
    name: "X / Twitter",
    href: "https://x.com/yourusername",
    iconPath: "/icons/x-logo.svg",
    alt: "X logo",
    hoverBg: "hover:bg-slate-50 dark:hover:bg-slate-800",
  },
];