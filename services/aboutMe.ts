import { AboutMe } from "../constants/aboutMe";
import { supabase } from "../lib/supabaseClient";

export async function getAboutMeService(): Promise<AboutMe | null> {

  const { data, error } = await supabase
    .from("aboutme")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching about me:", error.message);
    return null;
  }

  return data;

}