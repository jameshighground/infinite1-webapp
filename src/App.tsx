import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import LocalPray from "./pages/LocalPray/LocalPray";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/localPray"} element={<LocalPray />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
