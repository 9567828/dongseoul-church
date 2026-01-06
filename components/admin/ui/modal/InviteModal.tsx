import WarningModal from "./WarningModal";

interface Iprops {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function InviteModal({ onConfirm, onCancel }: Iprops) {
  return (
    <WarningModal
      title="관리자계정 초대"
      infoText="해당 유저를 관리자로 초대하시겠습니까?"
      addText="관리자 계정이 되면 관리자페이지로 로그인 가능합니다."
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
