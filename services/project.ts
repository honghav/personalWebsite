import { supabase } from "../lib/supabaseClient";
import { Projects } from "../constants/feature";

const TABLE = "projects";

export const projectService = {
  async getAll(): Promise<Projects[]> {
    const { data, error } = await supabase.from(TABLE).select("*").order("created_at", { ascending: false });
    if (error) return [];
    return data as Projects[];
  },

  async create(project: Omit<Projects, 'id'>) {
    return await supabase.from(TABLE).insert([project]).select().single();
  },

  async update(id: string, project: Partial<Projects>) {
    return await supabase.from(TABLE).update(project).eq("id", id).select().single();
  },

  async delete(id: string) {
    return await supabase.from(TABLE).delete().eq("id", id);
  }
};