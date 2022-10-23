import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { FmdGood } from "@mui/icons-material";
import PrayQuestionBox from "./PrayQuestionBox";
import mapboxgl from "mapbox-gl";
import Modal from "../../components/modal/Modal";
import RecommendButton from "./RecommendButton/RecommendButton";
import { SimplePrayType, swrFetcher } from "../../interface";
import PrevPrays from "./PrevPrays/PrevPrays";
import useSWR from "swr";
import { useAuthContext } from "../../InfiniteContext";

/* eslint-disable @typescript-eslint/no-var-requires */
(mapboxgl as any).workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const apiKey = "pk.eyJ1IjoiZGF5ZGF5LWluZmluaXRlIiwiYSI6ImNsOWlyZjY2ajBlbGszcG9kb2Rjd3pvYzkifQ.M7sMVIworroHZGarmPwvmQ";

const LocalPray = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const { myEmail } = useAuthContext();
  const { data, error } = useSWR<Array<SimplePrayType>>(`/api/v1/pray`, swrFetcher);

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
  if (!data) {
    return <div></div>;
  }
  if (error) {
  }

  const onClickOkHandler = async () => {
    // Prayer List Modal Popup
    setTimeout(() => setIsSelected(true), 100);
  };

  return (
    <div>
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
        onLoad={(e) => {
          if (e.target) {
            setMap(e.target);
          }
        }}
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
          <Marker longitude={tempPosition.longitude} latitude={tempPosition.latitude}>
            <PrayQuestionBox
              okTempHandler={onClickOkHandler}
              cancelTemp={() => {
                setTempPosition(null);
              }}
            />
          </Marker>
        )}

        {data.map((prayPoint, index) => (
          <PrevPrays
            key={"pray" + index}
            prayData={prayPoint}
            offTempPosition={() => {
              setTimeout(() => {
                setTempPosition(null);
              }, 100);
            }}
            myPosition={{
              real_lng: myPosition.longitude,
              real_lat: myPosition.latitude,
            }}
            flyToPosition={(lat, lng) => {
              map?.flyTo({
                center: [lng, lat],
                zoom: 12,
              });
              setTempPosition({ latitude: lat, longitude: lng });
            }}
          />
        ))}
      </ReactMapGL>

      {isSelected && tempPosition && (
        <Modal
          position={{ lat: tempPosition.latitude, lng: tempPosition.longitude }}
          myPosition={{
            real_lng: myPosition.longitude,
            real_lat: myPosition.latitude,
          }}
          close={() => {
            setIsSelected(false);
            setTempPosition(null);
          }}
        />
      )}

      {map && <RecommendButton setTempPosition={setTempPosition} map={map} />}
    </div>
  );
};

export default LocalPray;
