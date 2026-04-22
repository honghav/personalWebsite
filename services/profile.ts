import { Myself } from "../constants/general";
import { supabase } from "../lib/supabaseClient";

const TABLE = "myself";

export const profileService = {
  async get(): Promise<Myself | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .single(); // Always get the one and only record
    
    if (error) return null;
    return data as Myself;
  },

  async update(profile: Myself) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(profile)
      .eq('id', profile.id) // Updating the first record
      .select()
      .single();
      
    return { data, error };
  }
};