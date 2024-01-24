import { useEffect } from "react";
import classNames from "classnames";
import CitySearchInput from "../../components/citySearchInput";
import useWeather from "../../data/weather/useWeather";
import useGeoCity from "../../data/geoCity/useGeoCity";
import style from "./home.module.scss";

function Home() {
  const city = useGeoCity();
  const weather = useWeather();

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
    <main className={style["home"]}>
      <div
        className={classNames(style["home__search"], style["glassmorphism"])}
      >
        <CitySearchInput onSelectCity={city.setSelected} />
      </div>

      <div className={style["home__info"]}>
        <div className={style["card"]}>{weather.data?.currentTemp}</div>
        <div className={style["card"]}>{weather.data?.humidity}</div>
        <div className={style["card"]}>{weather.data?.windSpeed}</div>
      </div>

      <div
        className={classNames(style["home__weather"], style["glassmorphism"])}
      >
        <div className={style["home__weather__section"]}>
          <h5>Today</h5>
          <div className={style["home__weather__section__content"]}>teste</div>
        </div>
        <div className={style["home__weather__section"]}>
          <h5>+1</h5>
          <div className={style["home__weather__section__content"]}>teste</div>
        </div>
        <div className={style["home__weather__section"]}>
          <h5>+2</h5>
          <div className={style["home__weather__section__content"]}>teste</div>
        </div>
        <div className={style["home__weather__section"]}>
          <h5>+3</h5>
          <div className={style["home__weather__section__content"]}>teste</div>
        </div>
        <div className={style["home__weather__section"]}>
          <h5>+4</h5>
          <div className={style["home__weather__section__content"]}>teste</div>
        </div>
        <div className={style["home__weather__section"]}>
          <h5>+5</h5>
          <div className={style["home__weather__section__content"]}>teste</div>
        </div>
        <div className={style["home__weather__section"]}>
          <h5>+6</h5>
          <div className={style["home__weather__section__content"]}>teste</div>
        </div>
      </div>
    </main>
  );
}

export default Home;
