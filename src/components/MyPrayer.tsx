import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsPraying } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import axios from "axios";

export default function MyPrayer() {
  const [list, setList] = useState([]);
  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
    initUserList();
  }, [setList]);

  async function initUserList() {
    const { data } = await axios.get("/api/v1/pray");
    console.log("data >>", data);
    setList(data);
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {list.map((item: any) => (
          <PrayItem key={item.id} item={item} />
        ))}
        {/* <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem />
        <PrayItem /> */}
      </Box>
      <Box sx={{ height: "56px" }}></Box>
    </>
  );
}
type Props = {
  item: any;
};

function PrayItem({ item }: Props) {
  console.log("item >>", item);
  const latLng = {
    lat: item.lat,
    lng: item.lng,
  };

  const handleClick = () => {
    console.log("handleClick >>");
  };
  return (
    <Box
      data-aos="fade-up"
      data-aos-duration="1500"
      sx={{
        border: "1px solid black",
        borderRadius: "25px",
        height: "110px",
        margin: "0 20px 20px 20px",
        wordBreak: "break-all",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleClick}
    >
      <Box sx={{ textAlign: "left" }}>{item.content}</Box>
      <Box sx={{ width: "100%", marginTop: "auto", display: "flex", justifyContent: "end", alignItems: "center" }}>
        <Box></Box>
        <Box>43</Box>
        <IconButton color="primary">
          <FontAwesomeIcon icon={faHandsPraying} />
        </IconButton>
        {/* <IconButton>
          <FontAwesomeIcon icon={faReply} />
        </IconButton> */}
      </Box>
    </Box>
  );
}
