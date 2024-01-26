import { Dispatch, useState, createContext, useReducer } from "react";
import { Weather } from "./weather";
import {
  ResponseAction,
  ResponseState,
  initialResponseState,
  responseReducer,
} from "../../shared/requests";

export type LatLon = {
  lat?: number;
  lon?: number;
};

export interface WeatherContextType extends ResponseState<Weather> {
  dispatch: Dispatch<ResponseAction<Weather>>;

  unit: "metric" | "imperial";
  setUnit: Dispatch<"metric" | "imperial">;

  query: LatLon;
  setQuery: Dispatch<LatLon>;
}

const WeatherContext = createContext<WeatherContextType>({
  unit: "metric",
  setUnit: () => {},

  data: undefined,
  error: undefined,
  loading: false,
  dispatch: () => {},

  query: {},
  setQuery: () => {},
});

WeatherContext.displayName = "Weather";

function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [unit, _setUnit] = useState<"metric" | "imperial">("metric");
  const [state, dispatch] = useReducer(
    responseReducer<Weather>,
    initialResponseState
  );
  const [query, setQuery] = useState<LatLon>({});

  const setUnit = (unit: "metric" | "imperial") => {
    if (unit === "metric" || unit === "imperial") _setUnit(unit);
    else _setUnit("metric");
  };

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        dispatch,

        unit,
        setUnit,

        query,
        setQuery,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherProvider };
