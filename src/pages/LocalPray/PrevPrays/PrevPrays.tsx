import React, { FC, useState } from "react";
import { Marker } from "react-map-gl";
import { MyPosition, SimplePrayType } from "../../../interface";
import { FmdGood } from "@mui/icons-material";
import ChainModal from "../../../components/modal/ChainModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../InfiniteContext";
import PrayQuestionBox from "../PrayQuestionBox";

const PrevPrays: FC<{
  myPosition: MyPosition;
  prayData: SimplePrayType;
  offTempPosition(): void;
}> = ({ prayData, myPosition, offTempPosition }) => {
  const { myEmail } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const URLSearch = new URLSearchParams(location.search);

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const selectedLat = Number(URLSearch.get("lat"));
  const selectedLng = Number(URLSearch.get("lng"));

  const okOnClick = () => {
    offTempPosition();
    URLSearch.set("lat", String(prayData.lat));
    URLSearch.set("lng", String(prayData.lng));
    navigate(location.pathname + "?" + URLSearch.toString());
  };

  return (
    <Marker
      longitude={prayData.lng}
      latitude={prayData.lat}
      onClick={() => {
        offTempPosition();
        setIsSelected(true);
      }}
    >
      <FmdGood
        style={{
          color: "blue",
          fontSize: 24,
        }}
      />
      {selectedLat == prayData.lat && selectedLng == prayData.lng && (
        <ChainModal
          myPosition={myPosition}
          position={{
            lat: prayData.lat,
            lng: prayData.lng,
          }}
          close={() => {
            URLSearch.delete("lat");
            URLSearch.delete("lng");
            navigate(location.pathname + "?" + URLSearch.toString());
          }}
        />
      )}
      {isSelected && (
        <PrayQuestionBox
          okTempHandler={okOnClick}
          cancelTemp={() => {
            setIsSelected(false);
          }}
          isChain={true}
        />
      )}
    </Marker>
  );
};

export default PrevPrays;
