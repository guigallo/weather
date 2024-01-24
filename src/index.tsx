import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home";
import reportWebVitals from "./reportWebVitals";
import Theme from "./theme/layout";
import "normalize.css/normalize.css";
import { WeatherProvider } from "./data/weather/weather.context";
import { GeoCityProvider } from "./data/geoCity/geo.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* TODO: make provider to import all contexts */}
    <GeoCityProvider>
      {/* TODO: make provider to import all contexts */}
      <WeatherProvider>
        <Theme>
          <Home />
        </Theme>
      </WeatherProvider>
    </GeoCityProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
