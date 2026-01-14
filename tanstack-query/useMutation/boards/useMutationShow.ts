import createBrowClient from "@/utils/supabase/services/browerClinet";
import { ChangeShowPayload } from "@/utils/supabase/sql";
import { useMutation } from "@tanstack/react-query";

export const useEditShow = () => {
  return useMutation({
    mutationFn: async ({ payload, name, id }: ChangeShowPayload) => {
      const supabase = createBrowClient();

      const isShow = payload.is_Show === "show" ? true : false;

      const { data, error } = await supabase
        .from(name)
        .update({ updated_at: payload.updated_at, is_show: isShow, edit_writer: payload.edit_writer })
        .eq("id", id)
        .single();
      if (error) throw error;

      return data;
    },
  });
};
