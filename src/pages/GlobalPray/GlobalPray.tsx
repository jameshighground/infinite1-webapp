import React, {useEffect, useRef, useState} from "react";
import {PrayChain, PrayQuestionBoxContainer} from "./globalPrayStyle";
import ReactMapGL, {Layer, Marker} from "react-map-gl";
import {FmdGood} from "@mui/icons-material";
import Column from "../../components/Column";
import {Autocomplete, TextField} from "@mui/material";
import {countries, boundaries} from "../../common/countries";

const apiKey =
	"pk.eyJ1IjoiZGF5ZGF5LWluZmluaXRlIiwiYSI6ImNsOWlyZjY2ajBlbGszcG9kb2Rjd3pvYzkifQ.M7sMVIworroHZGarmPwvmQ";

const parkLayer = {
  id: 'landuse_park',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park'],
  paint: {
    'fill-color': '#4E3FC8'
  }
};

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
	});

	const [country, setCountry] = useState({
		label: "",
	});

	const [zoom, setZoom] = useState(2);

	const map: any = useRef();

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
				sx={{
					width: 300,
					position: "absolute",
					zIndex: 20,
					backgroundColor: "white",
					margin: "10px",
				}}
				renderInput={(params) => <TextField {...params} label="Country" />}
				onChange={(event: any, selectedCountry: any) => {
					console.log(map);
					setCountry(selectedCountry);
					// map.current.flyTo({
					//   center: [selectedCountry.longitude, selectedCountry.latitude],
					//   essential: true,
					//   duration: 2000,
					//   zoom: 5,
					// });

          // map.current.setFilter('country-boundaries', [
          //   "in",
          //   "iso_3166_1_alpha_3",
          //   'NLD',
          //   'ITA'
          // ]);


					const boundary = [
						[
							boundaries[selectedCountry.alpha3].sw.lng,
							boundaries[selectedCountry.alpha3].sw.lat,
						],
						[
							boundaries[selectedCountry.alpha3].ne.lng,
							boundaries[selectedCountry.alpha3].ne.lat,
						],
					];
					console.log(boundary);
					if (boundary) {
						map.current.fitBounds(boundary);
					}

					// defined the bounds
				}}
			></Autocomplete>
			<ReactMapGL
				{...viewport}
				style={{width: "100vw", height: "100vh"}}
				mapStyle="mapbox://styles/deukyun/cl9jk9t5d000l14o419zh55hn"
				mapboxAccessToken={apiKey}
				projection="globe" //'albers' | 'equalEarth' | 'equirectangular' | 'lambertConformalConic' | 'mercator' | 'naturalEarth' | 'winkelTripel';
				onMove={(evt) => setViewport(evt.viewState)}
				ref={map}
			>
				<Layer
					id="country-boundaries"
					source={{
						type: "vector",
						url: "mapbox://mapbox.country-boundaries-v1",
					}}
          source-layer="country_boundaries"
          type="fill"
          paint={{
            'fill-color': '#ff69b4',
            'fill-opacity': 0.4,
          }}
          filter={[
            "in",
            "iso_3166_1_alpha_3",
            'NLD',
            'ITA'
          ]}
				></Layer>
			</ReactMapGL>
		</div>
	);
};

export default GlobalPray;
