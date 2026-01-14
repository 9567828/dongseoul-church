import createBrowClient from "@/utils/supabase/services/browerClinet";
import { AddYoutubePayload } from "@/utils/supabase/sql";
import { getUserId } from "@/utils/supabase/sql/users/auth";
import { useMutation } from "@tanstack/react-query";

export const useAddYoutubeMutation = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: AddYoutubePayload[] }) => {
      const supabase = createBrowClient();

      const id = await getUserId(supabase);

      const rows = payload.map((video) => ({
        ...video,
        origin_writer: id,
      }));

      const { data, error } = await supabase.from("sermons").upsert(rows, { onConflict: "video_id" }).select();

      if (error) throw error;
      return data;
    },
  });
};
