import React, {useEffect, useRef, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {countries, boundaries} from "../../common/countries";
import mapboxgl from "mapbox-gl";
import {TagCloud} from "react-tagcloud";
import {keyframes} from "styled-components";
import { AnimatedPrayer } from "./AnimatedPrayer";

mapboxgl.accessToken = process.env.MAPBOX_KEY!;

const prayers = [
	{value: "Holy Spirit, come upon this nation!", count: 38},
	{value: "예수님, 이 나라를 구원 하소서, 아멘", count: 30},
	{value: "Let your kingdom come on this nation, Amen", count: 28},
	{value: "Free this country from warfare", count: 25},
	{value: "Free this nation from poverty", count: 33},
	{value: "I pray for revival", count: 18},
	{value: "이 나라의 대통령을 주님의 종으로 세우소서!", count: 2},
];

const getWindowSize = () => {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

const GlobalPray = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
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

	const [country, setCountry] = useState(null);

	const map: any = useRef();
	const mapContainer: any = useRef(null);

	const changeCoutry = (event: any, selectedCountry: any) => {
		if (!selectedCountry) {
			setCountry(null);
			map.current.zoomTo(2, {
				duration: 1000,
			});
			map.current.setFilter("country-boundaries", [
				"in",
				"iso_3166_1_alpha_3",
				false,
			]);

			// stop arbitrary prayer stream
		} else {
			setCountry(selectedCountry);

			// zoom into the country
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

			// highlight the country
			map.current.setFilter("country-boundaries", [
				"in",
				"iso_3166_1_alpha_3",
				selectedCountry.alpha3,
			]);

			// start arbitrary prayer stream
		}
	};

	const blinker = keyframes`
    blinker {
      50% { opacity: 0.0; }
    }
  `;

	const customRenderer = (tag: any, size: number, color: string) => (
		<AnimatedPrayer
			key={tag.value}
			style={{
				animationDelay: `${Math.floor(Math.random() * 10)}s`,
				fontSize: `${size / 2}em`,
				margin: "3px",
				padding: "3px",
        color: "rgb(244, 85, 186)",
				display: "inline-block",
        opacity: 0,
        position: "relative",
        left: `${Math.floor(Math.random() * windowSize.innerWidth)}px`,
        top: `${Math.floor(Math.random() * windowSize.innerHeight)}px`,
			}}
		>
			{tag.value}
		</AnimatedPrayer>
	);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			zoom: 2,
			style: "mapbox://styles/deukyun/cl9jk9t5d000l14o419zh55hn",
			projection: {name: "globe"},
		});
		map.current.on("load", function () {
			map.current.addLayer(
				{
					id: "country-boundaries",
					source: {
						type: "vector",
						url: "mapbox://mapbox.country-boundaries-v1",
					},
					"source-layer": "country_boundaries",
					type: "fill",
					paint: {
						"fill-color": "#3127AD",
						"fill-opacity": 0.4,
					},
					filter: ["in", "iso_3166_1_alpha_3", false],
				},
				"country-label"
			);
		});
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
					minWidth: 400,
					position: "absolute",
					zIndex: 20,
          right: 0,
					backgroundColor: "white",
					margin: "10px",
				}}
				renderInput={(params) => <TextField {...params} label="Select a Coutry You Want To Pray For" />}
				onChange={changeCoutry}
			></Autocomplete>
			<div
				ref={mapContainer}
				className="map-container"
				style={{width: "100vw", height: "100vh"}}
				{...viewport}
			/>
      {country &&
			<div
        id="prayer-cloud"
				style={{
					width: "100vw",
					height: "100vh",
					position: "absolute",
					top: "0",
				}}
			>
				<TagCloud
					tags={prayers}
					minSize={2}
					maxSize={5}
					renderer={customRenderer}
				></TagCloud>
        <TextField fullWidth label="Prayer" placeholder="Press Enter After Writing Down Your Prayer" id="fullWidth" sx={{
          position: "absolute",
          bottom: "60px",
          left: 0,
          backgroundColor: "white",
        }} />
			</div>
      }
			{/* <ReactMapGL
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
						"fill-color": "#ff69b4",
						"fill-opacity": 0.4,
					}}
					filter={["in", "iso_3166_1_alpha_3", "NLD", "ITA"]}
				></Layer>
			</ReactMapGL> */}
		</div>
	);
};

export default GlobalPray;
