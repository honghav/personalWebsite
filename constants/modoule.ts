 
 export type NavLink = {
    name: string;
    href: string;
  }
 
export const navLinks: NavLink[] = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' }, // Points to id="projects"
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Technical Skills', href: '#technical' },
  ];