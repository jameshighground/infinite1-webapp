import React, { FC, useState } from "react";
import { Marker } from "react-map-gl";
import { PrayType } from "../../../interface";
import { FmdGood } from "@mui/icons-material";
import ChainModal from "../../../components/modal/ChainModal";

const PrevPrays: FC<{ prayData: PrayType; offTempPosition(): void }> = ({
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
          close={() => {
            setIsSelected(false);
          }}
          prevText={prayData.content}
        />
      )}
    </Marker>
  );
};

export default PrevPrays;
