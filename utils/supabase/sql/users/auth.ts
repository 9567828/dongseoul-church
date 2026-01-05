import createBrowClient from "../../services/browerClinet";
import { createServClient } from "../../services/serverClinet";

export const getUserId = async () => {
  const supabase = createBrowClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  const uid = user?.id;

  if (!uid) {
    return;
  } else {
    return uid;
  }
};
