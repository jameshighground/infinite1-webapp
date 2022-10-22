import React, { useEffect, useRef, useState } from "react";
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
    longitude: 127.024612
  });

  const [country, setCountry] = useState({
    label: 'United States'
  });

  const map:any = useRef();

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
        value={country}
        id="combo-box-country"
        options={countries}
        sx={{ width: 300, position: 'absolute', zIndex: 20, backgroundColor: 'white', margin: '10px'}}
        renderInput={(params) => <TextField {...params} label="Country" />}
        onChange={(event: any, selectedCountry: any)=>{
          setCountry(selectedCountry);
          console.log(map);
          map.current.flyTo({
            center: [selectedCountry.longitude, selectedCountry.latitude],
            essential: true,
            duration: 2000,
            zoom: 5,
          });
        }}
      ></Autocomplete>
      <ReactMapGL
        {...viewport}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/dayday-infinite/cl9irr2mo000w14qqyqmgvlpg"
        mapboxAccessToken={apiKey}
        projection='globe' //'albers' | 'equalEarth' | 'equirectangular' | 'lambertConformalConic' | 'mercator' | 'naturalEarth' | 'winkelTripel';
        zoom={2}
        onMove={(evt) => setViewport(evt.viewState)}
        ref={map}
      >
        
      </ReactMapGL>

      
    </div>
  );
};

export default GlobalPray;
