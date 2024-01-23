import CitySearchInput from "../../components/citySearchInput";
import useWeather from "../../data/weather/useWeather";
import useGeoCity from "../../data/geoCity/useGeoCity";
import { useEffect } from "react";

function Home() {
  const city = useGeoCity();
  const weather = useWeather();

  useEffect(() => {
    if (!city.selected) return;
    weather.setQuery(city.selected);
  }, [city.selected, weather]);

  return (
    <div className="Home">
      <h1>hello weather</h1>

      <CitySearchInput onSelectCity={city.setSelected} />

      <h3>city</h3>
      {city.loading ? <p>loading...</p> : null}
      {city.error ? <p>{city.error}</p> : null}
      {city.selected ? (
        <pre>{JSON.stringify(city.selected, null, 2)}</pre>
      ) : null}

      <h3>weather</h3>
      {weather.loading ? <p>loading...</p> : null}
      {weather.error ? <p>{weather.error}</p> : null}
      {weather.data ? <pre>{JSON.stringify(weather.data, null, 2)}</pre> : null}
    </div>
  );
}

export default Home;
