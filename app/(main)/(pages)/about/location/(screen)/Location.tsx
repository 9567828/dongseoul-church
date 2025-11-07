"use client";

import { useEffect, useRef, useState } from "react";
import { DrawingManager, Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

export default function Location() {
  return (
    <div>
      <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: "100%", height: "360px" }}>
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </div>
  );
}
