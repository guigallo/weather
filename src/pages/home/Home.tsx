import { useEffect, useReducer } from "react";

const BASE_URL = "https://api.openweathermap.org";
const WEATHER_URL = `${BASE_URL}/data/2.5/weather`;
const GEO_URL = `${BASE_URL}/geo/1.0/direct`;
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY || "";

type Weather = {
  currentTemp: number;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
};

function formatQueryParams(params: { [key: string]: string | number }) {
  const entries = Object.entries(params);
  if (entries.length === 0) return "";

  const query = entries.map(([key, value]) => `${key}=${value}`).join("&");
  return query;
}

function genUrl(path: string, params: { [key: string]: string | number }) {
  return `${path}?${formatQueryParams(params)}`;
}

function weatherConverter(data: any): Weather | undefined {
  if (!data) return undefined;
  return {
    currentTemp: data.main.temp,
    weatherDescription: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}

function weatherErrorConverter(
  errorMessage: string | undefined
): string | undefined {
  if (!errorMessage) return undefined;
  if (errorMessage === "Bad Request") return "Invalid location";
  return errorMessage;
}

type ResponseResult<T> = {
  data?: T | undefined;
  error?: string | undefined;
  loading: boolean;
};

async function makeRequest<T>({
  url,
  params,
}: {
  url: string;
  params: { [key: string]: string | number };
}): Promise<{ data?: T | undefined; error?: string | undefined }> {
  try {
    const res = await fetch(genUrl(url, params));
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();

    return { data, error: undefined };
  } catch (err) {
    let errorMessage;
    if (typeof err === "string") errorMessage = err;
    if (err instanceof Error) errorMessage = err.message;

    return { error: errorMessage || "unknown error" };
  }
}

function responseReducerFactory<T>({
  converter,
  errorConverter,
}: {
  converter?: (data: any) => T | undefined;
  errorConverter?: (error: string | undefined) => string | undefined;
} = {}) {
  return function responseReducer(state: any, action: any) {
    switch (action.type) {
      case "loading":
        return { ...state, loading: true, error: undefined };
      case "success":
        const data =
          typeof converter === "function"
            ? converter(action.payload)
            : action.payload;

        return { ...state, loading: false, data, error: undefined };
      case "error":
        const error =
          typeof errorConverter === "function"
            ? errorConverter(action.payload)
            : action.payload;

        return { ...state, loading: false, error };
      default:
        return state;
    }
  };
}

function useWeather({
  lat,
  lon,
}: { lat?: number; lon?: number } = {}): ResponseResult<Weather> {
  const [state, dispatch] = useReducer(
    responseReducerFactory<Weather>({
      converter: weatherConverter,
      errorConverter: weatherErrorConverter,
    }),
    { data: undefined, error: undefined, loading: false }
  );

  useEffect(() => {
    if (!lat || !lon) return;
    const getWeather = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await makeRequest({
          url: WEATHER_URL,
          params: { lat, lon, appid: API_KEY, units: "metric" },
        });
        dispatch({ type: "success", payload: response.data });
      } catch (err) {
        dispatch({ type: "error", payload: "unknown error" });
      }
    };
    getWeather();
  }, [lat, lon]);

  return state;
}

type GeoResult = {
  lat: number;
  lon: number;
  name: string;
};

function geoConverter(data: any): GeoResult | undefined {
  if (!data) return undefined;

  const geo = data[0];
  if (!geo) return undefined;

  return {
    lat: geo.lat,
    lon: geo.lon,
    name: geo.name,
  };
}

function useGeo({ query }: { query: string }): ResponseResult<GeoResult> {
  const [state, dispatch] = useReducer(
    responseReducerFactory<GeoResult>({ converter: geoConverter }),
    { data: undefined, error: undefined, loading: false }
  );

  useEffect(() => {
    const getGeo = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await makeRequest({
          url: GEO_URL,
          params: { q: query, appid: API_KEY },
        });
        dispatch({ type: "success", payload: response.data });
      } catch (err) {
        dispatch({ type: "error", payload: "unknown error" });
      }
    };
    getGeo();
  }, [query]);

  return state;
}

function Home() {
  // TODO: use a form to get the query
  const geo = useGeo({ query: "bauru" });

  // TODO: select one of the geo results
  const weather = useWeather(geo.data);

  return (
    <div className="Home">
      <h1>hello weather</h1>

      <h3>geo</h3>
      {geo.loading ? (
        <p>loading...</p>
      ) : (
        <pre>{JSON.stringify(geo, null, 2)}</pre>
      )}

      <h3>weather</h3>
      {geo.data && weather.loading ? (
        <p>loading...</p>
      ) : (
        <pre>{JSON.stringify(weather, null, 2)}</pre>
      )}
    </div>
  );
}

export default Home;
