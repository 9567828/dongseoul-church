import createBrowClient from "@/utils/supabase/services/browerClinet";
import { AddAlbumPayload, EditAlbumPayload } from "@/utils/supabase/sql";
import { deleteAlbumImg, getAlbumImg, saveAlbumImg } from "@/utils/supabase/sql/storage/storage";
import { useMutation } from "@tanstack/react-query";

const supabase = createBrowClient();

export const useAddAlbum = () => {
  return useMutation({
    mutationFn: async (values: AddAlbumPayload) => {
      const payload = values.payload;
      const imgFile = values.imgFile;

      const { path } = await saveAlbumImg(imgFile!);
      const { data, error } = await supabase.from("albums").upsert({ ...payload, src: path, thumbnail: path });
      if (error) throw error;

      return data;
    },
  });
};

export const useEditAlbum = () => {
  return useMutation({
    mutationFn: async (values: EditAlbumPayload) => {
      const payload = values.payload;
      const imgFile = values.imgFile;
      const imgPath = values.imgPath;

      let newPath: string | undefined;

      if (imgFile !== null) {
        await deleteAlbumImg(imgPath);

        const { path } = await saveAlbumImg(imgFile);
        newPath = path;
      }

      const updateData = {
        ...payload,
        ...(newPath ? { src: newPath, thumbnail: newPath } : {}),
      };

      const { data, error } = await supabase.from("albums").update(updateData).eq("id", payload.id).single();

      if (error) throw error;

      return data;
    },
  });
};

export const useDeleteAlbums = () => {
  return useMutation({
    mutationFn: async (checks: string[]) => {
      let result;
      await Promise.all(
        checks.map(async (id) => {
          const { data: albums, error } = await supabase.from("albums").select("*").eq("id", Number(id));

          if (error) throw error;

          if (!albums.length) throw new Error("존재하지 않는 게시물 입니다.");

          const album = albums[0];

          if (album.src !== null) {
            await deleteAlbumImg(album.src);
          }

          const { data: delet, error: deleteErr } = await supabase.from("albums").delete().eq("id", Number(id));
          if (deleteErr) throw deleteErr;

          result = delet;
        })
      );

      return result;
    },
  });
};
