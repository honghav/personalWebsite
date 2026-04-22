import { SocialLink } from "../constants/Socail";
import { supabase } from "../lib/supabaseClient";

const TABLE = "social_links";

export const socialService = {
  async getAll(): Promise<SocialLink[]> {
    const { data, error } = await supabase.from(TABLE).select("*").order("name");
    return error ? [] : (data as SocialLink[]);
  },

  async create(link: Omit<SocialLink, "id">) {
    return await supabase.from(TABLE).insert([link]).select().single();
  },

  async update(id: string, link: Partial<SocialLink>) {
    return await supabase.from(TABLE).update(link).eq("id", id).select().single();
  },

  async delete(id: string) {
    return await supabase.from(TABLE).delete().eq("id", id);
  }
};