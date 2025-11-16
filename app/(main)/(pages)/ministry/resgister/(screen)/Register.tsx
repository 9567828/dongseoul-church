"use client";

import InputBox from "@/components/ui/input-box/InputBox";
import style from "./register.module.scss";
import PrimaryBtn from "@/components/ui/primarybtn/PrimaryBtn";
import { ChangeEvent, FormEvent, RefObject, useRef, useState } from "react";
import { request } from "@/lib/api";

const checkValueTrim = (value: string, ref: RefObject<HTMLInputElement | null>, errMsg: string): boolean => {
  if (value.trim() === "") {
    if (ref.current) {
      ref.current.focus();
    }
    alert(errMsg);
    return true;
  }

  return false;
};

export default function Register() {
  const [inputName, setInputName] = useState("");
  const [inputDuty, setInputDuty] = useState("");
  const [inputTel, setInputTel] = useState("");
  const [inputKinds, setInputKinds] = useState("");
  const [checked, setChecked] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const dutyRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const kindsRef = useRef<HTMLInputElement>(null);

  const onChangeTel = (e: ChangeEvent<HTMLInputElement>) => {
    let rawNumber = e.target.value.replace(/[^0-9]/g, "");
    let formattedNumber = rawNumber;

    if (rawNumber.length > 3 && rawNumber.length <= 7) {
      formattedNumber = rawNumber.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (rawNumber.length > 7) {
      formattedNumber = rawNumber.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }

    setInputTel(formattedNumber);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkValueTrim(inputName, nameRef, "이름을 입력하세요")) return;
    if (checkValueTrim(inputDuty, dutyRef, "직분을 입력하세요")) return;
    if (checkValueTrim(inputTel, telRef, "연락처를 입력하세요")) return;
    if (checkValueTrim(inputKinds, kindsRef, "신청 사역분야를 입력하세요")) return;

    if (!checked) {
      return alert("개인정보 수집·이용 안내에 동의해 주세요");
    }

    const result = await request({ method: "POST", url: "send-mail", data: { inputName, inputDuty, inputTel, inputKinds } });

    if (result) {
      alert("신청 접수에 성공하였습니다.");
      setInputName("");
      setInputDuty("");
      setInputTel("");
      setInputKinds("");
      setChecked(false);
    } else {
      return alert("신청 접수에 실패 되었습니다. 지속 되면 관리자에게 문의해 주세요.");
    }
  };

  return (
    <div className={style.inner}>
      <form onSubmit={onSubmit} className={style["form-wrap"]}>
        <InputBox
          ref={nameRef}
          type="text"
          label="이름"
          id="inputName"
          placeholder="이름을 입력하세요"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <InputBox
          ref={dutyRef}
          type="text"
          label="직분"
          id="inputDuty"
          placeholder="직분을 입력하세요"
          value={inputDuty}
          onChange={(e) => setInputDuty(e.target.value)}
        />
        <InputBox
          ref={telRef}
          type="tel"
          label="연락처"
          id="inputTel"
          placeholder="010-1234-1234"
          value={inputTel}
          onChange={onChangeTel}
          maxLength={13}
        />
        <InputBox
          ref={kindsRef}
          type="text"
          label="신청사역분야"
          id="inputKinds"
          placeholder="신청하시는 사역분야를 입력하세요"
          value={inputKinds}
          onChange={(e) => setInputKinds(e.target.value)}
        />
        <div>
          <div className={style["agree-wrap"]}>
            <h4 className="bodyMd-b">[개인정보 수집·이용 안내]</h4>
            <div className="bodyMd-r">
              <p> • 수집 목적: 문의 확인 및 답변 제공</p>
              <p> • 수집 항목: 이름, 연락처</p>
              <p> • 보유·이용 기간: 필요시 까지</p>
              <p className={style.text}>
                • 동의 거부권 및 불이익 안내:
                <span>
                  개인정보 수집·이용에 대한 동의에 거부 가능하며
                  <br />
                  미동의 시 문의 접수가 불가능 합니다.
                </span>
              </p>
            </div>
          </div>

          <InputBox
            variant="check-box"
            type="checkbox"
            id="inputCheck"
            addLabel="개인정보 수집 이용 동의"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>
        <PrimaryBtn type="submit" label="신청하기" />
      </form>
    </div>
  );
}
