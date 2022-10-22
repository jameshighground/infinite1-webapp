import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useAuthContext } from "../../InfiniteContext";
import { Screen } from "../../common/screen";
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [value, setValue] = useState(0);
  const { setActiveTab } = useAuthContext();

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
      <BottomNavigationAction label="Local" value={Screen.local.slug} component={Link} to={'/'+Screen.local.slug} />
      <BottomNavigationAction label="Global" value={Screen.global.slug} component={Link} to={'/'+Screen.global.slug} />
      <BottomNavigationAction label="My Prayer" value={Screen.myPrayer.slug} component={Link} to={'/'+Screen.myPrayer.slug} />
    </BottomNavigation>
  );
};

export default Navigation;
