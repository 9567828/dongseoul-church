import style from "../modal.module.scss";

export default function ModalContent({ children }: { children: React.ReactNode }) {
  return <section className={style["modal-content"]}>{children}</section>;
}
