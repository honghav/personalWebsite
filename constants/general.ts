import { supabase } from "../lib/supabaseClient";
import { getMyselfService } from "../services/myselfService";

export type Myself = {
    name: string
    profession: string,
    image: string, // Ensure you have this image in the public folder
    description: string
}
export const MYSELF = await getMyselfService();