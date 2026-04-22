import { Experience } from "../constants/Experience";
import { supabase } from "../lib/supabaseClient";
const TABLE_NAME = "experiences";
export async function getExperienceService(): Promise<Experience[] | null> {

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("period_start", { ascending: false });

  if (error) {
    console.error("Error fetching experience:", error.message);
    return [];
  }
  return data as Experience[] ?? [];

}

// 2. CREATE (Add new)
export async function createExperienceService(newExp: Omit<Experience, 'id'>): Promise<Experience | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([newExp])
    .select()
    .single();

  if (error) {
    console.error("Error creating experience:", error.message);
    return null;
  }
  return data as Experience;
}

// 3. UPDATE (Edit existing)
// Note: Requires an 'id' in your Experience type
export async function updateExperienceService(id: string | number, updatedExp: Partial<Experience>): Promise<Experience | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedExp)
    .eq("id", id) 
    .select()
    .single();

  if (error) {
    console.error("Error updating experience:", error.message);
    return null;
  }
  return data as Experience;
}

// 4. DELETE
export async function deleteExperienceService(id: string | number): Promise<boolean> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting experience:", error.message);
    return false;
  }
  return true;
}