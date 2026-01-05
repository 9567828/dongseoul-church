import createBrowClient from "@/utils/supabase/services/browerClinet";
import { MemberPaylod } from "@/utils/supabase/sql";
import { useMutation } from "@tanstack/react-query";

const supbase = createBrowClient();

export const useAddUser = () => {
  return useMutation({
    mutationFn: async (payload: MemberPaylod) => {
      const { data, error } = await supbase.from("members").insert(payload);
      if (error) throw error;

      return data;
    },
  });
};
