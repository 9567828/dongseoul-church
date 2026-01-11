import createBrowClient from "@/utils/supabase/services/browerClinet";
import { AddAlbumPayload } from "@/utils/supabase/sql";
import { saveAlbumImg } from "@/utils/supabase/sql/storage/storage";
import { useMutation } from "@tanstack/react-query";

const supabase = createBrowClient();

export const useAddAlbum = () => {
  return useMutation({
    mutationFn: async (values: AddAlbumPayload) => {
      const payload = values.payload;
      const imgFile = values.imgFile;

      const imgUrl = await saveAlbumImg(imgFile!);
      const { data, error } = await supabase.from("albums").upsert({ ...payload, src: imgUrl.path, thumbnail: imgUrl.path });
      if (error) throw error;

      return data;
    },
  });
};
