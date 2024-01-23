import { useContext, useEffect } from "react";
import { requestFactory } from "../../shared/requests";
import { WeatherContext, WeatherContextType } from "./weather.context";
import {
  OW_WEATHER_URL,
  owToWeatherConverter,
  owToWeatherErrorConverter,
} from "../../services/openWeather";
import config from "../../config";

export default function useWeather(): WeatherContextType {
  const context = useContext(WeatherContext);
  const { dispatch, query } = context;
  const { lat, lon } = query;

  useEffect(() => {
    if (!lat || !lon) return;
    const getWeather = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await requestFactory({
          url: OW_WEATHER_URL,
          params: {
            lat,
            lon,
            appid: config.openWeather.apiKey,
            units: "metric",
          },
          converter: {
            onSuccess: owToWeatherConverter,
            onError: owToWeatherErrorConverter,
          },
        });
        dispatch({ type: "success", payload: response.data });
      } catch (err) {
        dispatch({ type: "error", error: "unknown error" });
      }
    };
    getWeather();
  }, [lat, lon, dispatch]);

  return context;
}
