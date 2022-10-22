import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import LocalPray from "./pages/LocalPray/LocalPray";
import GlobalPray from "./pages/GlobalPray/GlobalPray";
import Navigation from "./pages/navigation/Navigation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/localPray"} element={<LocalPray />} />
        <Route path={"/globalPray"} element={<GlobalPray />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<LocalPray />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App;
