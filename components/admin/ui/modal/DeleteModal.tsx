import WarningModal from "./WarningModal";

interface IProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ title, onConfirm, onCancel }: IProps) {
  return (
    <WarningModal
      title={title}
      infoText="정말 삭제하시겠습니까?"
      addText="삭제 후 복구가 불가능 합니다."
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
