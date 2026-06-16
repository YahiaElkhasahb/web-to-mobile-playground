import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/sw.js");
//   });
// }
if ("serviceWorker" in navigator) {
  console.log(navigator.serviceWorker.controller);
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("Service Worker Registered", reg);
    })
    .catch((error) => {
      console.error("Service Worker Registration Failed:", error);
    });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
