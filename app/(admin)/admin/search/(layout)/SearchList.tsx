"use client";

import style from "./search.module.scss";
import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import { useSelectSearchAll } from "@/tanstack-query/useQuerys/useSelectQueries";
import Loading from "@/app/Loading";
import PanelLayout from "@/app/(admin)/admin/search/(layout)/Panel";
import SearchResult from "@/app/(admin)/admin/search/(layout)/SearchResult";

interface ILayoutProps {
  keyword: string;
}

export default function SearchList({ keyword }: ILayoutProps) {
  const { data, isLoading } = useSelectSearchAll(keyword);
  const list = data?.result ?? [];

  return (
    <InnerLayout mode="default" title={`"${keyword}" 검색결과`}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={style["panel-wrap"]}>
          {list.map((m, i) => {
            const title = m.table === "album_search" ? "앨범" : m.table === "sermon_search" ? "말씀영상" : "";

            return (
              <PanelLayout
                key={i}
                mode={"general"}
                title={`${title} (${m.count})`}
                url={`/admin/search/more?keyword=${keyword}&table=${m.table}`}
              >
                {m.data.length <= 0 ? <div>검색 결과 없음</div> : <SearchResult list={m.data} table={m.table} />}
              </PanelLayout>
            );
          })}
        </div>
      )}
    </InnerLayout>
  );
}
