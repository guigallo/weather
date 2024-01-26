import { useEffect, useState } from "react";
import classNames from "classnames";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirIcon from "@mui/icons-material/Air";
import CitySearchInput from "../../components/citySearchInput";
import useWeather from "../../data/weather/useWeather";
import useGeoCity from "../../data/geoCity/useGeoCity";
import { weatherIdToImgName } from "../../services/openWeather";
import style from "./home.module.scss";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import useUnit from "../../hooks/useUnit";

function Home() {
  const city = useGeoCity();
  const weather = useWeather();
  const unit = useUnit();
  const [forecastEnabled, setForecastEnabled] = useState(false);

  const toggleForecast = () => setForecastEnabled((prev) => !prev);

  useEffect(() => {
    if (!city.selected) return;
    weather.setQuery(city.selected);
  }, [city.selected, weather]);

  return (
    <main
      className={style["home"]}
      style={{
        backgroundImage: `url(${weatherIdToImgName(weather.data?.weather.id)})`,
      }}
    >
      <div
        className={classNames({
          [style["home__search"]]: true,
          [style["home__search-bar"]]: weather.data,
          [style["home__search-full"]]: !weather.data,
          [style["glassmorphism"]]: weather.data,
        })}
      >
        <CitySearchInput onSelectCity={city.setSelected} />
        {weather.data && (
          <div className={style["home__search__info"]}>
            <div className={style["home__search__info__unit"]}>
              <ToggleButtonGroup
                color="primary"
                value={weather.unit}
                exclusive
                onChange={(e, unit) => weather.setUnit(unit)}
                aria-label="unit"
              >
                <ToggleButton value="metric">°C</ToggleButton>
                <ToggleButton value="imperial">°F</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        )}
      </div>

      <div className={style["home__info"]}>
        <div className={classNames(style["glassmorphism"], style["card"])}>
          <div style={{ fontSize: "6rem", lineHeight: 0 }}>
            <WaterDropOutlinedIcon fontSize="inherit" />
          </div>
          <span>humidity {weather.data?.main.humidity}%</span>
        </div>
        <div className={classNames(style["glassmorphism"], style["card"])}>
          <span>{weather.data?.weather.description}</span>
          <span style={{ fontSize: "4rem" }}>
            {unit.temperature(weather.data?.main.temp || 0)}
          </span>
          <span>min {unit.temperature(weather.data?.main.temp_min || 0)}</span>
          <span>max {unit.temperature(weather.data?.main.temp_max || 0)}</span>
        </div>
        <div className={classNames(style["glassmorphism"], style["card"])}>
          <div
            style={{
              fontSize: "6rem",
              lineHeight: 0,
              // transform: `rotate(${weather.data?.wind.deg || 0}deg)`,
            }}
          >
            <AirIcon fontSize="inherit" />
          </div>
          <span>{unit.speed(weather.data?.wind.speed || 0)}</span>
        </div>
      </div>

      <div>
        <span
          className={classNames(
            style["glassmorphism"],
            style["home__forecast__togglebtn"]
          )}
          onClick={toggleForecast}
        >
          Forecast
        </span>

        <div
          className={classNames(
            style["home__forecast"],
            style["glassmorphism"],
            { [style["home__forecast-hide"]]: !forecastEnabled }
          )}
        >
          <p>Coming soon</p>
          {/* <div className={style["home__forecast__section"]}>
            <h5>Today</h5>
            <div className={style["home__forecast__section__content"]}>
              test
            </div>
          </div>
          <div className={style["home__forecast__section"]}>
            <h5>+1</h5>
            <div className={style["home__forecast__section__content"]}>
              test
            </div>
          </div>
          <div className={style["home__forecast__section"]}>
            <h5>+2</h5>
            <div className={style["home__forecast__section__content"]}>
              test
            </div>
          </div>
          <div className={style["home__forecast__section"]}>
            <h5>+3</h5>
            <div className={style["home__forecast__section__content"]}>
              test
            </div>
          </div>
          <div className={style["home__forecast__section"]}>
            <h5>+4</h5>
            <div className={style["home__forecast__section__content"]}>
              test
            </div>
          </div>
          <div className={style["home__forecast__section"]}>
            <h5>+5</h5>
            <div className={style["home__forecast__section__content"]}>
              test
            </div>
          </div>
          <div className={style["home__forecast__section"]}>
            <h5>+6</h5>
            <div className={style["home__forecast__section__content"]}>
              test
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default Home;
