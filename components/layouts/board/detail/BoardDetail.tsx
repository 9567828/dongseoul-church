"use client";

import { useParams } from "next/navigation";
import style from "./board-detail.module.scss";

export interface IPhotoDetail {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  thumbnail: string;
  writer: string;
  /**
   * @param album table 필드
   */
  src?: string;
  /**
   * @param sermon table 필드
   */
  youtube_URL?: string;
}

export default function BoardDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>상세페이지</h1>
      <p>{id}</p>
    </div>
  );
}
