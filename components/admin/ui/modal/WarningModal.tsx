import Button from "../button/Button";
import style from "./modal.module.scss";

interface IWarningModal {
  title: string;
  infoText: string;
  addText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function WarningModal({ title, infoText, addText, onConfirm, onCancel }: IWarningModal) {
  return (
    <div className={style["warning-modal-container"]}>
      <div className={style["modal-dim"]}></div>
      <div className={style["warning-modal-content"]}>
        <div className={style.top}>
          <Button type="button" onClick={onCancel} btnName="" variants="close" visual="none" />
          <div className={style["text-wrap"]}>
            <div className={style.icon}>
              <img src="/imgs/admin/icons/ic_warning.svg" alt="경고아이콘" />
            </div>
            <div className={style["modal-text"]}>
              <h5>{title}</h5>
              <div>
                <p>{infoText}</p>
                {addText && <p>{addText}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className={style["btn-wrap"]}>
          <Button btnName="취소" variants="small" visual="outline" color="gray" onClick={onCancel} />
          <Button btnName="확인" variants="small" visual="solid" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}
