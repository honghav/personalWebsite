  export type Projects ={
      title: string,
      description: string,
      tags: string[],
      link: string
    }

export const PROJECTS: Projects[] = [
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
]