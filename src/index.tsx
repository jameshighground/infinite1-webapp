import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { InfiniteProvider } from "./InfiniteContext";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-toastify/dist/ReactToastify.css";

<<<<<<< HEAD
=======
// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );

>>>>>>> ff52da5054fdab19679ebb9275fda353f2b202e1
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <InfiniteProvider>
        <App />
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      </InfiniteProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
