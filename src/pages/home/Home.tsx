import { useEffect, useState } from "react";
import classNames from "classnames";
import CitySearchInput from "../../components/citySearchInput";
import useWeather from "../../data/weather/useWeather";
import useGeoCity from "../../data/geoCity/useGeoCity";
import style from "./home.module.scss";
import { weatherIdToImgName } from "../../services/openWeather";

function Home() {
  const city = useGeoCity();
  const weather = useWeather();
  const [forecastEnabled, setForecastEnabled] = useState(false);

  const toggleForecast = () => setForecastEnabled((prev) => !prev);

  useEffect(() => {
    if (!city.selected) return;
    weather.setQuery(city.selected);
  }, [city.selected, weather]);

  useEffect(() => {
    console.log("[city]", city);
  }, [city]);

  useEffect(() => {
    console.log("[weather]", weather);
  }, [weather]);

  return (
    <main
      className={style["home"]}
      style={{
        backgroundImage: `url(${weatherIdToImgName(weather.data?.weather.id)})`,
      }}
    >
      <div
        className={classNames(
          style["home__search"],
          weather.data ? style["home__search-bar"] : style["home__search-full"],
          { [style["glassmorphism"]]: weather.data }
        )}
      >
        <CitySearchInput onSelectCity={city.setSelected} />
      </div>

      <div className={style["home__info"]}>
        <div className={classNames(style["glassmorphism"], style["card"])}>
          <span>{weather.data?.main.humidity} %</span>
        </div>
        <div className={classNames(style["glassmorphism"], style["card"])}>
          <span>{weather.data?.main.temp}°C</span>
          <span>min {weather.data?.main.temp_min}°C</span>
          <span>max {weather.data?.main.temp_max}°C</span>

          <span>{weather.data?.weather.main}</span>
          <span>{weather.data?.weather.description}</span>
        </div>
        <div className={classNames(style["glassmorphism"], style["card"])}>
          <span>{weather.data?.wind.speed} km/h</span>
          <span>{weather.data?.wind.deg}°</span>
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
