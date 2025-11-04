import { Suspense } from "react";
import ListPage from "../(list)/ListPage";

export const metadata = {
  title: "교회사진",
};

export default function Page() {
  return (
    <Suspense>
      <ListPage />
    </Suspense>
  );
}
