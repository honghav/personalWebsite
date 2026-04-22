import { projectService } from "../services/project";

export type Projects ={
  id: string ;
  title: string,
  description: string,
  tags: string[],
  link: string
}
// const [editing, setEditing] = useState<Projects | null | boolean>(false);
export const ProjectList = await projectService.getAll();

export const handleDelete = async (id: string) => {
        if (confirm("Delete project?")) {
            await projectService.delete(id);
            ProjectList;
        }
    };

// export const handleSave = async (data: Projects) => {
//         if (typeof editing === 'object' && editing?.id) {
//             await projectService.update(editing.id, data);
//         } else {
//             await projectService.create(data);
//         }
//         setEditing(false);
// ProjectList;
//     };
// export const PROJECTS: Projects[] = [
//     {
//       id: "1",
//       title: "E-commerce Platform",
//       description: "A full-stack store built with Next.js and Stripe integration.",
//       tags: ["Next.js", "TypeScript", "Tailwind"],
//       link: "#"
//     },
//     {
//       id: "2",
//       title: "AI Chat Dashboard",
//       description: "Real-time chat interface using OpenAI API and WebSockets.",
//       tags: ["React", "Node.js", "Socket.io"],
//       link: "#"
//     },
//     {
//       id: '3',
//       title: "Portfolio Template",
//       description: "A minimalist, dark-themed portfolio for creative developers.",
//       tags: ["Framer Motion", "Next.js"],
//       link: "#"
//     }
// ]