import createBrowClient from "@/utils/supabase/services/browerClinet";
import { MemberAddPaylod, MemberEditPaylod, roleEum } from "@/utils/supabase/sql";
import { useMutation } from "@tanstack/react-query";

const supbase = createBrowClient();

export const useAddUser = () => {
  return useMutation({
    mutationFn: async (payload: MemberAddPaylod) => {
      const { data, error } = await supbase.from("members").insert(payload);
      if (error) throw error;

      return data;
    },
  });
};

interface IEditProps {
  uid: string;
  payload: MemberEditPaylod;
  role?: roleEum | null;
}

export const useEditUser = () => {
  return useMutation({
    mutationFn: async ({ uid, payload, role }: IEditProps) => {
      const { data, error } = await supbase.from("members").update(payload).eq("id", uid).select();
      if (error) throw error;

      if (role) {
        const { data, error } = await supbase.from("users").update({ role }).eq("id", uid).select();

        if (error) throw error;

        return data;
      }

      return data;
    },
  });
};
