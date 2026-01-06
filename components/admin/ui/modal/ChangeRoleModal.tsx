import { roleEum } from "@/utils/supabase/sql";
import WarningModal from "./WarningModal";

interface Iprops {
  role: roleEum;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ChangeRoleModal({ role, onConfirm, onCancel }: Iprops) {
  return (
    <WarningModal
      title="유저 role 변경"
      infoText={`해당 유저를 ${role}${role === "super" ? "로" : "으로"} 변경 하시겠습니까?`}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
