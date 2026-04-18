import { getAboutMeService } from "../services/aboutMe";

export type AboutMe = {
    role: string,
    describe: string
}
export type FastFacts = {
    facts: string[]
}
// export const ABOUTME: AboutMe = {
//     role: "Engineering",
//     describe: "I’m a developer who believes code is a tool for storytelling. Whether it's optimizing a database query or polishing a hover effect, I focus on the details that make users feel seen.",
// }
export const ABOUTME = await getAboutMeService();

export  const FASTFACTS: FastFacts = {
    facts: [
      "Based in Phnom Penh",
      "Available for freelance",
      "Love Building Open Source"
    ]
  }