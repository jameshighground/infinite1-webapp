import React, { FC, useState } from "react";
import { Marker } from "react-map-gl";
import { SimplePrayType } from "../../../interface";
import { FmdGood } from "@mui/icons-material";
import ChainModal from "../../../components/modal/ChainModal";

const PrevPrays: FC<{ prayData: SimplePrayType; offTempPosition(): void }> = ({
  prayData,
  offTempPosition,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

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
      {isSelected && (
        <ChainModal
          position={{
            lat: prayData.lat,
            lng: prayData.lng,
          }}
          close={() => {
            setIsSelected(false);
          }}
        />
      )}
    </Marker>
  );
};

export default PrevPrays;
