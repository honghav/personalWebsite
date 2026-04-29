import { supabase } from "./supabaseClient";

export const createProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  console.log("Creating profile for user:", user);
  
  await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    display_name: user.user_metadata?.full_name,
    avatar_url: user.user_metadata?.avatar_url,
  });
};