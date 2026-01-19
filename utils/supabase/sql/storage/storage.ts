import { SupabaseClient } from "@supabase/supabase-js";
import createBrowClient from "../../services/browerClinet";
import { getExtFromMime } from "@/utils/propType";
import { formatTwoDigit } from "@/utils/formatDate";

export const saveAvatarImg = async (id: string, file: File) => {
  const supabase = createBrowClient();
  const ext = getExtFromMime(file);
  const path = `${id}/avatar.${ext}`;

  const { data: files } = await supabase.storage.from("avatar").list(id);

  const removeTargets = files?.filter((f) => f.name !== `avatar.${ext}`) ?? [];

  if (removeTargets.length) {
    await supabase.storage.from("avatar").remove(removeTargets.map((f) => `${id}/${f.name}`));
  }

  const { data, error } = await supabase.storage.from("avatar").upload(path, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) throw error;
  return data;
};

export const updateAvatarImg = async (id: string, srcURL: string) => {
  const supabase = createBrowClient();

  const { data, error } = await supabase.from("members").update({ avatar: srcURL }).eq("id", id).select();
  if (error) throw error;

  return data;
};

export const getUserImgUrl = async (avatar: string, supabase: SupabaseClient) => {
  if (!avatar) return;

  const { data, error } = await supabase.storage.from("avatar").createSignedUrl(avatar, 60 * 60);
  if (error) throw error;

  return data.signedUrl ?? null;
};

export const deleteUserImg = async (id: string, supabase: SupabaseClient) => {
  const { data: files } = await supabase.storage.from("avatar").list(id);

  if (files) {
    if (files.length) {
      const { data, error } = await supabase.storage.from("avatar").remove(files.map((f) => `${id}/${f.name}`));
      if (error) throw error;

      const { data: update, error: updateErr } = await supabase.from("members").update({ avatar: null }).eq("id", id).single();
      if (updateErr) throw updateErr;

      return update;
    }
  }
};

export const saveAlbumImg = async (file: File) => {
  const supabase = createBrowClient();
  const ext = getExtFromMime(file);
  const month = formatTwoDigit(new Date().getMonth() + 1);
  const path = `/albums/${new Date().getFullYear()}/${month}/${Date.now()}.${ext}`;

  const { data: url, error } = await supabase.storage.from("photos").upload(path, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;

  return url;
};

export const getAlbumImgURL = (path: string) => {
  const supabase = createBrowClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from("photos").getPublicUrl(path);

  return publicUrl;
};

export const getAlbumImg = async (path: string) => {
  const supabase = createBrowClient();

  const { data, error } = await supabase.storage.from("photos").exists(path);

  if (error) return error.name;

  return data;
};

export const deleteAlbumImg = async (path: string) => {
  const supabase = createBrowClient();

  let result;

  const exists = await getAlbumImg(path);

  if (exists === "StorageUnknownError") {
    throw new Error("올바른 이미지 경로가 아닙니다.", { cause: "경로오류" });
  }

  if (exists) {
    const { data, error } = await supabase.storage.from("photos").remove([path]);
    if (error) throw error;
    result = data;
  }

  return result;
};
