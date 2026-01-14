import { showStateType } from "@/utils/supabase/sql/boards/select";
import WarningModal from "./WarningModal";

interface IWarningShow {
  state: showStateType | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function WarningChangeShow({ state, onConfirm, onCancel }: IWarningShow) {
  return (
    <WarningModal
      title="게시글 노출 상태변경"
      infoText={`상태를 ${state === "show" ? "노출" : "비노출"}로 변경하시겠습니까?`}
      addText={`해당 게시글이 홈페이지에서 ${state === "show" ? "노출됩니다." : "노출 되지 않습니다."}`}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
