import React, { useEffect, useState } from "react";
import { PrayChain, PrayQuestionBoxContainer } from "./globalPrayStyle";
import ReactMapGL, { Marker } from "react-map-gl";
import { FmdGood } from "@mui/icons-material";
import Column from "../../components/Column";
import { Autocomplete, TextField } from "@mui/material";
import { countries } from "../../common/countries";

const apiKey =
  "pk.eyJ1IjoiZGF5ZGF5LWluZmluaXRlIiwiYSI6ImNsOWlyZjY2ajBlbGszcG9kb2Rjd3pvYzkifQ.M7sMVIworroHZGarmPwvmQ";

const GlobalPray = () => {
  const [selectedChain, setSelectedChain] = useState<string>("");

  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  const [tempPosition, setTempPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [viewport, setViewport] = useState({
    latitude: 37.5326,
    longitude: 127.024612,
    zoom: 12,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setViewport({
        ...viewport,
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
      });
      setMyPosition({
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
      });
    });
  }, []);

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={countries}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      ></Autocomplete>
      <ReactMapGL
        {...viewport}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/dayday-infinite/cl9irr2mo000w14qqyqmgvlpg"
        mapboxAccessToken={apiKey}
        onClick={
          tempPosition
            ? (e) => {}
            : (e) => {
                setTempPosition({
                  latitude: e.lngLat.lat,
                  longitude: e.lngLat.lng,
                });
              }
        }
        onMove={(evt) => setViewport(evt.viewState)}
      >
        <Marker longitude={myPosition.longitude} latitude={myPosition.latitude}>
          <FmdGood
            className={"flip-in-ver-right"}
            style={{
              color: "red",
              fontSize: 24,
            }}
          />
        </Marker>
        {tempPosition && (
          <Marker
            longitude={tempPosition.longitude}
            latitude={tempPosition.latitude}
            style={{
              position: "relative",
            }}
          >
            <FmdGood
              className={"flip-in-ver-right"}
              style={{
                color: "green",
                fontSize: 24,
              }}
            />
          </Marker>
        )}
        {tempPosition && (
          <Marker
            longitude={tempPosition.longitude}
            latitude={tempPosition.latitude}
          >
          </Marker>
        )}
      </ReactMapGL>

      {selectedChain && (
        <PrayChain>
          <span>Pray Chain</span>
        </PrayChain>
      )}

      <span
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          backgroundColor: "white",
          cursor: "pointer",
        }}
        onClick={() => {
          setTempPosition(null);
          const newLongitude = Math.random() * 360 - 180;
          const newLatitude = Math.random() * 180 - 90;

          setViewport({
            ...viewport,
            longitude: newLongitude,
            latitude: newLatitude,
            zoom: 6,
          });
          setTempPosition({
            longitude: newLongitude,
            latitude: newLatitude,
          });
        }}
      >
        Recommend
      </span>
    </div>
  );
};

export default GlobalPray;
