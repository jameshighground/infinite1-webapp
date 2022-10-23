import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import LocalPray from "./pages/LocalPray/LocalPray";
import GlobalPray from "./pages/GlobalPray/GlobalPray";
import Navigation from "./pages/navigation/Navigation";
import MyPrayer from "./components/MyPrayer";
import LogoWhite from "./assets/logo/logo_white.png";
import Fadeout from "./components/Fadeout";

function App() {
  const [showLogo, setShowLogo] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowLogo(!showLogo), 2500);
  }, []);
  return (
    <div className="App">
      <Fadeout visible={showLogo}>
        <img src={LogoWhite} alt="logo" width={"60%"} height={"60%"} />
      </Fadeout>
      <Routes>
        <Route path={"/localPray"} element={<LocalPray />} />
        <Route path={"/globalPray"} element={<GlobalPray />} />
        <Route path={"/my-prayer"} element={<MyPrayer />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<LocalPray />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App;
