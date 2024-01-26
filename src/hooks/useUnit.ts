import { useCallback } from "react";
import useWeather from "../data/weather/useWeather";

function useUnit() {
  const weather = useWeather();

  const temperature = useCallback(
    (temp: number) => {
      const value = Math.trunc(temp);
      const currentUnit = weather.unit === "metric" ? "°C" : "°F";

      return `${value}${currentUnit}`;
    },
    [weather.unit]
  );

  const speed = useCallback(
    (speed: number) => {
      const value = Math.trunc(speed);
      const currentUnit = weather.unit === "metric" ? "m/s" : "mph";

      return `${value} ${currentUnit}`;
    },
    [weather.unit]
  );

  return {
    temperature,
    speed,
  };
}

export default useUnit;
