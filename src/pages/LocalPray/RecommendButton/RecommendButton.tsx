import React, { FC } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";

const RecommendButtonDiv = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: white;
  cursor: pointer;

  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid #c9c9c9;
`;

const RecommendButton: FC<{
  setTempPosition(e: { longitude: number; latitude: number } | null): void;
  map: mapboxgl.Map;
}> = ({ setTempPosition, map }) => {
  return (
    <RecommendButtonDiv
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
    </RecommendButtonDiv>
  );
};

export default RecommendButton;
