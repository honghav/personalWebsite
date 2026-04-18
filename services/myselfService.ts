import { Myself } from "../constants/general";
import { supabase } from "../lib/supabaseClient";

export async function getMyselfService(): Promise<Myself | null> {

  const { data, error } = await supabase
    .from("myself")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  return data;
}

export const updateMyselfService = async (payload: Myself) => {
  const { error } = await supabase
    .from("myself")
    .update(payload)
    .eq("id", 1);

  if (error) {
    console.error(error.message);
  }
};