"use client";

import FormFooter from "@/components/admin/layouts/form-footer/FormFooter";
import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ImgContainer from "@/components/admin/ui/img-container/ImgContainer";
import LabelInput from "@/components/admin/ui/input-box/LabelInput";
import { useState } from "react";

export default function Page() {
  const [value, setValue] = useState("");
  return (
    <InnerLayout mode="withFooter" title="계정등록" isGrid={true}>
      <WhitePanel variants="profile" title="기본정보">
        <div>
          <LabelInput
            id="name"
            label="이름"
            isImport={true}
            mode="add"
            type="text"
            placeholder="이름을 입력하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </WhitePanel>
      <div>
        <WhitePanel variants="profile" title="이미지">
          <ImgContainer mode="default" variant="profile" />
        </WhitePanel>
      </div>
      <FormFooter
        mode="add"
        formId=""
        onBack={() => console.log("돌아가기")}
        onClick={() => console.log("클릭")}
        onDelete={() => console.log("삭제 클릭")}
      />
    </InnerLayout>
  );
}
