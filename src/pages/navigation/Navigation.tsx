import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { useAuthContext } from "../../InfiniteContext";

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
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      style={{
        justifyContent: "space-evenly",
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <BottomNavigationAction label="Local" />
      <BottomNavigationAction label="National" />
      <BottomNavigationAction label="My Prayer" />
    </BottomNavigation>
  );
};

export default Navigation;
