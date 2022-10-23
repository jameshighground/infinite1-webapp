import React, { useEffect } from "react";
import { Box } from "@mui/system";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsPraying } from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton } from "@mui/material";
import useSWR from "swr";
import { PrayType, swrFetcher } from "../../interface";
import { useAuthContext } from "../../InfiniteContext";
import axios from "axios";
import Column from "../../components/Column";
import GoogleLoginLoader from "../Login/GoogleLoginLoader";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";

export default function MyPrayer() {
  const { myEmail } = useAuthContext();

  const { data, error } = useSWR<Array<PrayType>>(
    myEmail ? `/api/v1/${myEmail}/pray` : null,
    swrFetcher
  );
  useEffect(() => {
    AOS.init();
  });

  // need to log in
  if (!myEmail) {
    return (
      <Column
        gap={32}
        style={{
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Please Login
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <GoogleLoginLoader
            component={<GoogleLoginButton onClick={() => {}} />}
            okHandler={() => {}}
          />
        </div>
      </Column>
    );
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <div style={{ paddingTop: 32, overflow: "auto" }}>
      <span
        style={{
          fontSize: 32,
          marginBottom: 16,
          fontWeight: "bold",
        }}
      >
        My Prayers
      </span>
      <Box sx={{ width: "100%", marginTop: 6 }}>
        {data?.map((item) => (
          <PrayItem key={item.id} item={item} />
        ))}
        {data?.length == 0 && <Box>No Data</Box>}
      </Box>
      <Box sx={{ height: "56px" }}></Box>
    </div>
  );
}
type Props = {
  item: PrayType;
};

function PrayItem({ item }: Props) {
  const { myEmail } = useAuthContext();
  const latLng = {
    lat: item.lat,
    lng: item.lng,
  };
  const handleClick = () => {
    console.log("handleClick >>");
  };
  const handlePray = () => {
    axios.post(`/api/v1/${myEmail}/pray/${item.id}`);
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
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box sx={{ textAlign: "left" }}>{item.content}</Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "auto",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Box></Box>
        <Box>{item.amen?.length || 0}</Box>
        <IconButton color="primary" onClick={handlePray}>
          <FontAwesomeIcon icon={faHandsPraying} />
        </IconButton>
      </Box>
    </Box>
  );
}
