import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/Login"} element={<Login />} />
        <Route path={"/"} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
