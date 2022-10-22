import React, { useEffect } from "react";
import { Box } from "@mui/system";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsPraying, faReply } from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton } from "@mui/material";

export default function MyPrayer() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <Box sx={{ width: "100%" }}>
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
        <PrayItem />
        <PrayItem />
        <PrayItem />
      </Box>
      <Box sx={{ height: "56px" }}></Box>
    </>
  );
}

function PrayItem() {
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
    >
      <Box>
        askjfchakjlcvhkljsdhvliksjdvhnlkjsdvhnkljsdvjlksdhvlkjsdhvkljsdnbvkljsdbnvkjlbsdkljvbsdkjlvbsdkjvbsdkjlvbksjldbvkljsdbvkjlsdbvkjlsdbvkjsdb
      </Box>
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
