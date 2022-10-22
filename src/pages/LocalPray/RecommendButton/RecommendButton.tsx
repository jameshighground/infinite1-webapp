import React, { FC } from "react";
import mapboxgl from "mapbox-gl";

const RecommendButton: FC<{
  setTempPosition(e: { longitude: number; latitude: number } | null): void;
  map: mapboxgl.Map;
}> = ({ setTempPosition, map }) => {
  return (
    <span
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        backgroundColor: "white",
        cursor: "pointer",
      }}
      onClick={async () => {
        setTempPosition(null);

        let newLongitude;
        let newLatitude;

        newLongitude = Math.random() * 360 - 180;
        newLatitude = Math.random() * 140 - 56;

        map.flyTo({
          center: [newLongitude, newLatitude],
          zoom: 5,
        });
        setTempPosition({
          longitude: newLongitude,
          latitude: newLatitude,
        });
      }}
    >
      Recommend
    </span>
  );
};

export default RecommendButton;
