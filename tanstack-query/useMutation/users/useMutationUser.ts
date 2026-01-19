import { request } from "@/lib/api";
import createBrowClient from "@/utils/supabase/services/browerClinet";
import { MemberAddPayload, MemberEditPayload, roleEum } from "@/utils/supabase/sql";
import { deleteUserImg, saveAvatarImg, updateAvatarImg } from "@/utils/supabase/sql/storage/storage";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";

const supabase = createBrowClient();

export const useAddUser = () => {
  return useMutation({
    mutationFn: async (values: MemberAddPayload) => {
      const imgFile = values.imgFile;
      const payload = values.payload;

      let avatarUrl;

      const { data: user, error } = await supabase.from("members").insert(payload).select().single();
      if (error) throw error;

      if (imgFile !== null) {
        const result = await saveAvatarImg(user.id, imgFile!);
        avatarUrl = result.path;
      }

      const { data, error: memberErr } = await supabase.from("members").update({ avatar: avatarUrl }).eq("id", user.id).single();
      if (memberErr) throw memberErr;

      const result = {
        data,
        id: user.id,
      };

      return result;
    },
  });
};

export const useEditUser = () => {
  return useMutation({
    mutationFn: async ({ uid, payload, role, memId, imgFile }: MemberEditPayload) => {
      let roleChange;
      let avatarUrl;

      if (imgFile !== null) {
        const result = await saveAvatarImg(memId, imgFile!);
        avatarUrl = result.path;
      }

      const { data, error: memberErr } = await supabase
        .from("members")
        .update({ ...payload, avatar: avatarUrl })
        .eq("id", memId!)
        .select();
      if (memberErr) throw memberErr;

      if (role) {
        const { data, error } = await supabase
          .from("users")
          .update({ updated_at: payload.updated_at, role })
          .eq("id", uid)
          .select();

        if (error) throw error;

        roleChange = data;
      }

      const resultObj = {
        member: data,
        roleChange,
        avatarUrl,
      };

      return resultObj;
    },
  });
};

export const useEditUserRole = () => {
  return useMutation({
    mutationFn: async ({ payload, uid, role }: MemberEditPayload) => {
      const { data, error } = await supabase
        .from("users")
        .update({ updated_at: payload.updated_at, role })
        .eq("id", uid)
        .single();
      if (error) throw error;

      return data;
    },
  });
};

export const useDeleteUsers = () => {
  return useMutation<boolean, Error, { ids: string[] }>({
    mutationFn: async ({ ids }) => {
      await Promise.all(
        ids.map(async (id) => {
          // 1. member 조회
          const { data: members, error } = await supabase.from("members").select("*").eq("id", id);

          if (error) throw error;
          if (!members?.length) return;

          const mem = members[0];

          // 2. avatar 삭제
          if (mem.avatar !== null) {
            await deleteUserImg(id, supabase);
          }

          // 3. admin 계정인 경우 users 테이블 같이 논리삭제
          if (mem.admin_user !== null) {
            const { error } = await supabase.from("users").update({ is_deleted: true }).eq("id", mem.admin_user);

            if (error) throw error;
          }

          // 4. members 논리 삭제
          const { error: memberErr } = await supabase
            .from("members")
            .update({
              is_deleted: true,
              updated_at: new Date().toISOString(),
              avatar: null,
            })
            .eq("id", id);

          if (memberErr) throw memberErr;
        })
      );

      return true;
    },
  });
};
