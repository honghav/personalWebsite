import { Skill } from "../constants/skills";
import { supabase } from "../lib/supabaseClient";


const TABLE = "skills";

export const skillService = {
  async getAll(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("category", { ascending: true });
    return error ? [] : (data as Skill[]);
  },

  async create(skill: Omit<Skill, "id">) {
    return await supabase.from(TABLE).insert([skill]).select().single();
  },

  async update(id: string, skill: Partial<Skill>) {
    return await supabase.from(TABLE).update(skill).eq("id", id).select().single();
  },

  async delete(id: string) {
    return await supabase.from(TABLE).delete().eq("id", id);
  }
};