import { Experience } from "../constants/Experience";
import { supabase } from "../lib/supabaseClient";

export async function getExperienceService(): Promise<Experience[] | null> {

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("period_start", { ascending: false });

  if (error) {
    console.error("Error fetching experience:", error.message);
    return [];
  }

  return data as Experience[] ?? [];

}