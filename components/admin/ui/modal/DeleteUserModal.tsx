import WarningModal from "./WarningModal";

interface IProps {
  variant: "list" | "detail";
  nums: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteUserModal({ variant, nums, onConfirm, onCancel }: IProps) {
  return (
    <WarningModal
      title={variant === "list" ? `유저 ${nums}건 삭제` : `유저삭제`}
      infoText="정말 삭제하시겠습니까?"
      addText="삭제 후 복구가 불가능 합니다."
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
