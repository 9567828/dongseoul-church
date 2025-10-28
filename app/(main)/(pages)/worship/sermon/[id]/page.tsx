import BoardDetail from "@/components/layouts/board/detail/BoardDetail";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <BoardDetail />
    </Suspense>
  );
}
