import { Profile } from "../constants/general";
import { supabase } from "../lib/supabaseClient";

const TABLE = "profiles";

export const userService = {
  async get(): Promise<Profile | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .single(); // Always get the one and only record
    
    if (error) return null;
    return data as Profile;
  }
}
