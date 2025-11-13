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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z"
              stroke="black"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="10" r="3" stroke="black" strokeWidth="1.5" />
          </svg>
          <p>경기도 하남시 미사강변대로54번길 10</p>
        </div>
        <div className={style["info-wrap"]}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90533 10.1147 9.8278C10.1147 9.8278 8.99578 10.9467 11.0245 12.9755C13.0532 15.0042 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p>031-792-8020</p>
        </div>
      </div>
    </div>
  );
}
