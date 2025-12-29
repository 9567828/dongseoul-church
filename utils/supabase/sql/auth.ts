import { createServClient } from "../services/serverClinet";

export const signIn = async (email: string, password: string) => {
  const supabase = await createServClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
  return { data };
};

// export const selectUser = async ({ id }: { id: string }) => {
//   const supabase = await createServClient();

//   const { data, error } = await supabase.from("users").select("id");

//   if (error) throw error;
//   return { data };
// };
