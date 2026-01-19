import style from "@/app/(admin)/admin/search/(layout)/search.module.scss";
import ThumbNail from "@/components/admin/ui/board/ThumbNail";
import TextField from "@/components/admin/ui/board/TextField";
import { searchList, tablesName, viewName } from "@/utils/supabase/sql";
import { formatDate } from "@/utils/formatDate";
import { getAlbumImgURL } from "@/utils/supabase/sql/storage/storage";

interface ISearchResultProps {
  list: searchList[];
  table: viewName;
}

export default function SearchResult({ list, table }: ISearchResultProps) {
  return (
    <div className={style["content-container"]}>
      {list.map((s, i) => {
        let imgPath = s.thumbnail;
        let url;
        const date = table === "sermon_search" ? s.published_date : s.created_at;

        if (table === "album_search") {
          imgPath = getAlbumImgURL(imgPath!);
          url = `/admin/boards/albums/${s.id}`;
        }

        if (table === "sermon_search") {
          url = s.youtube_url;
        }

        return (
          <div key={i} className={style["content-wrap"]}>
            <ThumbNail src={imgPath!} alt={s.title} mode={"search"} />
            <TextField
              text={s.title}
              description={`${formatDate(date!)} | ${s.writer}`}
              link={url}
              isBlank={table === "sermon_search"}
              withImg={false}
            />
          </div>
        );
      })}
    </div>
  );
}
