import { GeoCity } from "../data/geoCity/geoCity";
import { Weather } from "../data/weather/weather";

export const OW_BASE_URL = "https://api.openweathermap.org";
export const OW_WEATHER_URL = `${OW_BASE_URL}/data/2.5/weather`;
export const OW_GEO_URL = `${OW_BASE_URL}/geo/1.0/direct`;

export function owToGeoConverter(data: any): Array<GeoCity> {
  if (!data) return [];

  return data.map((geo: any) => ({
    lat: geo.lat,
    lon: geo.lon,
    name: geo.name,
  }));
}

export function owToWeatherConverter(data: any): Weather | undefined {
  if (!data) return undefined;
  return {
    currentTemp: data.main.temp,
    weatherDescription: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}

export function owToWeatherErrorConverter(
  errorMessage: string | undefined
): string | undefined {
  if (!errorMessage) return undefined;
  if (errorMessage === "Bad Request") return "Invalid location";
  return errorMessage;
}
