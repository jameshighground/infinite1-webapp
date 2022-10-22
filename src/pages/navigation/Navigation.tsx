import React, {useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {useAuthContext} from "../../InfiniteContext";
import {Screen} from "../../common/screen";
import {Link} from "react-router-dom";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from '@mui/icons-material/Public';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Navigation = () => {
	const [value, setValue] = useState(0);
	const {setActiveTab} = useAuthContext();

	useEffect(() => {
		setActiveTab(value);
	}, [setActiveTab, value]);

	return (
		<BottomNavigation
			showLabels
			value={value}
			onChange={(_: any, newValue: React.SetStateAction<number>) => {
				setValue(newValue);
			}}
			style={{
				justifyContent: "space-evenly",
				width: "100%",
				position: "fixed",
				bottom: 0,
			}}
		>
			<BottomNavigationAction
				label="Local"
				value={Screen.local.index}
				component={Link}
				to={"/" + Screen.local.slug}
        icon={<LocationCityIcon/>}
			/>
			<BottomNavigationAction
				label="Global"
				value={Screen.global.index}
				component={Link}
				to={"/" + Screen.global.slug}
        icon={<PublicIcon/>}
			/>
			<BottomNavigationAction
				label="My Prayer"
				value={Screen.myPrayer.index}
				component={Link}
				to={"/" + Screen.myPrayer.slug}
        icon={<AccountBoxIcon/>}
			/>
		</BottomNavigation>
	);
};

export default Navigation;
