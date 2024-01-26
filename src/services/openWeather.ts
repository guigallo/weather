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
    weather: data.weather[0],
    main: data.main,
    wind: data.wind,
    name: data.name,
    sys: data.sys,
  };
}

export function owToWeatherErrorConverter(
  errorMessage: string | undefined
): string | undefined {
  if (!errorMessage) return undefined;
  if (errorMessage === "Bad Request") return "Invalid location";
  return errorMessage;
}

export function weatherIdToImgName(id?: number, defaultName = "clear_sky") {
  function getImageName() {
    if (!id) return defaultName;
    const idCode = id.toString().charAt(0);
    switch (idCode) {
      case "2":
        return "thunderstorm"; // ok
      case "3":
        return "scattered_clouds"; // was drizzle
      case "5":
        return "rain"; // ok
      case "6":
        return "snow"; // ok
      case "7":
        return "mist"; // was atmosphere
      case "8":
        return id === 800 ? defaultName : "few_clouds";
      default:
        return defaultName;
    }
  }
  const imageName = getImageName();

  return `webp/${imageName}.webp`;
}
