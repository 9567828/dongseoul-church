import createBrowClient from "@/utils/supabase/services/browerClinet";
import { AddYoutubePayload } from "@/utils/supabase/sql";
import { useMutation } from "@tanstack/react-query";

export const useAddYoutubeMutation = () => {
  return useMutation({
    mutationFn: async ({ payload, memId }: { payload: AddYoutubePayload[]; memId: string }) => {
      const supabase = createBrowClient();
      let existed = false;

      const rows = payload.map((video) => ({
        ...video,
        origin_writer: memId,
      }));

      const { data, error } = await supabase
        .from("sermons")
        .upsert(rows, { onConflict: "video_id", ignoreDuplicates: true })
        .select();

      if (error) throw error;
      return data;
    },
  });
};
