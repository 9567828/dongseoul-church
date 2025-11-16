"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import style from "./location.module.scss";

export default function Location() {
  const [state, setState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
  });

  const openMap = () => {
    const link = "https://map.kakao.com/?itemId=580054685";
    window.open(link, "_blank");
  };

  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    console.log(geocoder);
    let callback = (result: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setState({
          center: { lat: parseFloat(newSearch.y), lng: parseFloat(newSearch.x) },
        });
      }
    };
    geocoder.addressSearch("경기도 하남시 미사강변대로54번길 10", callback);
  }, []);

  return (
    <div>
      <Map center={state.center} style={{ width: "100%", height: "450px" }}>
        <MapMarker position={state.center} onClick={openMap}>
          <Link
            href="https://map.kakao.com/?itemId=580054685"
            target="_blank"
            className="bodySm-m"
            style={{ display: "block", width: "150px", textAlign: "center", padding: "1px 0" }}
          >
            동서울교회
          </Link>
        </MapMarker>
      </Map>
      <div className={style.container}>
        <div className={style["info-wrap"]}>
          <img src="/imgs/icons/ic_Map.svg" alt="지도" />
          <p>경기도 하남시 미사강변대로54번길 10</p>
        </div>
        <div className={style["info-wrap"]}>
          <img src="/imgs/icons/ic_Phone.svg" alt="전화번호" />
          <p>031-792-8020</p>
        </div>
      </div>
    </div>
  );
}
